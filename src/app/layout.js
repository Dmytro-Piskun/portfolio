import { Open_Sans } from "next/font/google";
import "./globals.css";
import ScrollBlocker from "@/components/global-components/ScrollBlocker";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--open-sans-font",
  axes: ["wdth"],
});

export const metadata = {
  title: "Dmytro Piskun | Portfolio",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    
    <html lang="en">
      <ScrollBlocker>
        <body className={openSans.className}>{children}</body>
      </ScrollBlocker>
    </html>
  );
}
