import { motion } from "framer-motion";
import { Sparkles, Zap, Video, MapPin, Linkedin, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";

const About = () => {
  // Replace this string with your actual image URL
  const profileImageUrl = "https://res.cloudinary.com/dyd9xroga/image/upload/v1773125935/1719414924641_svuxo3.jpg";

  return (
    <div className="min-h-screen bg-background relative flex flex-col">
      <Navbar />

      {/* Ambient Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <main className="flex-grow pt-32 pb-24 px-4">
        <div className="container mx-auto max-w-4xl">
          
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-semibold mb-6">
              <MapPin className="w-3.5 h-3.5" />
              Mumbai, India
            </div>
            
            <h1 className="font-heading text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
              About <span className="text-orange-500">ScriptForge</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              I built ScriptForge because I know the hardest part of making a YouTube video isn't the filming or the editing... it's staring at a blank page trying to write the perfect script.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* The Mission Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="md:col-span-2 bg-gradient-card border border-border/50 rounded-3xl p-8 md:p-10 shadow-xl"
            >
              <h2 className="text-2xl font-bold font-heading mb-4 text-foreground">The Mission</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The mission is to democratize high-retention storytelling. Top creators have teams of writers analyzing retention graphs and pacing. I wanted to put that exact same power into a tool that anyone can use.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                By combining elite prompt engineering with lightning-fast AI, ScriptForge writes actual, structured video content designed to keep viewers watching until the very last second.
              </p>
            </motion.div>

            {/* Meet the Maker Card (Profile Image Integrated) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-secondary/30 border border-border/50 rounded-3xl p-8 flex flex-col items-center text-center justify-center group"
            >
              {/* Profile Image Container */}
              <div className="relative w-24 h-24 mb-6 group-hover:scale-110 transition-transform duration-300">
                <div className="absolute inset-0 bg-orange-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative w-full h-full rounded-2xl border-2 border-orange-500/20 overflow-hidden shadow-2xl">
                  <img 
                    src={profileImageUrl} 
                    alt="Aniket More" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        // Fallback in case the link breaks
                        (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=Aniket+More&background=f97316&color=fff";
                    }}
                  />
                </div>
              </div>

              <h3 className="font-heading text-xl font-bold mb-1 text-foreground">Aniket More</h3>
              <p className="text-sm text-muted-foreground mb-6">Founder & Developer</p>
              
              <a 
                href="https://www.linkedin.com/in/aniket-more-636461243" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0077B5] hover:bg-[#005a8a] text-white text-sm font-semibold transition-colors shadow-lg shadow-blue-900/20 w-full justify-center"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>
            </motion.div>
          </div>

          {/* Quick Stats/Features */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <Video className="w-6 h-6" />, title: "Creator First", desc: "Built specifically for the nuances of YouTube, TikTok, and modern video." },
              { icon: <Zap className="w-6 h-6" />, title: "Lightning Fast", desc: "Forging massive scripts in mere seconds so you can get back to filming." },
              { icon: <Sparkles className="w-6 h-6" />, title: "Pure Quality", desc: "Studio-grade formatting including visual cues, SFX tags, and host dialogue." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + (i * 0.1) }}
                className="bg-secondary/20 border border-border/50 rounded-2xl p-6 hover:border-orange-500/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 mb-4">
                  {item.icon}
                </div>
                <h3 className="font-heading text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/30 py-12 px-4 mt-auto">
        <div className="container mx-auto flex flex-col items-center justify-center gap-6 text-sm text-muted-foreground font-medium">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-orange-500" />
            <span className="text-foreground font-heading font-bold text-xl tracking-tight">ScriptForge</span>
          </div>
          <p className="text-xs opacity-50">© 2026 ScriptForge. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default About;