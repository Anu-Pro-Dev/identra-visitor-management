"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogoIcon } from "@/components/common/svg/icons";
import { IconBrandAzure, IconEye, IconEyeOff } from "@tabler/icons-react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "../schemas/LoginSchema";
import Link from "next/link";
import Image from "next/image";
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const onSubmit = (data: any) => {
    console.log(data);
    setIsPending(true); // Set loading state
    setTimeout(() => {
      console.log("Login successful");
      setIsPending(false); // Reset loading state
    }, 2000);
  };
  return (
    <div className={cn("flex flex-col gap-8", className)} {...props}>
      <Card className="w-full shadow-xl border-0 bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-6 pt-8">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <LogoIcon />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">
            <div className="mb-2">
              <span className="text-foreground">Welcome to </span>
              <span className="text-primary">Identra</span>
            </div>
            <h1 className="text-lg font-medium text-muted-foreground">
              Visitor Management System
            </h1>
          </CardTitle>
          <CardDescription className="text-base mt-2">
            Sign in to access your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full h-12 text-base font-medium border-2 hover:bg-primary/5 hover:border-primary/20 transition-all duration-200"
                disabled={isPending}
                type="button"
              >
                <Image
                  src="sso.svg"
                  alt="Microsoft Logo"
                  width={20}
                  height={20}
                />
                Continue with Microsoft
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-4 text-muted-foreground font-medium">
                  Or continue with email
                </span>
              </div>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-foreground"
                >
                  Email Address
                </Label>
                <Input
                  {...register("email")}
                  id="email"
                  type="text"
                  placeholder="Enter your email address"
                  className="h-12 text-base border-2 focus:border-primary/50 transition-all duration-200"
                  disabled={isPending}
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-foreground"
                  >
                    Password
                  </Label>
                  <Link
                    href="#"
                    className="text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-200"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    {...register("password")}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="h-12 text-base border-2 focus:border-primary/50 transition-all duration-200 pr-12"
                    disabled={isPending}
                  />
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.password.message}
                    </p>
                  )}
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground transition-colors duration-200"
                    disabled={isPending}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <IconEyeOff className="h-5 w-5" />
                    ) : (
                      <IconEye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isPending}
                className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {isPending ? "Signing In..." : "Sign In"}
              </Button>
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="text-primary hover:text-primary/80 font-medium transition-colors duration-200"
                >
                  Register here
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
