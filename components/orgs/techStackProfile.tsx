"use client";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Code, Award } from "lucide-react";
import { cn } from "@/lib/utils";
interface TechStackProfileProps {
  topLanguage: string | null;
  topLanguagePercent: number;
  techDiversityScore: number;
}
export default function TechStackProfile({
  topLanguage,
  topLanguagePercent,
  techDiversityScore,
}: TechStackProfileProps) {
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
              {/* {primaryTechs.map(([lang]) => (
                <Badge key={lang} variant="secondary" className="px-3 py-1 text-sm">
                  {lang}
                </Badge>
              ))} */}
            </div>
          </div>

          {/* Top Language */}
          {topLanguage && (
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                Top Language
              </p>
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-900 dark:text-white">
                  {topLanguage}
                </span>
                <span className="text-sm text-gray-500">
                  {topLanguagePercent.toFixed(1)}% of codebase
                </span>
              </div>
              <Progress value={topLanguagePercent} className="h-2" />
            </div>
          )}

          {/* Tech Diversity Score */}
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
                techDiversityScore < 50 ? "bg-red-500" : "bg-yellow-500",
              )}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
