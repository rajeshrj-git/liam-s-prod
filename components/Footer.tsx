import Link from "next/link";
import { Laptop, Phone, MapPin, Mail, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  const storeName = process.env.NEXT_PUBLIC_STORE_NAME || "Jarvis Computer";
  
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "All Products", href: "/products" },
    { name: "About Us", href: "/about" },
  ];
  
  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-16 pb-8 mt-auto">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="bg-accent text-black p-1.5 rounded-md">
                <Laptop size={20} className="stroke-[2.5]" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                JARVIS
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Premium refurbished technology at unbeatable prices. Quality tested, fully certified, and backed by our comprehensive warranty.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-accent transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-accent transition-colors"><Facebook size={20} /></a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-accent transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Support</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-gray-400 hover:text-accent transition-colors text-sm">Warranty Policy</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-accent transition-colors text-sm">Return Policy</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-accent transition-colors text-sm">FAQ</Link></li>
              <li><Link href="/admin" className="text-gray-400 hover:text-accent transition-colors text-sm">Admin Login</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm text-gray-400 items-start">
                <MapPin size={18} className="text-accent shrink-0 mt-0.5" />
                <span>{process.env.NEXT_PUBLIC_STORE_ADDRESS || "Silicon Valley, CA"}</span>
              </li>
              <li className="flex gap-3 text-sm text-gray-400 items-center">
                <Phone size={18} className="text-accent shrink-0" />
                <a href={`tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER}`} className="hover:text-accent transition-colors">
                  {process.env.NEXT_PUBLIC_PHONE_NUMBER || "+1 234 567 890"}
                </a>
              </li>
              <li className="flex gap-3 text-sm text-gray-400 items-center">
                <Mail size={18} className="text-accent shrink-0" />
                <a href="mailto:support@jarviscomputer.com" className="hover:text-accent transition-colors">
                  support@jarviscomputer.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} {storeName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
