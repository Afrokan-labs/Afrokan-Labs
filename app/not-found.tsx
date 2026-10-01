import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/sections/Footer";
import { Nav } from "@/components/sections/Nav";
import { notFoundPage as copy } from "@/content/home";
import shared from "@/styles/shared.module.css";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <Nav />
      <main id="top" className={`${shared.dark} ${styles.main}`}>
        <div className={`${shared.container} ${styles.inner}`}>
          <p className={shared.mutedDark}>{copy.eyebrow}</p>
          <h1 className={shared.h2}>{copy.title}</h1>
          <p className={shared.mutedDark}>{copy.body}</p>
          <Link href="/" className={`${shared.btn} ${shared.btnPrimary}`}>
            {copy.linkLabel}
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
