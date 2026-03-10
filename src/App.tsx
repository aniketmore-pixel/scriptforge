import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Generate from "./pages/Generate";
import Scripts from "./pages/Scripts";
import Upgrade from "./pages/Upgrade";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import TagExtractor from "./pages/Trends";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/generate" element={<Generate />} />
          <Route path="/scripts" element={<Scripts />} />
          <Route path="/upgrade" element={<Upgrade />} />
          <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/extract-tags" element={<TagExtractor />} />
        <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
