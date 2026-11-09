import { MotionConfig } from "motion/react";
import { Camps } from "./_components/Camps";
import { Contact } from "./_components/Contact";
import { Footer } from "./_components/Footer";
import { Gallery } from "./_components/Gallery";
import { Header } from "./_components/Header";
import { Hero } from "./_components/Hero";
import { Marquee } from "./_components/Marquee";
import { More } from "./_components/More";
import { Parties } from "./_components/Parties";
import { Programs } from "./_components/Programs";
import { Team } from "./_components/Team";

export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Programs />
        <Parties />
        <Camps />
        <More />
        <Team />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
