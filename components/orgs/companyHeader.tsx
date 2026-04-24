"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ICompany } from "@/types/index";
import { MapPin, Link as LinkIcon, Users, FolderGit2 } from "lucide-react";
import { FaGithub } from "react-icons/fa";

interface CompanyHeaderProps {
  company: ICompany;
}

export default function CompanyHeader({ company }: CompanyHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col md:flex-row gap-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="shrink-0"
            >
              <Avatar className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-white dark:border-gray-700 shadow-lg">
                <AvatarImage src={company.avatar_url} alt={company.name} />
                <AvatarFallback className="text-2xl">
                  {company.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </motion.div>

            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                    {company.name}
                  </h1>
                </div>
                <Button asChild variant="default" className="gap-2">
                  <a
                    href={company.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub className="w-4 h-4" />
                    GitHub
                  </a>
                </Button>
              </div>

              {company.description && (
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {company.description}
                </p>
              )}

              {/* <div className="flex flex-wrap gap-4 pt-2">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex items-center gap-2 text-sm">
                    <stat.icon className="w-4 h-4 text-gray-400" />
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {stat.value.toLocaleString()}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">{stat.label}</span>
                  </div>
                ))}
              </div> */}

              <div className="flex flex-wrap gap-3 pt-2 text-sm text-gray-500 dark:text-gray-400">
                {company.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{company.location}</span>
                  </div>
                )}
                {company.blog && (
                  <div className="flex items-center gap-1">
                    <LinkIcon className="w-3.5 h-3.5" />
                    <a
                      href={company.blog}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-500"
                    >
                      Website
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
