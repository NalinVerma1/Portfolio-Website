import Hero from "@/components/v2/Hero";
import About from "@/components/v2/About";
import Experience from "@/components/v2/Experience";
import Work from "@/components/v2/Work";
import Markets from "@/components/v2/Markets";
import Footer from "@/components/v2/Footer";
import FloatingNote from "@/components/v2/FloatingNote";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <About />
      <Experience />
      <Work />
      <Markets />
      <Footer />
      <FloatingNote />
    </main>
  );
}
