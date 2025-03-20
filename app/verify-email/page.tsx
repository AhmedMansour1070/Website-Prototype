"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

// Use environment variable for API URL
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Schema for verification form
const verifySchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  code: z.string().min(6, { message: "Verification code must be 6 digits" }),
});

type VerifyFormValues = z.infer<typeof verifySchema>;

export default function VerifyEmail() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const verifyForm = useForm<VerifyFormValues>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      email: "",
      code: "",
    },
  });

  async function onSubmit(data: VerifyFormValues) {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Verification failed.");

      toast({ title: "Success", description: "Email verified successfully!", duration: 3000 });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        toast({ title: "Error", description: errorMessage, variant: "destructive", duration: 5000 });
      }
       finally {
      setLoading(false);
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.4 } }}>
      <Form {...verifyForm}>
        <form onSubmit={verifyForm.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={verifyForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={verifyForm.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Verification Code</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="123456" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
            {loading ? "Verifying..." : "Verify Email"}
          </Button>
        </form>
      </Form>
    </motion.div>
  );
}
