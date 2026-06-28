import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import Header from './componentes/Header';
import Footer from './componentes/Footer';
import WhatsAppButton from './componentes/WhatsAppButton';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import PerfumeDetail from './pages/PerfumeDetail';
import Collections from './pages/Collections';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './componentes/ProtectedRoute';
import { handleGoogleRedirect } from './lib/googleAuth';

// Handle Google redirect on app startup
handleGoogleRedirect();

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith('/admin') || pathname === '/login';
  
  if (isAdminRoute) {
    return <>{children}</>;
  }
  
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalogo" element={<Catalog />} />
              <Route path="/perfume/:id" element={<PerfumeDetail />} />
              <Route path="/colecoes" element={<Collections />} />
              <Route path="/sobre" element={<About />} />
              <Route path="/contato" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </AnimatePresence>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;