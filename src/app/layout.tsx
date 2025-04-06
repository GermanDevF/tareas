import { ThemeProvider } from "@/components/theme-provider";
import AppSessionProvider from "@/providers/app-session-provider";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zoho lite",
  description: "A simple task management app",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  themeColor: "#ffffff",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
  },
  verification: {
    google: "google-site-verification=6z5m1zZ9i8vX6W3xq7X2h4Qe5h0",
    yandex: "google-site-verification=6z5m1zZ9i8vX6W3xq7X2h4Qe5h0",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <AppSessionProvider>
            {children}
            <Toaster />
          </AppSessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
