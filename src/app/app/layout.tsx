import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Platform",
    template: "%s — DELTA 2100",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}