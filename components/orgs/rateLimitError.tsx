"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
interface RateLimitErrorProps {
  resetTime: Date;
}
export default function RateLimitError({ resetTime }: RateLimitErrorProps) {
  const t = useTranslations("errors");
  const [timeLeft, setTimeLeft] = useState<string>("");
  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const diff = resetTime.getTime() - now.getTime();
      if (diff <= 0) {
        window.location.reload();
        return;
      }
      const minutes = Math.floor(diff / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${minutes}m ${seconds}s`);
    };
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [resetTime]);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4"
    >
      <Card className="max-w-md w-full border-0 shadow-xl text-center">
        <CardContent className="p-8 space-y-4">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-20 h-20 mx-auto bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center"
          >
            <AlertCircle className="w-10 h-10 text-yellow-500" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t("rateLimit")}
          </h2>
          <p className="text-gray-500 dark:text-gray-400">{t("allow")}</p>
          <div className="flex items-center justify-center gap-2 text-sm font-mono bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
            <Clock className="w-4 h-4 text-blue-500" />
            <span>{t("reset")}: </span>
            <span className="font-bold text-blue-600 dark:text-blue-400">
              {timeLeft}
            </span>
          </div>
          <Button
            onClick={() => window.location.reload()}
            className="gap-2 mt-2"
            disabled={parseInt(timeLeft) > 0}
          >
            {t("again")}
            <AlertCircle className="w-4 h-4" />
          </Button>
          <p className="text-xs text-gray-400">{t("tip")}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}