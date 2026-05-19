import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { ToastProvider } from "@/context/ToastContext";
import { IdeaProvider } from "@/context/IdeaContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ToastContainer } from "@/components/ui/ToastContainer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "IdeaVault | The Innovator's Hub",
  description: "A platform to pitch, discuss, and validate modern startup concepts.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} min-h-screen flex flex-col antialiased selection:bg-blue-200 selection:text-blue-900 dark:selection:bg-blue-900 dark:selection:text-blue-100`}
      >
        <ThemeProvider>
          <ToastProvider>
            <IdeaProvider>
              <Navbar />
              <main className="flex-1 flex flex-col">
                {children}
              </main>
              <Footer />
              <ToastContainer />
            </IdeaProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
