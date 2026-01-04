import { ChefHat } from "lucide-react";
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background">
      {/* Hero Section */}
      <section className="px-6 pt-32 pb-20 max-w-2xl mx-auto">
        {/* <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/40 mb-4">
          The Philosophy
        </p> */}
        <p className="text-xl text-foreground/70 leading-relaxed italic">
          “Pepe e sale, fa il cibo speciale.”
        </p>
      </section>

      {/* Narrative Section */}
      <section className="px-6 py-20 bg-foreground/[0.02] border-y border-foreground/5">
        <div className="max-w-2xl mx-auto space-y-12">
          <div className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-widest">Our Story</h2>
            <p className="text-foreground/60 leading-relaxed">
              Salepepe started in a small kitchen with a simple realization: why not combine our love for cooking and the technology we are learning to design and create a unique recipe experience?
              <br></br>
              <br></br>
              We name it after Camilla's beloved puppies, Sale and Pepe, who always bring joy and warmth to us, just like good food does.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <p className="text-3xl font-bold tracking-tighter">100+</p>
              <p className="text-xs uppercase tracking-widest text-foreground/40 font-bold">Amazing Dishes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="px-6 py-24 max-w-2xl mx-auto">
        <div className="space-y-16">
          <div className="flex gap-6 items-start">
            <ChefHat size={40} className="opacity-30"></ChefHat>
            <div>
              <h3 className="text-xl font-bold mb-2">Camilla</h3>
              <p className="text-foreground/60">Graphics designer. Love and good at cooking. Make lunch for work everyday. Currently learning Figma and paper folding technique.</p>
            </div>
          </div>

          <div className="flex gap-6 items-start">
            <ChefHat size={40} className="opacity-30"></ChefHat>
            <div>
              <h3 className="text-xl font-bold mb-2">Hui-Yu</h3>
              <p className="text-foreground/60">Software Engineer. Bad at cooking. Love to eat what Camilla cooks. Currently learning LLM to <del>not get replaced by AI</del> become a modern developer.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
