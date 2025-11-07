"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";

interface ConditionalReportWrapperProps {
  children: ReactNode;
}

export default function ConditionalReportWrapper({ children }: ConditionalReportWrapperProps) {
  const pathname = usePathname();
  // Only apply prose styling to report pages (slug routes), not the main listing page
  const isReportPage = pathname && pathname !== "/audits" && pathname.startsWith("/audits/");

  if (isReportPage) {
    return <div className="report prose dark:prose-invert max-w-none">{children}</div>;
  }
  return <>{children}</>;
}

