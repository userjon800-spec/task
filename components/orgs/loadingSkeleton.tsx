"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
export default function LoadingSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Card className="border-0 shadow-xl">
          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-col md:flex-row gap-6">
              <Skeleton className="w-24 h-24 sm:w-32 sm:h-32 rounded-full" />
              <div className="flex-1 space-y-3">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-16 w-full" />
                <div className="flex gap-4">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-5 w-24" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="mt-8">
          <Card className="border-0 shadow-xl">
            <CardContent className="p-6 space-y-4">
              <Skeleton className="h-6 w-40" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-16" />
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-2 w-full" />
            </CardContent>
          </Card>
        </div>
        {/* Gri Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-xl">
              <CardContent className="p-6 space-y-4">
                <Skeleton className="h-6 w-40" />
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                    <Skeleton className="h-2 w-full" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-0 shadow-xl">
              <CardContent className="p-6 space-y-4">
                <Skeleton className="h-6 w-48" />
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-12 w-full" />
                    <div className="flex gap-4">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </motion.div>
  );
}