"use client";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { motion } from "framer-motion";
import VerificationForm from "@/components/auth/VerificationForm";
import SuccessState from "@/components/auth/VerificationSuccess";

// Use environment variable for API URL
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Define verification data type
interface VerificationData {
  email: string;
  code: string;
}

export default function VerifyEmail() {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  
  const initialEmail = searchParams.get("email") || "";

  async function handleVerify(data: VerificationData) {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Verification failed.");

      setSuccess(true);
      toast({ 
        title: "Success", 
        description: "Email verified successfully!", 
        duration: 3000 
      });
      
      // Redirect after successful verification
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      toast({ 
        title: "Verification Failed", 
        description: errorMessage, 
        variant: "destructive", 
        duration: 5000 
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleResendCode(email: string) {
    setResendLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/resend-verification`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to resend verification code.");

      toast({ 
        title: "Code Sent", 
        description: "A new verification code has been sent to your email", 
        duration: 3000 
      });
      setCountdown(60); // Set waiting period of 60 seconds
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      toast({ 
        title: "Error", 
        description: errorMessage, 
        variant: "destructive", 
        duration: 5000 
      });
    } finally {
      setResendLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.4 }}
          className="w-full"
        >
          {success ? (
            <SuccessState />
          ) : (
            <VerificationForm 
              initialEmail={initialEmail}
              loading={loading}
              resendLoading={resendLoading}
              countdown={countdown}
              onSubmit={handleVerify}
              onResendCode={handleResendCode}
              setCountdown={setCountdown}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
}