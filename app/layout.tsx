import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "泡泡尾巴宠物洗护店",
  description: "社区高端宠物洗护、美容和皮毛养护预约页面。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
