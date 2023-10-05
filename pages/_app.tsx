import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { AppProps } from "next/app";
import "../styles/globals.css";
import type { GetServerSidePropsContext } from "next";
import { Toaster } from "@/components/ui/toaster";
import "../styles/globals.css";
import Navbar from "@/components/Custom/Navbar";
function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const [supabaseClient] = useState(() => createPagesBrowserClient());

  return (
    <div className="min-h-screen mx-auto max-w-5xl">
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <main className="text-stone-100 max-w-7xl mx-auto">
          <Toaster />
          <Navbar />
          <Component {...pageProps} />
        </main>
      </SessionContextProvider>
    </div>
  );
}

export default MyApp;
