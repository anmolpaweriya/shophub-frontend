"use client";

import type React from "react";

import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { USER_ROLE, useUserData } from "@/contexts/user-context";

interface VendorLayoutProps {
  children: React.ReactNode;
}

export function VendorLayout({ children }: VendorLayoutProps) {
  const { user } = useUserData();
  const { accessToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      return;
    }

    if (user.role !== USER_ROLE.VENDOR) {
      router.push("/");
      return;
    }
  }, [user, router]);

  if (!user || user.role !== USER_ROLE.VENDOR) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Preparing Page
          </h2>
          <p className="text-gray-600">
            You need to be logged in as a vendor to access this page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
