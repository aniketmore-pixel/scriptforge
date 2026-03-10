import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Sparkles, Zap, Wand2, CheckCircle2, Video, 
  BarChart3, Heart, MousePointer2, Settings2, 
  FileText, Users, GraduationCap, Briefcase,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"; // Assuming shadcn/ui
import Navbar from "@/components/Navbar";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-orange-500/30">
      <Navbar />

      {/* BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[800px] bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(249,115,22,0.15),rgba(0,0,0,0))]" />
      </div>

      <main>
        {/* HERO SECTION */}
        <section className="relative pt-24 md:pt-40 pb-16 px-6">
          <div className="container mx-auto max-w-5xl text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 text-xs md:text-sm font-bold mb-8 animate-pulse">
                <Sparkles className="w-4 h-4" />
                <span>V2.0 NOW LIVE: FASTER AI MODELS</span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tight leading-[1.1] mb-8">
                The Most Powerful <br className="hidden md:block" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-amber-500">
                  AI YouTube Script Generator
                </span>
              </h1>

              <p className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
                Generate high-retention, SEO-optimized YouTube scripts in seconds. 
                Whether it's for documentaries, tutorials, or vlogs, ScriptForge turns 
                simple ideas into viral-ready content.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/generate" className="w-full sm:w-auto">
                  <Button className="w-full sm:px-10 h-16 text-lg font-bold bg-orange-500 hover:bg-orange-600 shadow-xl shadow-orange-500/20 rounded-2xl">
                    Create My Script Now — It's Free
                  </Button>
                </Link>
              </div>

              <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground font-medium">
                <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-orange-500" /> Completely Free</span>
                <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-orange-500" /> No Credit Card Required</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* HOW IT WORKS (Inspired by QuillBot) */}
        <section className="py-24 px-6 bg-secondary/30">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">How ScriptForge Works</h2>
            <div className="grid md:grid-cols-3 gap-12">
              {[
                { step: "01", icon: <MousePointer2 />, title: "Enter Your Idea", desc: "Type your video topic or keywords into the generator. Be as specific as you like." },
                { step: "02", icon: <Settings2 />, title: "Tweak the Tone", desc: "Choose between Professional, Humorous, or Dramatic tones to match your brand." },
                { step: "03", icon: <FileText />, title: "Get Your Script", desc: "Export your full-length script with SFX cues and teleprompter-ready formatting." }
              ].map((item, i) => (
                <div key={i} className="relative p-8 bg-background rounded-3xl border border-border/50 shadow-sm">
                  <div className="text-5xl font-black text-orange-500/10 absolute top-4 right-6">{item.step}</div>
                  <div className="w-12 h-12 bg-orange-500 text-white rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-orange-500/20">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TARGET AUDIENCE GRID */}
        <section className="py-24 px-6">
          <div className="container mx-auto max-w-6xl text-center">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-16 tracking-tight">Built for every creator</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: <Users />, title: "Content Creators", text: "Vloggers and hobbyists looking to post consistently without burnout." },
                { icon: <Briefcase />, title: "Entrepreneurs", text: "Founders creating product explainers and high-converting video ads." },
                { icon: <GraduationCap />, title: "Educators", text: "Teachers making complex topics easy to understand with structured lessons." }
              ].map((card, i) => (
                <div key={i} className="p-8 border border-border/50 rounded-[2rem] hover:border-orange-500 transition-colors text-left group">
                  <div className="mb-4 text-orange-500 group-hover:scale-110 transition-transform">{card.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ SECTION (Huge for SEO) */}
        <section className="py-24 px-6 bg-secondary/20">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left font-semibold">Is the YouTube script generator really free?</AccordionTrigger>
                <AccordionContent>
                  Yes! ScriptForge offers a generous free tier that allows you to generate high-quality scripts without any hidden costs or subscriptions.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left font-semibold">Can I use these scripts for commercial videos?</AccordionTrigger>
                <AccordionContent>
                  Absolutely. Any script generated is yours to own. You can use it for monetized YouTube channels, ads, or corporate presentations.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left font-semibold">How do I get the best results from the AI?</AccordionTrigger>
                <AccordionContent>
                  The more detail you provide in your prompt, the better. Mention your target audience, the specific "hook" you want, and the overall goal of the video.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
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