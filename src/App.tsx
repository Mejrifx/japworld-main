import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ClientRoute } from "@/components/ClientRoute";
import { AdminRoute } from "@/components/AdminRoute";
import { FloatingWhatsAppButton } from "@/components/FloatingWhatsAppButton";

// Public pages
import Index from "./pages/Index";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import Services from "./pages/Services";
import Auctions from "./pages/Auctions";
import FAQ from "./pages/FAQ";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import Enquiry from "./pages/Enquiry";
import NotFound from "./pages/NotFound";

// Auth pages
import Login from "./pages/Login";
import AdminLogin from "./pages/admin/AdminLogin";
import ResetPassword from "./pages/ResetPassword";

// Client portal pages
import PortalDashboard from "./pages/portal/PortalDashboard";
import PortalAccount from "./pages/portal/PortalAccount";
import PortalTransactions from "./pages/portal/PortalTransactions";
import PortalInvoices from "./pages/portal/PortalInvoices";
import PortalVehicles from "./pages/portal/PortalVehicles";
import PortalVehicleDetail from "./pages/portal/PortalVehicleDetail";
import PortalStock from "./pages/portal/PortalStock";
import ChangePassword from "./pages/portal/ChangePassword";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminClients from "./pages/admin/AdminClients";
import AdminClientDetail from "./pages/admin/AdminClientDetail";
import AdminVehicles from "./pages/admin/AdminVehicles";
import AdminEnquiries from "./pages/admin/AdminEnquiries";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
          <FloatingWhatsAppButton />
          <Routes>
            {/* ── Public site ── */}
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/services" element={<Services />} />
            <Route path="/auctions" element={<Auctions />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/enquiry" element={<Enquiry />} />

            {/* ── Auth ── */}
            <Route path="/login" element={<Login />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* ── Client portal ── */}
            <Route
              path="/portal/change-password"
              element={
                <ClientRoute>
                  <ChangePassword />
                </ClientRoute>
              }
            />
            <Route
              path="/portal"
              element={
                <ClientRoute>
                  <PortalDashboard />
                </ClientRoute>
              }
            />
            <Route
              path="/portal/account"
              element={
                <ClientRoute>
                  <PortalAccount />
                </ClientRoute>
              }
            />
            <Route
              path="/portal/transactions"
              element={
                <ClientRoute>
                  <PortalTransactions />
                </ClientRoute>
              }
            />
            <Route
              path="/portal/invoices"
              element={
                <ClientRoute>
                  <PortalInvoices />
                </ClientRoute>
              }
            />
            <Route
              path="/portal/vehicles"
              element={
                <ClientRoute>
                  <PortalVehicles />
                </ClientRoute>
              }
            />
            <Route
              path="/portal/vehicles/:id"
              element={
                <ClientRoute>
                  <PortalVehicleDetail />
                </ClientRoute>
              }
            />
            <Route
              path="/portal/stock"
              element={
                <ClientRoute>
                  <PortalStock />
                </ClientRoute>
              }
            />

            {/* ── Admin portal ── */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/clients"
              element={
                <AdminRoute>
                  <AdminClients />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/clients/:id"
              element={
                <AdminRoute>
                  <AdminClientDetail />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/vehicles"
              element={
                <AdminRoute>
                  <AdminVehicles />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/enquiries"
              element={
                <AdminRoute>
                  <AdminEnquiries />
                </AdminRoute>
              }
            />

            {/* ── 404 ── */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </ThemeProvider>
  </QueryClientProvider>
);

export default App;
