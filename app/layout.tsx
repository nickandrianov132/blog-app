import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";


export const metadata: Metadata = {
  title: "Test Next JS",
  description: "Next JS learning app",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body 
        className="min-h-full flex flex-col bg-slate-200"
      >
        <Header />
        <main className="flex-1 px-4 py-8 sm:px-6 sm:py-10 bg-slate-100">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
