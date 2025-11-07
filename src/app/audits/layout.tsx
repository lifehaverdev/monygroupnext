import { ReactNode } from "react";
import ConditionalReportWrapper from "./ConditionalReportWrapper";

export default function AuditsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Load brand stylesheet for reports */}
      <link rel="stylesheet" href="/brand/theme/mony-vault.css" />
      <ConditionalReportWrapper>
        {children}
      </ConditionalReportWrapper>
    </>
  );
}
