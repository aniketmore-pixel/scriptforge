import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Menu, X, LogOut, Tag } from "lucide-react"; // Added Tag icon
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const userSession = localStorage.getItem("scriptforge_user");
      setIsLoggedIn(!!userSession);
    };
    
    checkAuth();
    setMobileOpen(false); 
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("scriptforge_user");
    setIsLoggedIn(false);
    toast.success("Logged out successfully");
    navigate("/");
  };

  // Helper component for the Tag Extractor link to keep code DRY
  const TagExtractorLink = () => (
    <Link 
      to="/extract-tags" 
      className={`text-sm font-medium transition-colors flex items-center gap-1.5 ${
        location.pathname === '/extract-tags' ? 'text-orange-500' : 'text-muted-foreground hover:text-foreground'
      }`}
    >
      <Tag className="w-3.5 h-3.5" />
      Tag Extractor
    </Link>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/30 bg-background/60 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-orange-500" />
          </div>
          <span className="font-heading text-xl font-bold text-foreground tracking-tight">ScriptForge</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {/* Always visible link */}
          <TagExtractorLink />

          {isLoggedIn ? (
            <>
              <Link to="/generate" className={`text-sm font-medium transition-colors ${location.pathname === '/generate' ? 'text-orange-500' : 'text-muted-foreground hover:text-foreground'}`}>
                Generate
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-destructive hover:bg-destructive/10">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  Log in
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="hero" size="sm" className="bg-orange-500 hover:bg-orange-600 text-white border-none shadow-[0_0_20px_-5px_rgba(249,115,22,0.4)] transition-all hover:scale-105">
                  Sign up free
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass border-t border-border/30 p-4 space-y-3 bg-background/95 backdrop-blur-xl absolute w-full shadow-2xl"
        >
          {/* Always visible in mobile */}
          <Link to="/tags" className="block text-sm font-medium text-muted-foreground hover:text-foreground p-2 rounded-md hover:bg-secondary/50">
            <span className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-orange-500" /> Tag Extractor
            </span>
          </Link>

          {isLoggedIn ? (
            <>
              <Link to="/generate" className="block text-sm font-medium text-muted-foreground hover:text-foreground p-2 rounded-md hover:bg-secondary/50">Generate</Link>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10 mt-2">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </>
          ) : (
            <div className="flex flex-col gap-3 pt-2">
              <Link to="/login" className="w-full">
                <Button variant="outline" size="sm" className="w-full">Log in</Button>
              </Link>
              <Link to="/signup" className="w-full">
                <Button variant="hero" size="sm" className="w-full bg-orange-500 hover:bg-orange-600 text-white border-none">Sign up / Get Pro</Button>
              </Link>
            </div>
          )}
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;