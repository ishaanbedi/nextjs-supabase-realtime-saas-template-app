import { Button } from "@/components/ui/button";
import Features from "./Features";
import TagDiv from "./TagDiv";
import Pricing from "./Pricing";
import Link from "next/link";
import Footer from "@/components/Custom/FooterComponent";
import Head from "next/head";
import FAQs from "./FAQs";

const Hero = () => {
  return (
    <section>
      <Head>
        <title>SaaS Sample App</title>
      </Head>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
            <img
              src="/hero.png"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <div className="lg:py-24">
            <h1 className="text-6xl font-bold">
              This is a SaaS
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-br from-yellow-200 via-green-200 to-green-500">
                Sample App
              </span>
            </h1>

            <p className="mt-4 text-stone-300">
              This is a sample SaaS app with authentication, CRUD operations,
              realtime updates, integrations and more. Created with Next.js,
              Tailwind CSS, TypeScript, ShadcnUI, Supabase and more, developed
              by Ishaan Bedi.
            </p>

            <div className="flex space-x-4 pt-12">
              <Link href="/login">
                <Button className="px-10 rounded-full">Get Started</Button>
              </Link>
              <Link href="/#features">
                <Button
                  variant="secondary"
                  className="px-10 rounded-full border"
                >
                  View Features
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <section id="features" className="pt-12">
        <Features />
      </section>
      <section className="pt-12">
        <TagDiv />
      </section>
      <section className="pt-12">
        <FAQs />
      </section>
      <section id="pricing" className="pt-12">
        <Pricing />
      </section>
      <section className="pt-12">
        <Footer />
      </section>
    </section>
  );
};

export default Hero;
