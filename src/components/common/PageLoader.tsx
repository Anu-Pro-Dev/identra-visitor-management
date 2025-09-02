"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { LogoIcon } from '@/components/common/svg/icons';
import { cn } from '@/lib/utils';

interface PageLoaderProps {
  message?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showLogo?: boolean;
}

const sizeConfig = {
  sm: {
    spinner: 'h-6 w-6',
    logo: 'h-8 w-8',
    text: 'text-sm',
  },
  md: {
    spinner: 'h-8 w-8',
    logo: 'h-12 w-12',
    text: 'text-base',
  },
  lg: {
    spinner: 'h-12 w-12',
    logo: 'h-16 w-16',
    text: 'text-lg',
  },
};

export function PageLoader({
  message = 'Loading...',
  className,
  size = 'md',
  showLogo = true,
}: PageLoaderProps) {
  const config = sizeConfig[size];

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center min-h-screen bg-background',
        className
      )}
      role="status"
      aria-live="polite"
      aria-label="Loading content"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16 [mask-image:radial-gradient(ellipse_at_center,white,transparent_75%)]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center space-y-6">
        {showLogo && (
          <motion.div
            className={cn(
              'flex items-center justify-center rounded-full bg-primary/10 p-4',
              config.logo
            )}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <LogoIcon />
            </motion.div>
          </motion.div>
        )}

        {/* Animated Loading Spinner */}
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div
            className={cn(
              'animate-spin rounded-full border-4 border-muted border-t-primary',
              config.spinner
            )}
          />

          {/* Pulse effect */}
          <motion.div
            className={cn(
              'absolute inset-0 rounded-full border-4 border-primary/20',
              config.spinner
            )}
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>

        {/* Loading Message */}
        <motion.div
          className="text-center space-y-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <p className={cn('font-medium text-foreground', config.text)}>
            {message}
          </p>
          <p className="text-sm text-muted-foreground">
            Please wait while we prepare your content
          </p>
        </motion.div>

        {/* Loading dots animation */}
        <motion.div
          className="flex space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-2 h-2 bg-primary rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.2,
                ease: 'easeInOut',
              }}
            />
          ))}
        </motion.div>
      </div>

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
          ease: 'easeInOut',
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
          ease: 'easeInOut',
          delay: 2,
        }}
      />
    </div>
  );
}

/**
 * Compact loader for smaller spaces (inline loading)
 */
interface InlineLoaderProps {
  message?: string;
  className?: string;
  size?: 'xs' | 'sm' | 'md';
}

export function InlineLoader({
  message = 'Loading...',
  className,
  size = 'sm',
}: InlineLoaderProps) {
  const spinnerSizes = {
    xs: 'h-4 w-4',
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
  };

  const textSizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
  };

  return (
    <div
      className={cn('flex items-center justify-center space-x-3', className)}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div
        className={cn(
          'animate-spin rounded-full border-2 border-muted border-t-primary',
          spinnerSizes[size]
        )}
      />
      {message && (
        <span className={cn('text-muted-foreground font-medium', textSizes[size])}>
          {message}
        </span>
      )}
    </div>
  );
}

/**
 * Card-based loader for content areas
 */
interface CardLoaderProps {
  message?: string;
  className?: string;
  showSkeleton?: boolean;
}

export function CardLoader({
  message = 'Loading content...',
  className,
  showSkeleton = false,
}: CardLoaderProps) {
  if (showSkeleton) {
    return (
      <div className={cn('p-6 space-y-4', className)} role="status" aria-label="Loading content">
        <div className="animate-pulse">
          <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
          <div className="space-y-2">
            <div className="h-3 bg-muted rounded"></div>
            <div className="h-3 bg-muted rounded w-5/6"></div>
            <div className="h-3 bg-muted rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-12 space-y-4',
        className
      )}
      role="status"
      aria-live="polite"
    >
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-muted border-t-primary" />
      <p className="text-sm text-muted-foreground font-medium">{message}</p>
    </div>
  );
}

/**
 * Table loading component
 */
interface TableLoaderProps {
  rows?: number;
  columns?: number;
  className?: string;
}

export function TableLoader({ rows = 5, columns = 4, className }: TableLoaderProps) {
  return (
    <div className={cn('w-full', className)} role="status" aria-label="Loading table data">
      <div className="animate-pulse">
        {/* Header */}
        <div className="grid grid-cols-4 gap-4 p-4 border-b">
          {Array.from({ length: columns }).map((_, i) => (
            <div key={`header-${i}`} className="h-4 bg-muted rounded w-3/4"></div>
          ))}
        </div>

        {/* Rows */}
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={`row-${rowIndex}`} className="grid grid-cols-4 gap-4 p-4 border-b">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <div
                key={`cell-${rowIndex}-${colIndex}`}
                className="h-3 bg-muted rounded"
                style={{
                  width: `${Math.random() * 40 + 60}%`,
                }}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PageLoader;
