import "./globals.css";
import { Inter } from "next/font/google";
import Navbar  from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
        <div className="max-w-3xl mx-auto p-4">
          <div className="mt-8">{children}</div>
        </div>
        <div className="Footer">
        <Footer/>
        </div>
      </body>
    </html>
  );
}
