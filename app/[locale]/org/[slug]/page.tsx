"use client";
import { useParams } from "next/navigation";
import { JSX, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PieChart from "@/components/shared/chart";
import { ICompany, IRepo, Contributor } from "@/types/index";
import CompanyHeader from "@/components/orgs/companyHeader";
import PopularRepos from "@/components/orgs/popularRepos";
import TopContributors from "@/components/orgs/topContributors";
import LoadingSkeleton from "@/components/orgs/loadingSkeleton";
import ErrorState from "@/components/orgs/errorState";
import EmptyState from "@/components/orgs/emptyState";
import RateLimitError from "@/components/orgs/rateLimitError";
import TechStackProfile from "@/components/orgs/techStackProfile";
export default function OrgPage(): JSX.Element {
  const params = useParams();
  const slug = params.slug as string;
  const [company, setCompany] = useState<ICompany | null>(null);
  const [topRepos, setTopRepos] = useState<IRepo[]>([]);
  const [languages, setLanguages] = useState<any>({});
  const [contributors, setContributors] = useState<Contributor[] | any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<"not_found" | "rate_limit" | null>(null);
  const [rateLimitReset, setRateLimitReset] = useState<Date | null>(null);
  const [emptyRepos, setEmptyRepos] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setEmptyRepos(false);
      try {
        const companyRes = await fetch(`/api/orgs/${slug}/repos`);
        if (companyRes.status === 429) {
          const resetHeader = companyRes.headers.get("x-ratelimit-reset");
          const resetTime = resetHeader
            ? new Date(parseInt(resetHeader) * 1000)
            : new Date(Date.now() + 3600000);
          setRateLimitReset(resetTime);
          setError("rate_limit");
          setLoading(false);
          return;
        }
        if (companyRes.status === 404) {
          setError("not_found");
          setLoading(false);
          return;
        }
        const companyData = await companyRes.json();
        if (
          !companyData.data.company ||
          companyData.data.company.length === 0
        ) {
          setError("not_found");
          setLoading(false);
          return;
        }
        setCompany(companyData.data.company[0]);
        if (companyData.data.sorted && companyData.data.sorted.length > 0) {
          setTopRepos(companyData.data.sorted.slice(0, 5));
        } else {
          setEmptyRepos(true);
        }
        const languagesRes = await fetch(`/api/orgs/${slug}/languages`);
        if (languagesRes.ok) {
          const langsData = await languagesRes.json();
          setLanguages(langsData || {});
        }
        const contributorsRes = await fetch(`/api/orgs/${slug}/contributors`);
        if (contributorsRes.ok) {
          const contributorsData = await contributorsRes.json();
          setContributors(contributorsData || []);
        }
      } catch (err) {
        console.error(err);
        setError("not_found");
      } finally {
        setLoading(false);
      }
    };
    if (slug) {
      fetchData();
    }
  }, [slug]);
  if (loading) {
    return <LoadingSkeleton />;
  }
  if (error === "rate_limit" && rateLimitReset) {
    return <RateLimitError resetTime={rateLimitReset} />;
  }
  if (error === "not_found" || !company) {
    return <ErrorState orgName={slug} />;
  }
  return (
    <AnimatePresence mode="wait">
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="min-h-screen bg-linear-to-br mx-auto max-w-390 from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
      >
        {/* max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 */}  
        <div className="">
          {company && <CompanyHeader company={company} />}
          {/* grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8 */}
          <div className="">
            {/* lg:col-span-1 */}
            <div className="">
              {languages.language && <PieChart data={languages.language} />}
            </div>
            <div className="">
              {languages.language && <TechStackProfile language={languages.language} />}
            </div>
            {/* lg:col-span-2 space-y-8 */}
            <div className="">
              {emptyRepos ? <EmptyState /> : <PopularRepos repos={topRepos} />}
            </div>
            <div>
              {contributors && contributors.contributors.length > 0 && (
                <>
                  <TopContributors contributors={contributors?.contributors} />
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>
      </div>
    </AnimatePresence>
  );
}