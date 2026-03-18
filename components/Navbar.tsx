"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingBag, Laptop, Menu, X, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const whatsappLink = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Hi Jarvis Computer! I'm interested in looking at your collections.`;

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-white/5 py-4 shadow-lg shadow-black/50"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-accent text-black p-2 rounded-lg group-hover:scale-105 transition-transform">
            <Laptop size={24} className="stroke-[2.5]" />
          </div>
          <span className="font-bold text-2xl tracking-tight text-white group-hover:text-accent transition-colors">
            JARVIS
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-gray-300 hover:text-accent font-medium transition-colors">
            Home
          </Link>
          <Link href="/products" className="text-gray-300 hover:text-accent font-medium transition-colors">
            Products
          </Link>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-2.5 rounded-full font-semibold transition-all hover:scale-105 shadow-[0_0_15px_rgba(37,211,102,0.3)]"
          >
            <MessageCircle size={18} />
            <span>WhatsApp Us</span>
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-300 hover:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-card border-b border-white/10 p-4 flex flex-col gap-4 shadow-xl md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-300 hover:text-accent font-medium p-2"
              >
                {link.name}
              </Link>
            ))}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white p-3 rounded-lg font-bold"
            >
              <MessageCircle size={20} />
              <span>WhatsApp Us</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
