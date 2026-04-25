"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Search, ArrowLeft } from "lucide-react";
interface ErrorStateProps {
  orgName: string;
}
export default function ErrorState({ orgName }: ErrorStateProps) {
  const router = useRouter();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4"
    >
      <Card className="max-w-md w-full border-0 shadow-xl text-center">
        <CardContent className="p-8 space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 mx-auto bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center"
          >
            <Search className="w-10 h-10 text-red-500" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Organization not found
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            We couldn&apos;t find an organization named &quot;{orgName}&quot; on
            GitHub. Please check the name and try again.
          </p>
          <div className="flex gap-3 justify-center pt-4">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </Button>
            <Button onClick={() => router.push("/")} className="gap-2">
              Try Another Org
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}