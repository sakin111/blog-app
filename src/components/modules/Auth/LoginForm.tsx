/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { toast } from "sonner";
import { login } from "@/utils/api";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "@/provider/AuthProvider";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export default function LoginForm() {
  const router = useRouter();
  // const { refetchUser } = useAuth();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: any) => {
    try {
      const res = await login(values);
      
      if (res?.success) {
        toast.success(res.message || "User Logged in Successfully");
        
        setIsRedirecting(true);
        router.push("/");

        // refetchUser().catch(console.error);
      } else {
        toast.error(res?.message || "User Login Failed");
      }
    } catch (err: any) {
      setIsRedirecting(false);
      
      if (axios.isAxiosError(err) && err.response) {
        const message = err.response.data?.message;
        if (message === "Invalid credentials") {
          toast.error("Invalid credentials");
        } else if (message === "User not found") {
          toast.error("User not found");
        } else {
          toast.error(message || "Login failed");
        }
      } else {
        toast.error("Login failed");
      }
      console.error("Login error:", err);
    }
  };

  const isSubmitting = form.formState.isSubmitting || isRedirecting;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4 sm:px-6">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-lg xl:max-w-md bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-lg">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
              Login
            </h2>

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                      className="text-sm sm:text-base md:text-lg"
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                      className="text-sm sm:text-base md:text-lg"
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full py-3 sm:py-4 text-sm sm:text-base md:text-lg mt-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}