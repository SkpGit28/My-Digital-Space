import localFont from "next/font/local";
import { Figtree } from "next/font/google";

export const satoshi = localFont({
  src: [
    {
      path: "../../public/fonts/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-figtree",
  display: "swap",
});
