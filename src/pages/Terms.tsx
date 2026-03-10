import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background relative flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 px-4">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-heading text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
              Terms & <span className="text-orange-500">Conditions</span>
            </h1>
            <p className="text-muted-foreground mb-12 border-b border-border/50 pb-6">
              Last updated: October 2026
            </p>

            <div className="space-y-8 text-muted-foreground leading-relaxed">
              <section>
                <h2 className="text-2xl font-bold font-heading text-foreground mb-4">1. Introduction</h2>
                <p>
                  Welcome to ScriptForge. By accessing or using our website and services, you agree to be bound by these Terms and Conditions. If you disagree with any part of the terms, you may not access our service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold font-heading text-foreground mb-4">2. Usage & Limits</h2>
                <p className="mb-3">
                  ScriptForge provides AI-generated scripts for content creators. We offer both a free tier and a lifetime "Pro" upgrade.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Guest/Free Users:</strong> Limited to 3 free generations per IP address/browser session.</li>
                  <li><strong>Pro Users:</strong> Unlimited generations subject to standard fair-use policies to prevent API abuse or automated botting.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold font-heading text-foreground mb-4">3. Pro Upgrade & Payments</h2>
                <p>
                  The Pro Upgrade is a one-time payment of ₹39 processed manually via UPI/WhatsApp verification. Because the product delivers immediate, permanent value and consumes AI API credits on our end, <strong>all sales are final and non-refundable</strong> once the account is upgraded.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold font-heading text-foreground mb-4">4. Content Ownership</h2>
                <p>
                  You own 100% of the rights to the scripts you generate using ScriptForge. You are free to use them for commercial YouTube channels, client work, or any other medium without attributing ScriptForge. However, we are not liable for any copyright claims or content strikes resulting from the generated text.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold font-heading text-foreground mb-4">5. Limitation of Liability</h2>
                <p>
                  ScriptForge is provided "as is" without any warranties. We do not guarantee that the generated scripts will result in increased views, revenue, or channel growth. We shall not be liable for any indirect, incidental, or consequential damages arising out of your use of the service.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </main>

      <footer className="border-t border-border/30 py-8 px-4 mt-auto">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground font-medium">
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

export default Terms;