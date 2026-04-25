"use client";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Contributor } from "@/types/index";
import { Users, Trophy, GitFork, ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";
interface TopContributorsProps {
  contributors: Contributor[];
}
export default function TopContributors({
  contributors,
}: TopContributorsProps) {
  const t = useTranslations('org');
  if (!contributors || contributors.length === 0) {
    return null;
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="border-0 shadow-xl rounded-2xl my-3">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            {t("contributors")}
            <Badge variant="secondary">Top{contributors.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {contributors.map((contributor, index) => (
            <motion.a
              key={contributor.login}
              href={contributor.html_url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all group"
            >
              <div className="flex items-center gap-3">
                {index === 0 && <Trophy className="w-4 h-4 text-yellow-500" />}
                <span className="text-sm font-mono text-gray-400 w-5">
                  {index + 1}
                </span>
                <Avatar className="w-8 h-8">
                  <AvatarImage
                    src={contributor.avatar_url}
                    alt={contributor.login}
                  />
                  <AvatarFallback>
                    {contributor.login.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm text-gray-900 dark:text-white">
                    {contributor.login}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <GitFork className="w-3 h-3" />
                    <span>
                      {contributor.contributions.toLocaleString()} contributions
                    </span>
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.a>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}