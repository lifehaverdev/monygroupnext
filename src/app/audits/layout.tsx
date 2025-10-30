import { ReactNode } from "react";

export const metadata = { title: "Audit Reports" };

export default function AuditsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Load brand stylesheet for reports */}
      <link rel="stylesheet" href="/brand/theme/mony-vault.css" />
      <div className="report prose dark:prose-invert max-w-none">{children}</div>
    </>
  );
}
