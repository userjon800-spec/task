"use client";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IRepo } from "@/types/index";
import { Star, GitFork, Calendar, ExternalLink } from "lucide-react";
import { getRelativeTime } from "@/lib/relativeTime";
import { useTranslations } from "next-intl";
interface PopularReposProps {
  repos: IRepo[];
}
export default function PopularRepos({ repos }: PopularReposProps) {
  const t = useTranslations("org");
  if (repos.length === 0) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="border-0 shadow-xl rounded-2xl my-3">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{t("popular")}</span>
            <Badge variant="outline">
              {repos.length} {t("repositories")}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {repos.map((repo, index) => (
            <motion.div
              key={repo.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all group"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {repo.name}
                    </h3>
                    {repo.language && (
                      <Badge variant="secondary" className="text-xs">
                        {repo.language}
                      </Badge>
                    )}
                  </div>
                  {repo.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                      {repo.description}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-4 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-yellow-500" />
                      <span>{repo.stargazers_count.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5" />
                      <span>{repo.forks.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>
                        {t('lastUpdated')} {" "}
                        {getRelativeTime(repo.pushed_at as unknown as string)}
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}