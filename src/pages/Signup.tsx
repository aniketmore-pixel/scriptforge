import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { motion } from "framer-motion";
import { Sparkles, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

// Initialize Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Signup = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName || !username || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      // Insert the new user into the database
      const { data: newUser, error } = await supabase
        .from('users')
        .insert([
          {
            full_name: fullName,
            username: username,
            password: password, // Note: Storing plain text per the current schema
            user_type: 'premium',
            role: 'user'
          }
        ])
        .select()
        .single();

      if (error) {
        if (error.code === '23505') { // Postgres unique constraint violation code
          toast.error("This username is already taken. Please choose another.");
        } else {
          toast.error("Failed to create account. Please try again.");
          console.error("Signup error:", error);
        }
        setLoading(false);
        return;
      }

      // Automatically log the user in by setting the session in localStorage
      if (newUser) {
        const { password: _, ...sessionData } = newUser;
        localStorage.setItem("scriptforge_user", JSON.stringify(sessionData));
        
        toast.success("Account created successfully!");
        navigate("/generate");
      }

    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Link to="/" className="flex items-center justify-center gap-2 mb-10">
          <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-orange-500" />
          </div>
          <span className="font-heading text-2xl font-bold text-foreground tracking-tight">ScriptForge</span>
        </Link>

        <div className="bg-gradient-card rounded-3xl border border-border/50 p-8 shadow-xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[150px] bg-orange-500/5 blur-[80px] pointer-events-none -z-10" />

          <h1 className="font-heading text-2xl font-bold mb-2">Create your account</h1>
          <p className="text-sm text-muted-foreground mb-8">Start generating viral scripts for free</p>

          <form onSubmit={handleSignup} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                placeholder="e.g. Marques Brownlee"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="bg-secondary/50 border-border focus-visible:ring-orange-500/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Choose a unique username"
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s+/g, ''))}
                className="bg-secondary/50 border-border focus-visible:ring-orange-500/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Min 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-secondary/50 border-border pr-10 focus-visible:ring-orange-500/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white border-none font-semibold text-base mt-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <p className="text-sm text-muted-foreground text-center mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-orange-500 hover:text-orange-400 transition-colors font-medium">
              Sign in here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;