import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MONY GROUP",
  description: "Browse the catalogue of Mony Group productions and learn about our organization",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >{children}</body>
    </html>
  );
}
