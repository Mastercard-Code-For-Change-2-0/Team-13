import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button.jsx";
import { Menu, X, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo1 from "@/assets/logo.svg";


const Navigation = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

    const handleSignInClick = () => {
        navigate('/signin');
      };
      
  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black opacity-70 border-b border-white/20 shadow-glass"
            : "bg-black/40 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-glow bg-blue-900">
                <img src={logo1} alt="Seva Sahayog Logo" className="w-8 h-8 object-contain" />
              </div>
              <span
                className={`text-xl font-semibold tracking-tight drop-shadow-sm ${
                  isScrolled ? "text-yellow-500" : "text-yellow-600"
                }`}
              >
                Seva Sahayog
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-all duration-200 hover:text-primary drop-shadow-sm ${
                    location.pathname === item.href
                      ? "text-primary"
                      : isScrolled
                      ? "text-gray-100"
                      : "text-white/90"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Button variant={isScrolled ? "hero" : "apple"} size="sm" onClick={handleSignInClick}>
                Sign In
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden p-2 rounded-md transition-colors drop-shadow-sm ${
                isScrolled
                  ? "text-gray-100 hover:text-primary"
                  : "text-white/90 hover:text-white"
              }`}
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-navy-950 border-l border-white/20 md:hidden"
          >
            <div className="flex flex-col h-full p-6 space-y-6 pt-20">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-medium transition-colors hover:text-primary text-gray-100 ${
                    location.pathname === item.href
                      ? "text-primary"
                      : "text-gray-100"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Button variant="hero" size="lg" className="mt-8">
                Get Started
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-navy-950/80 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
