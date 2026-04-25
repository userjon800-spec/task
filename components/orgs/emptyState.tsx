"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Inbox, FolderOpen } from "lucide-react";
export default function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-0 shadow-xl">
        <CardContent className="p-12 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-16 h-16 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4"
          >
            <Inbox className="w-8 h-8 text-gray-400" />
          </motion.div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No Repositories Found
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            This organization doesn&apos;t have any public repositories yet.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-400">
            <FolderOpen className="w-3 h-3" />
            <span>Check back later for updates</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}