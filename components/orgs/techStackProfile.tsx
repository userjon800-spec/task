"use client";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Code, Award } from "lucide-react";
import { cn } from "@/lib/utils";
interface Language {
  name: string;
  percentage: number;
}
interface TechStackProfileProps {
  language: Language[];
}
export default function TechStackProfile({ language }: TechStackProfileProps) {
  const sortedLanguages = [...language].sort(
    (a, b) => b.percentage - a.percentage,
  );
  const primaryTechs = sortedLanguages.slice(0, 4);
  const topLanguage = sortedLanguages[0];
  const techDiversityScore = Math.min(
    100,
    Math.floor(sortedLanguages.length * 10),
  );
  if (!language || language.length === 0) {
    return null;
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="mt-8"
    >
      <Card className="border-0 shadow-xl bg-linear-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/5 dark:to-purple-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Code className="w-5 h-5 text-blue-500" />
            Tech Stack Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
              Primary Technologies
            </p>
            <div className="flex flex-wrap gap-2">
              {primaryTechs.map((lang) => (
                <Badge
                  key={lang.name}
                  variant="secondary"
                  className="px-3 py-1.5 text-sm font-medium"
                >
                  {lang.name}
                </Badge>
              ))}
            </div>
          </div>
          {topLanguage && (
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                Top Language
              </p>
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-900 dark:text-white">
                  {topLanguage.name}
                </span>
                <span className="text-sm text-gray-500">
                  {topLanguage.percentage.toFixed(1)}% of codebase
                </span>
              </div>
              <Progress value={topLanguage.percentage} className="h-2" />
            </div>
          )}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Tech Diversity Score
              </p>
              <div className="flex items-center gap-1">
                <Award className="w-4 h-4 text-yellow-500" />
                <span className="font-bold text-gray-900 dark:text-white">
                  {techDiversityScore}%
                </span>
              </div>
            </div>
            <Progress
              value={techDiversityScore}
              className={cn(
                "h-2",
                techDiversityScore < 50 ? "bg-rose-500" : "bg-yellow-500",
              )}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}