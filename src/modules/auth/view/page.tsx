import { LoginForm } from "../components/login-form";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-background via-background to-muted/30 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16 [mask-image:radial-gradient(ellipse_at_center,white,transparent_75%)]" />
      
      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md">
        <LoginForm />
        
        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Identra. All rights reserved.
          </p>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />
    </div>
  );
}
