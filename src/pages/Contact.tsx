import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Send, Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setLoading(false);
    toast.success("Message sent! We'll get back to you shortly.");
    
    // Reset form (in a real app, you'd clear the state variables here)
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="min-h-screen bg-background relative flex flex-col">
      <Navbar />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <main className="flex-grow pt-32 pb-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="font-heading text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
                Get in <span className="text-orange-500">touch</span>
              </h1>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Have a question, feature request, or need some other help? Drop us a line and our team will get back to you as soon as possible.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/50 flex items-center justify-center border border-border/50">
                    <Mail className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-bold">Email Us</h3>
                    <p className="text-muted-foreground text-sm">aniketmore.personal@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/50 flex items-center justify-center border border-border/50">
                    <MessageSquare className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-bold">WhatsApp Support</h3>
                    <p className="text-muted-foreground text-sm">+91 9112351066</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gradient-card border border-border/50 rounded-3xl p-8 shadow-xl"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" required placeholder="John Doe" className="bg-secondary/30" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input id="email" type="email" required placeholder="john@example.com" className="bg-secondary/30" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    required 
                    placeholder="How can we help you?" 
                    rows={5} 
                    className="bg-secondary/30 resize-none" 
                  />
                </div>

                <Button type="submit" disabled={loading} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold h-12">
                  {loading ? "Sending..." : (
                    <>
                      Send Message <Send className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </motion.div>

          </div>
        </div>
      </main>

      <footer className="border-t border-border/30 py-8 px-4 mt-auto">
        <div className="container mx-auto flex items-center justify-between gap-4 text-sm text-muted-foreground font-medium">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-orange-500" />
            <span className="text-foreground">ScriptForge</span>
          </div>
          <p>© 2026 ScriptForge. Built for creators.</p>
        </div>
      </footer>
    </div>
  );
};

export default Contact;