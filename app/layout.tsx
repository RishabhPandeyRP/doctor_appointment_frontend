// import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AppContext";
import { Montserrat } from "next/font/google";
import Footer from "@/components/Footer";

const montserrat = Montserrat({
  subsets: ["latin"], // Supports Latin characters
  weight: ["400", "500", "700"], // Load specific font weights
  variable: "--font-montserrat", // Define a CSS variable for the font
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body>
        <AuthProvider>
          <NavBar></NavBar>
          {children}
          <Footer></Footer>
          <Toaster position="top-right"></Toaster>
        </AuthProvider>
      </body>
    </html>
  );
}
