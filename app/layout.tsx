import "./globals.css";
import { Inter } from "next/font/google";
import "@/public/styles/styles.scss";
import "@/public/styles/line-awesome.min.css";
import { getServerSession } from "next-auth";
import Providers from "./providers";
import { authOptions } from "./api/auth/[...nextauth]/route";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Placewise - Online Booking NextJS Template",
  description: "A nextjs template for online booking system",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-[var(--bg-1)] text-[var(--neutral-700)]`}
      >
        <Providers session={session!}>{children}</Providers>
      </body>
    </html>
  );
}
