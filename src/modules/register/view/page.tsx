"use client";
import { motion } from "framer-motion";
import { RegisterForm } from "../components/RegisterForm";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function RegisterPage() {
  return (
    <motion.div
      className="min-h-screen w-full bg-gradient-to-br from-background via-background to-muted/30 flex items-center justify-center p-2 sm:p-4 lg:p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16 [mask-image:radial-gradient(ellipse_at_center,white,transparent_75%)]" />

      {/* Main Content */}
      <motion.div
        className="relative z-10 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl"
        variants={itemVariants}
      >
        <RegisterForm />
      </motion.div>

      {/* Decorative Elements - Hidden on mobile for better performance */}
      <motion.div
        className="hidden md:block absolute top-10 lg:top-20 left-10 lg:left-20 w-20 lg:w-32 h-20 lg:h-32 bg-primary/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="hidden md:block absolute bottom-10 lg:bottom-20 right-10 lg:right-20 w-24 lg:w-40 h-24 lg:h-40 bg-accent/5 rounded-full blur-3xl"
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
    </motion.div>
  );
}
