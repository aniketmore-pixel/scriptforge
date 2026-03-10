import { motion } from "framer-motion";
import { Zap, Check, Crown } from "lucide-react";
import QRCode from "react-qr-code";
import Navbar from "@/components/Navbar";

const Upgrade = () => {
  const upiPaymentLink = "upi://pay?pa=scriptforge@upi&pn=ScriptForge&am=39&cu=INR&tn=ScriptForge%20Pro%20Upgrade";

  const proFeatures = [
    "Unlimited script generations",
    "Premium script templates",
    "Longer, more detailed scripts",
    "Priority AI processing",
    "Export scripts as PDF",
    "Early access to new features",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto pt-24 pb-16 px-4 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <Crown className="w-3.5 h-3.5" />
            One-Time Payment
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Upgrade to <span className="text-gradient">Pro</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Unlock the full power of ScriptForge for just <span className="text-primary font-bold">₹39</span> — forever.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Features */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-card rounded-2xl border border-border/50 p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-heading text-xl font-bold">Pro Features</h2>
                <p className="text-sm text-muted-foreground">Everything included</p>
              </div>
            </div>

            <ul className="space-y-4">
              {proFeatures.map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-sm text-secondary-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-border/50">
              <div className="flex items-baseline gap-2">
                <span className="font-heading text-4xl font-bold text-primary">₹39</span>
                <span className="text-muted-foreground text-sm">one-time payment</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">No subscriptions. No hidden charges.</p>
            </div>
          </motion.div>

          {/* QR Code */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-card rounded-2xl border border-primary/20 p-8 text-center glow-shadow"
          >
            <h2 className="font-heading text-xl font-bold mb-2">Scan to Pay</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Use any UPI app to scan this QR code
            </p>

            <div className="bg-foreground rounded-xl p-4 inline-block mb-6">
              <QRCode
                value={upiPaymentLink}
                size={200}
                bgColor="hsl(40, 20%, 95%)"
                fgColor="hsl(240, 6%, 7%)"
              />
            </div>

            <p className="text-sm text-muted-foreground mb-1">Amount: <span className="text-primary font-semibold">₹39</span></p>
            <p className="text-xs text-muted-foreground">
              After payment, your account will be upgraded within minutes.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {["Google Pay", "PhonePe", "Paytm", "BHIM"].map((app) => (
                <span key={app} className="px-3 py-1 rounded-full bg-secondary text-xs text-secondary-foreground">
                  {app}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Upgrade;
