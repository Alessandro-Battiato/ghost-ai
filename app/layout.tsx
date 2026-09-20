import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/ui/themes";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ghost AI",
  description: "A collaborative system design workspace.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full`}
    >
      <body className="min-h-full flex flex-col">
        <ClerkProvider
          appearance={{
            theme: dark,
            variables: {
              colorBackground: "var(--bg-surface)",
              colorBorder: "var(--border-default)",
              colorDanger: "var(--state-error)",
              colorForeground: "var(--text-primary)",
              colorInput: "var(--bg-subtle)",
              colorInputForeground: "var(--text-primary)",
              colorMuted: "var(--bg-subtle)",
              colorMutedForeground: "var(--text-muted)",
              colorNeutral: "var(--text-secondary)",
              colorPrimary: "var(--accent-primary)",
              colorPrimaryForeground: "var(--bg-base)",
              colorRing: "var(--accent-primary)",
              colorSuccess: "var(--state-success)",
              colorWarning: "var(--state-warning)",
              fontFamily: "var(--font-geist-sans)",
            },
          }}
        >
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
