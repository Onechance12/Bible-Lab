import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bible Lab — Learn to understand Scripture",
  description: "An interactive Bible-learning experience built around observation, evidence, context, and teach-back.",
  manifest: "/manifest.webmanifest",
  themeColor: "#16251f",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
