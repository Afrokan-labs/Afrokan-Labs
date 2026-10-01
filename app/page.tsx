import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Mission } from "@/components/sections/Mission";
import { Nav } from "@/components/sections/Nav";
import { Process } from "@/components/sections/Process";
import { Products } from "@/components/sections/Products";
import { Services } from "@/components/sections/Services";
import { Team } from "@/components/sections/Team";
import { Work } from "@/components/sections/Work";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <Services />
        <Work />
        <Process />
        <Products />
        <Team />
        <Mission />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
