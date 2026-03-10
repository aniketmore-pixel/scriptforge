import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Zap, Wand2, CheckCircle2, Video, PenTool, BarChart3, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col text-foreground font-sans">
      <Navbar />

      {/* SEO & Performance Background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[600px] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(249,115,22,0.15),rgba(0,0,0,0))] pointer-events-none -z-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="pt-32 pb-24 px-4 relative flex flex-col items-center justify-center text-center">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* Free Forever Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-sm font-semibold mb-8 backdrop-blur-md">
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>100% Free & Unlimited Forever</span>
              </div>

              <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.1] mb-6 tracking-tight">
                Craft viral YouTube
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500">
                  scripts in seconds
                </span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
                ScriptForge is a professional-grade scriptwriting engine for creators. 
                No paywalls, no subscriptions, and no limits. Just high-retention scripts that 
                help you dominate the YouTube algorithm.
              </p>

              {/* ACTION AREA */}
              <div className="max-w-md mx-auto">
              <Link to="/generate" className="block w-full">
  <Button className="w-full rounded-full h-16 md:h-20 text-lg md:text-xl font-bold bg-orange-500 hover:bg-orange-600 text-white shadow-[0_0_40px_-10px_rgba(249,115,22,0.5)] transition-all duration-300 hover:scale-[1.02] active:scale-95 border-none flex items-center justify-center gap-3">
    <span>Start Generating — It's Free</span>
    <Wand2 className="w-6 h-6" />
  </Button>
</Link>

                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mt-8 text-sm text-muted-foreground font-medium">
                  <div className="flex items-center gap-2 bg-secondary/50 px-3 py-1.5 rounded-full border border-border/50 shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-orange-500" />
                    <span>Unlimited Scripts</span>
                  </div>
                  <div className="flex items-center gap-2 bg-secondary/50 px-3 py-1.5 rounded-full border border-border/50 shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-orange-500" />
                    <span>No Login Required for First 3 Scripts</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FEATURES SECTION - Updated with relevant features */}
        <section className="py-24 px-4 border-t border-border/30 relative bg-background/50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 tracking-tight">Built for modern creators</h2>
              <p className="text-muted-foreground text-lg">Powerful enough for studios, simple enough for beginners.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <article className="group bg-gradient-card rounded-3xl p-8 border border-border/50 hover:border-orange-500/50 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-6 text-orange-500 group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-7 h-7" />
                </div>
                <h3 className="font-heading text-xl font-bold mb-3">Retention Optimized</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Every script uses viral pacing patterns, including open loops and high-stakes hooks to maximize your audience retention.
                </p>
              </article>

              {/* Feature 2 */}
              <article className="group bg-gradient-card rounded-3xl p-8 border border-border/50 hover:border-orange-500/50 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-6 text-orange-500 group-hover:scale-110 transition-transform">
                  <Zap className="w-7 h-7" />
                </div>
                <h3 className="font-heading text-xl font-bold mb-3">4000+ Word Capacity</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Don't settle for short summaries. Generate full-length, documentary-style scripts designed for 20-40 minute deep dives.
                </p>
              </article>

              {/* Feature 3 */}
              <article className="group bg-gradient-card rounded-3xl p-8 border border-border/50 hover:border-orange-500/50 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-6 text-orange-500 group-hover:scale-110 transition-transform">
                  <Video className="w-7 h-7" />
                </div>
                <h3 className="font-heading text-xl font-bold mb-3">Studio-Ready Formatting</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Get plain-text scripts formatted with visual cues, SFX tags, and host dialogue tags ready for your teleprompter.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* BOTTOM CTA SECTION */}
        <section className="py-24 px-4 relative">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[300px] bg-orange-500/10 blur-[150px] rounded-full pointer-events-none -z-10" />
          <div className="container mx-auto max-w-4xl">
            <div className="bg-gradient-card border border-border/50 rounded-[2.5rem] p-12 text-center shadow-2xl relative overflow-hidden">
              {/* Inner top glow decorative line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
              
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 font-heading tracking-tight">Ready to post your next viral hit?</h2>
              <p className="text-muted-foreground mb-10 text-lg max-w-xl mx-auto leading-relaxed">
                Join the creators who are saving hundreds of hours on writing. Start using ScriptForge today, free forever.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
                <Link to="/generate" className="w-full sm:w-auto">
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 h-auto text-base font-bold shadow-lg shadow-orange-500/25 border-none">
                    Generate My Free Script
                  </Button>
                </Link>
                <Link to="/about" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full px-8 py-6 h-auto text-base font-bold border-border/50 hover:bg-white/30">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* PERFECTLY CENTERED FOOTER */}
      <footer className="border-t border-border/30 py-16 px-4 mt-auto bg-background/80">
        <div className="container mx-auto flex flex-col items-center justify-center text-center">
          
          {/* Logo - Added mb-8 for spacing */}
          <div className="flex items-center gap-2 mb-8">
          <Sparkles className="w-6 h-6 text-orange-500" />
          <span className="text-foreground font-heading font-bold text-xl tracking-tight">ScriptForge</span>
          </div>

          {/* Links - Centered and Responsive */}
          <nav className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 mb-10" aria-label="Footer Navigation">
            <Link to="/about" className="text-muted-foreground hover:text-orange-500 transition-colors font-medium">About</Link>
            <Link to="/contact" className="text-muted-foreground hover:text-orange-500 transition-colors font-medium">Contact</Link>
            <Link to="/terms" className="text-muted-foreground hover:text-orange-500 transition-colors font-medium">Terms</Link>
            
          </nav>

          
          <p className="text-muted-foreground/40 text-xs tracking-widest uppercase">
            © 2026 ScriptForge. Built for creators.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;