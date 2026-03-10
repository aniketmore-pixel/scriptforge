import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Library, Trash2, Eye, Calendar, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Script {
  id: number;
  title: string;
  description: string;
  script: string;
  createdAt: string;
}

const Scripts = () => {
  const [scripts, setScripts] = useState<Script[]>([]);
  const [viewScript, setViewScript] = useState<Script | null>(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("scriptforge_scripts") || "[]");
    setScripts(saved);
  }, []);

  const deleteScript = (id: number) => {
    const updated = scripts.filter((s) => s.id !== id);
    setScripts(updated);
    localStorage.setItem("scriptforge_scripts", JSON.stringify(updated));
    toast.success("Script deleted");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto pt-24 pb-16 px-4 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Library className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="font-heading text-2xl font-bold">My Scripts</h1>
                <p className="text-sm text-muted-foreground">{scripts.length} scripts saved</p>
              </div>
            </div>
            <Link to="/generate">
              <Button variant="hero" size="sm">
                <Sparkles className="w-3.5 h-3.5" /> New Script
              </Button>
            </Link>
          </div>

          {scripts.length === 0 ? (
            <div className="bg-gradient-card rounded-xl border border-border/50 p-16 text-center">
              <Library className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="font-heading text-xl font-semibold mb-2">No scripts yet</h2>
              <p className="text-muted-foreground mb-6">Generate your first script to see it here.</p>
              <Link to="/generate">
                <Button variant="hero">Generate a Script</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {scripts.map((s, i) => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-gradient-card rounded-xl border border-border/50 p-5 hover:border-primary/20 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading font-semibold text-foreground truncate">{s.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{s.description}</p>
                      <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {new Date(s.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Button variant="ghost" size="icon" onClick={() => setViewScript(s)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteScript(s.id)} className="hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      <Dialog open={!!viewScript} onOpenChange={() => setViewScript(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-heading">{viewScript?.title}</DialogTitle>
          </DialogHeader>
          <div className="whitespace-pre-wrap text-sm text-secondary-foreground leading-relaxed">
            {viewScript?.script}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Scripts;
