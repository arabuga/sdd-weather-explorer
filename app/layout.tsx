import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Weather Explorer — Чи варто їхати у вихідні",
  description:
    "Спокійний, без акаунтів, україномовний планувальник поїздок на вихідні за погодою",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  );
}
