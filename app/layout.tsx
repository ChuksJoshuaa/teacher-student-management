import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar, Footer } from "@/components";
import { ReduxProvider } from "@/redux/provider";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Teacher-student",
  description: "A platform designed for both teachers and students",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <Navbar />
          <ToastContainer />
          <div style={{ minHeight: "100vh" }}>{children}</div>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
