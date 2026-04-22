"use client";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "motion/react";
import {
  TrendingUp,
  Code,
  ExternalLink,
  Search,
  ArrowRight,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
export default function Page() {
  const router = useRouter();
  const t = useTranslations("search");
  const [orgName, setOrgName] = useState("");
  const languages = [
    { code: "en", label: "EN" },
    { code: "ru", label: "RU" },
    { code: "uz", label: "UZ" },
  ];
  const popularOrgs = [
    { name: "Facebook", org: "facebook" },
    { name: "Microsoft", org: "microsoft" },
    { name: "Google", org: "google" },
    { name: "Vercel", org: "vercel" },
    { name: "Netflix", org: "netflix" },
    { name: "Airbnb", org: "airbnb" },
  ];
  const handleExplore = () => {
    if (!orgName.trim()) return;
    alert(`Analysing ${orgName}... (implementation can be added)`);
  };
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex justify-between items-center gap-4 flex-wrap">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <FaGithub className="w-7 h-7 sm:w-8 sm:h-8 text-gray-800 dark:text-white" />
            <span className="font-bold text-xl sm:text-2xl bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Company Tech Stack Explorer
            </span>
          </motion.div>
          <div className="flex items-center gap-3">
            <div className="flex gap-1 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full p-1 shadow-sm">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => router.push(`/${lang.code}`)}
                  className="px-3 py-1.5 text-sm font-medium rounded-full transition-all hover:bg-white dark:hover:bg-gray-700 hover:shadow"
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            {t("title")}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-12">
            {t("subtitle")}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-2 sm:p-3 max-w-2xl mx-auto"
        >
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                placeholder={t("placeholder")}
                className="w-full pl-11 pr-4 py-3 sm:py-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                onKeyDown={(e) => e.key === "Enter" && handleExplore()}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleExplore}
              className="bg-gradient-to-r from-gray-800 to-gray-700 dark:from-blue-600 dark:to-blue-500 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
            >
              {t("button")}
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-10"
        >
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <TrendingUp className="w-4 h-4" />
            <span>{t("suggested")}</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 max-w-4xl mx-auto">
            {popularOrgs.map((org, idx) => (
              <motion.button
                key={org.org}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + idx * 0.05 }}
                whileHover={{ y: -4, scale: 1.02 }}
                onClick={() => setOrgName(org.org)}
                className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:shadow-md transition-all flex items-center justify-center gap-1.5 group"
              >
                <FaGithub className="w-3.5 h-3.5" />
                {org.name}
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition" />
              </motion.button>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 flex justify-center gap-4 text-xs text-gray-400 dark:text-gray-500"
        >
          <div className="flex items-center gap-1">
            <Code className="w-3 h-3" />
            <span>React • Next.js</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}