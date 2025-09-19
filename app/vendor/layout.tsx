import type React from "react"
import { VendorLayout } from "@/components/vendor-layout"

export default function VendorLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return <VendorLayout>{children}</VendorLayout>
}
