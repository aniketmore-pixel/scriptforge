import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Copy, Check, Loader2, Clock, AlignLeft, Settings2, Target, Download, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

// Initialize Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Initialize Groq API Key
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || "";

const TONES = ["Engaging", "Professional", "Humorous", "Educational", "Dramatic"];

const Generate = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tone, setTone] = useState("Engaging");
  const [audience, setAudience] = useState("");
  const [script, setScript] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [userIP, setUserIP] = useState<string | null>(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIP = async () => {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        setUserIP(data.ip);
      } catch (error) {
        console.error("Failed to fetch IP", error);
      }
    };
    fetchIP();
  }, []);

  const generateGroqScript = async () => {
    if (!GROQ_API_KEY) {
      throw new Error("Groq API key is missing. Please check your .env file.");
    }

    const prompt = `You are an elite YouTube scriptwriter and retention strategist for top-tier creators. 
    Your assignment is to write an EXTREMELY LONG, comprehensive, 30-to-40-minute documentary-style video script.
    Target Word Count: 4000+ words. Do not wrap up early.
    
    VIDEO DETAILS:
    Title/Topic: ${title}
    Core Premise: ${description}
    Tone of Voice: ${tone}
    Target Audience: ${audience || "General audience"}
    
    CRITICAL LENGTH & CONTENT CONSTRAINTS:
    1. DO NOT SUMMARIZE. Write every single spoken word. 
    2. Expand aggressively on every single sub-point. Include long, detailed real-world case studies, historical context, metaphors, and storytelling.
    3. AI models usually write short 800-word scripts. YOU MUST BREAK THIS HABIT. Keep writing, exploring tangents, and going incredibly deep into the topic.
    4. ABSOLUTELY NO MARKDOWN. Do not use asterisks, bolding, underscores, or hashtags anywhere.
    5. USE PROFESSIONAL STUDIO FORMATTING (Plain Text Only):
       - Use [TIME: 0:00] for pacing estimates.
       - Use [VISUAL: ...] to describe B-roll, text-on-screen, and camera cues.
       - Use [SFX: ...] for sound effects or music shifts.
       - Use HOST: before spoken dialogue.
       
    REQUIRED MASSIVE STRUCTURE (Use exact ALL CAPS headers):
    
    METADATA
    Provide 3 high-CTR alternative titles and 2 vivid thumbnail concepts.
    
    THE HOOK (0:00 - 2:00)
    A long, suspenseful opening loop. State the massive stakes.
    
    THE CONTEXT & INTRO (2:00 - 5:00)
    Give deep historical context or background on why this matters right now.
    
    MAIN CONTENT: CHAPTER 1 - THE FOUNDATION (5:00 - 12:00)
    (Deep dive into the first core point. Tell a massive story here).
    
    MAIN CONTENT: CHAPTER 2 - THE PARADIGM SHIFT (12:00 - 20:00)
    (Introduce the complication, a surprising case study, or the core methodology in granular detail).
    
    MAIN CONTENT: CHAPTER 3 - THE IMPLEMENTATION (20:00 - 28:00)
    (Step-by-step actionable advice. Give 3-4 specific examples).
    
    MAIN CONTENT: CHAPTER 4 - THE UNEXPECTED VARIABLE (28:00 - 35:00)
    (The secret sauce, the thing nobody else talks about regarding this topic).
    
    THE OUTRO & CALL TO ACTION (35:00 - 38:00)
    Summarize the massive journey, drive engagement, and push them to another video.
    
    Begin writing the massive 4000+ word script now. DO NOT STOP SHORT.`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile", 
        messages: [
          {
            role: "system",
            content: "You are a master YouTube scriptwriter known for writing incredibly long, deeply researched, 40-minute video essays. You never summarize. You write out every single spoken word, pushing past 4000 words. You strictly output plain text with no markdown."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7, 
        presence_penalty: 0.3, 
        max_tokens: 8000, 
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Failed to generate script with Groq.");
    }

    const data = await response.json();
    return data.choices[0].message.content;
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Please enter a video title");
      return;
    }
    if (!description.trim()) {
      toast.error("Please enter a short description");
      return;
    }

    setLoading(true);

    try {
      // --- AUTH CHECK ---
      const localUserStr = localStorage.getItem("scriptforge_user");
      const localUser = localUserStr ? JSON.parse(localUserStr) : null;

      if (!localUser) {
        if (!userIP) {
          toast.error("Verifying connection... please try again.");
          setLoading(false);
          return;
        }

        const { data: usageData, error: fetchError } = await supabase
          .from('ip_tracking')
          .select('count')
          .eq('ip', userIP)
          .single();

        if (fetchError && fetchError.code !== 'PGRST116') {
          throw new Error(fetchError.message);
        }

        const currentCount = usageData?.count || 0;

        if (currentCount >= 3) {
          setLoading(false);
          toast.error("You've used your 3 free scripts! Please log in to continue.");
          navigate("/login");
          return;
        }

        const { error: upsertError } = await supabase
          .from('ip_tracking')
          .upsert({ ip: userIP, count: currentCount + 1 });

        if (upsertError) throw new Error(upsertError.message);
      }
      // ----------------------

      setScript("");

      // Call Groq API
      const generatedScript = await generateGroqScript();
      setScript(generatedScript);

      toast.success("Script forged successfully!");

    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error.message || "Something went wrong generating the script.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(script);
    setCopied(true);
    toast.success("Script copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([script], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${title.replace(/\s+/g, '-').toLowerCase()}-script.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Helper to calculate estimated video time (avg 140 words per minute)
  const wordCount = script ? script.trim().split(/\s+/).length : 0;
  const estimatedMinutes = Math.max(1, Math.round(wordCount / 140));

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Navbar />
      
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[300px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="container mx-auto pt-28 pb-16 px-4 max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="bg-gradient-card rounded-2xl border border-border/50 p-6 lg:p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <Settings2 className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <h1 className="font-heading text-xl font-bold">Script Settings</h1>
                  <p className="text-xs text-muted-foreground">Configure your video's DNA</p>
                </div>
              </div>

              <form onSubmit={handleGenerate} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-semibold">Video Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g. How to Build a SaaS in 30 Days"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-secondary/30 border-border focus-visible:ring-orange-500/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="desc" className="text-sm font-semibold flex justify-between">
                    Core Premise
                    <span className={`text-xs font-normal ${description.length > 300 ? "text-destructive" : "text-muted-foreground"}`}>
                      {description.length}/300
                    </span>
                  </Label>
                  <Textarea
                    id="desc"
                    placeholder="Briefly describe what your video is about, key points to hit, or any specific call to actions..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="bg-secondary/30 border-border resize-none focus-visible:ring-orange-500/50"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-semibold">Tone of Voice</Label>
                  <div className="flex flex-wrap gap-2">
                    {TONES.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTone(t)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          tone === t 
                            ? 'bg-orange-500 text-white shadow-[0_0_15px_-3px_rgba(249,115,22,0.4)]' 
                            : 'bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground border border-border/50'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="audience" className="text-sm font-semibold">Target Audience (Optional)</Label>
                  <div className="relative">
                    <Target className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="audience"
                      placeholder="e.g. Beginners, Software Engineers..."
                      value={audience}
                      onChange={(e) => setAudience(e.target.value)}
                      className="bg-secondary/30 border-border pl-9 focus-visible:ring-orange-500/50"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white border-none h-12 text-base font-semibold shadow-lg shadow-orange-500/20" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        Forging Script...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 mr-2" />
                        Generate Script
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7 h-full"
          >
            <div className="bg-[#0f0f11] rounded-2xl border border-border/50 shadow-xl overflow-hidden h-full min-h-[600px] flex flex-col relative">
              
              <div className="border-b border-border/50 bg-secondary/30 p-4 flex items-center justify-between backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <div className="flex space-x-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                    Studio_Script.txt
                  </span>
                </div>
                
                {/* UPGRADED BUTTONS:
                  Added text labels, explicit backgrounds, borders, and orange icon accents.
                */}
                {script && (
                  <div className="flex items-center gap-3">
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      onClick={handleDownload} 
                      className="h-8 px-3 text-xs font-semibold bg-background hover:bg-secondary border border-border/50 text-foreground transition-colors shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5 mr-2 text-orange-500" />
                      Download
                    </Button>
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      onClick={handleCopy} 
                      className="h-8 px-3 text-xs font-semibold bg-background hover:bg-secondary border border-border/50 text-foreground transition-colors shadow-sm"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 mr-2 text-green-500" /> : <Copy className="w-3.5 h-3.5 mr-2 text-orange-500" />}
                      {copied ? "Copied!" : "Copy Text"}
                    </Button>
                  </div>
                )}
              </div>

              <div className="flex-1 p-6 lg:p-8 overflow-y-auto relative">
                <AnimatePresence mode="wait">
                  {!script && !loading && (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
                    >
                      <div className="w-16 h-16 mb-4 rounded-full bg-secondary/50 flex items-center justify-center">
                        <PlayCircle className="w-8 h-8 text-muted-foreground/50" />
                      </div>
                      <h3 className="text-lg font-heading font-semibold text-foreground/80 mb-2">Ready to Forge</h3>
                      <p className="text-sm text-muted-foreground max-w-sm">
                        Fill out the settings on the left and hit generate. Your AI-crafted YouTube script will appear right here.
                      </p>
                    </motion.div>
                  )}

                  {loading && (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex flex-col items-center justify-center"
                    >
                      <Loader2 className="w-10 h-10 animate-spin text-orange-500 mb-4" />
                      <p className="text-sm font-medium text-muted-foreground animate-pulse">Writing a massive 4000+ word script...</p>
                    </motion.div>
                  )}

                  {script && !loading && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }}
                      className="h-full"
                    >
                      <div className="flex items-center gap-6 mb-8 pb-6 border-b border-border/30">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4 text-orange-500" />
                          Est. ~{estimatedMinutes} mins video
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <AlignLeft className="w-4 h-4 text-orange-500" />
                          {wordCount.toLocaleString()} words
                        </div>
                      </div>

                      <div className="whitespace-pre-wrap leading-relaxed text-[14px] font-mono text-foreground/90 tracking-tight">
                        {script}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Generate;