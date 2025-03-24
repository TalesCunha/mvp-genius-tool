
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import CreateMVP from "./pages/CreateMVP";
import Feed from "./pages/Feed";
import Auth from "./pages/Auth";
import CreateAccount from "./pages/CreateAccount";
import UserPreferences from "./pages/UserPreferences";
import Profile from "./pages/Profile";
import UserProfile from "./pages/UserProfile";
import MVPDetails from "./pages/MVPDetails";
import TestMVP from "./pages/TestMVP";
import AddFeedback from "./pages/AddFeedback";
import QandA from "./pages/QandA";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/user-preferences" element={<UserPreferences />} />
            <Route path="/create-mvp" element={<CreateMVP />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/mvp/:id" element={<MVPDetails />} />
            <Route path="/test-mvp/:id" element={<TestMVP />} />
            <Route path="/add-feedback/:id" element={<AddFeedback />} />
            <Route path="/qanda" element={<QandA />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
