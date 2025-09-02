"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LogoIcon } from "@/components/common/svg/icons";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search, MapPin } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const handleGoHome = () => {
    router.push("/dashboard");
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-background via-background to-muted/30 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16 [mask-image:radial-gradient(ellipse_at_center,white,transparent_75%)]" />

      {/* 404 Content */}
      <motion.div
        className="relative z-10 w-full max-w-2xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="shadow-2xl border-0 bg-card/90 backdrop-blur-md overflow-hidden">
          {/* Header */}
          <CardHeader className="text-center pb-6 pt-8 relative">
            {/* Floating 404 Background */}
            <motion.div
              className="absolute top-4 right-4 text-8xl font-black text-primary/5 select-none pointer-events-none"
              variants={floatingVariants}
              animate="animate"
            >
              404
            </motion.div>

            <motion.div
              className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 relative z-10"
              variants={itemVariants}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut" as const,
                }}
              >
                <LogoIcon />
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <CardTitle className="text-2xl font-bold tracking-tight mb-2">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <span className="text-foreground">Identra</span>
                </div>
                <h1 className="text-xl font-medium text-primary">
                  Page Not Found
                </h1>
              </CardTitle>
              <CardDescription className="text-base">
                The page you&apos;re looking for seems to have wandered off.
                Don&apos;t worry, we&apos;ll help you get back on track!
              </CardDescription>
            </motion.div>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            <motion.div variants={itemVariants} className="space-y-6">
              {/* Large 404 Display */}
              <motion.div className="text-center py-8" variants={itemVariants}>
                <motion.div
                  className="text-8xl font-black text-primary/20 mb-4 select-none"
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.2, 0.3, 0.2],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeOut" as const,
                  }}
                >
                  404
                </motion.div>
                <motion.div
                  className="flex items-center justify-center gap-2 text-muted-foreground"
                  variants={itemVariants}
                >
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">
                    This location doesn&apos;t exist in our system
                  </span>
                </motion.div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                <Button
                  onClick={handleGoHome}
                  className="w-full h-12 text-base font-semibold"
                  size="lg"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Go to Dashboard
                </Button>

                <Button
                  variant="outline"
                  onClick={handleGoBack}
                  className="w-full h-12 text-base font-semibold"
                  size="lg"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Go Back
                </Button>
              </motion.div>

              {/* Quick Links */}
              <motion.div variants={itemVariants} className="space-y-4">
                <h3 className="text-sm font-medium text-foreground text-center">
                  Or try these popular pages:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Link href="/dashboard">
                    <Button
                      variant="ghost"
                      className="w-full text-sm"
                      size="sm"
                    >
                      Dashboard
                    </Button>
                  </Link>
                  <Link href="/dashboard/visitors">
                    <Button
                      variant="ghost"
                      className="w-full text-sm"
                      size="sm"
                    >
                      Visitors
                    </Button>
                  </Link>
                  <Link href="/dashboard/approvals">
                    <Button
                      variant="ghost"
                      className="w-full text-sm"
                      size="sm"
                    >
                      Approvals
                    </Button>
                  </Link>
                </div>
              </motion.div>

              {/* Search Suggestion */}
              <motion.div
                variants={itemVariants}
                className="p-4 bg-muted/50 rounded-lg border text-center space-y-2"
              >
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Search className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    Looking for something specific?
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Use the search function in the dashboard or check the
                  navigation menu for all available features.
                </p>
              </motion.div>

              {/* Help Text */}
              <motion.div
                variants={itemVariants}
                className="text-center space-y-2"
              >
                <p className="text-sm text-muted-foreground">
                  If you believe this is an error, please contact our support
                  team at&nbsp;
                  <a
                    href="mailto:support@identra.com"
                    className="text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    support@identra.com
                  </a>
                </p>
              </motion.div>

              {/* Technical Details */}
              <motion.div variants={itemVariants} className="text-center">
                <details className="mt-4 p-3 bg-muted/30 rounded-lg border text-left">
                  <summary className="cursor-pointer text-xs font-medium text-muted-foreground hover:text-foreground transition-colors text-center">
                    Technical Information
                  </summary>
                  <div className="mt-2 space-y-1 text-xs font-mono text-muted-foreground">
                    <div>Status Code: 404</div>
                    <div>
                      URL:{" "}
                      {typeof window !== "undefined"
                        ? window.location.pathname
                        : "N/A"}
                    </div>
                    <div>Timestamp: {new Date().toISOString()}</div>
                  </div>
                </details>
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>

        {/* Footer */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <p className="text-sm text-muted-foreground">
            © 2025 Identra. All rights reserved.
          </p>
        </motion.div>
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-20 left-20 w-32 h-32 bg-primary/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut" as const,
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-40 h-40 bg-accent/5 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Floating Icons Animation */}
      <motion.div
        className="absolute top-1/4 left-1/4 opacity-5"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Search className="h-12 w-12 text-primary" />
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 right-1/4 opacity-5"
        animate={{
          y: [0, 15, 0],
          x: [0, -15, 0],
          rotate: [0, -90, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <MapPin className="h-8 w-8 text-accent" />
      </motion.div>
    </div>
  );
}
