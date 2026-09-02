"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Camera,
  ThumbsUp,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
} from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import { cafeInfo } from "@/data/cafe";
import { categories } from "@/data/categories";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/#about", label: "About" },
  { href: "/#store-locator", label: "Store Locator" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#contact", label: "Contact" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer id="contact" className="relative border-t border-white/10 bg-ink-dark text-brand-cream">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.9fr_0.9fr_1.1fr_1.4fr] lg:gap-8">
          {/* Col 1: Brand Info */}
          <div>
            <BrandLogo light />
            <p className="mt-4 max-w-xs text-xs font-medium leading-relaxed text-brand-cream/70 sm:text-sm">
              Loaded with flavour. Made with love. Your go-to destination for cheesy cravings.
            </p>
            <div className="mt-5 flex gap-2">
              {[
                { href: cafeInfo.instagram, icon: Camera, label: "Instagram" },
                { href: cafeInfo.facebook, icon: ThumbsUp, label: "Facebook" },
                { href: cafeInfo.whatsapp, icon: MessageCircle, label: "WhatsApp" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-brand-cream transition-all hover:bg-brand-yellow hover:text-ink-dark"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="font-display text-xs font-black uppercase tracking-widest text-brand-yellow">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs font-semibold text-brand-cream/70 transition-colors hover:text-brand-yellow sm:text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Our Menu */}
          <div>
            <h3 className="font-display text-xs font-black uppercase tracking-widest text-brand-yellow">
              Our Menu
            </h3>
            <ul className="mt-4 space-y-2.5">
              {categories.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/menu?category=${cat.id}`}
                    className="text-xs font-semibold text-brand-cream/70 transition-colors hover:text-brand-yellow sm:text-sm"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Get In Touch */}
          <div>
            <h3 className="font-display text-xs font-black uppercase tracking-widest text-brand-yellow">
              Get In Touch
            </h3>
            <ul className="mt-4 space-y-3 text-xs text-brand-cream/70 sm:text-sm">
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="shrink-0 text-brand-yellow" />
                <a href={`tel:${cafeInfo.phone}`} className="hover:text-brand-yellow">
                  {cafeInfo.phoneFormatted}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="mt-0.5 shrink-0 text-brand-yellow" />
                <span>{cafeInfo.addressLine}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="shrink-0 text-brand-yellow" />
                <a href={`mailto:${cafeInfo.email}`} className="hover:text-brand-yellow">
                  {cafeInfo.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Newsletter Subscribe */}
          <div>
            <h3 className="font-display text-xs font-black uppercase tracking-widest text-brand-yellow">
              Subscribe
            </h3>
            <p className="mt-3 text-xs text-brand-gray">
              Get cheesy updates, offers and more.
            </p>
            <form onSubmit={handleSubscribe} className="mt-3 flex flex-col gap-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-xs text-brand-cream placeholder:text-brand-gray focus:border-brand-yellow focus:outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="flex items-center justify-center gap-1.5 rounded-full bg-brand-yellow px-4 py-2.5 text-xs font-black text-ink-dark transition-all hover:bg-brand-yellow-light active:scale-95"
              >
                {subscribed ? (
                  <>
                    <CheckCircle2 size={14} /> Subscribed!
                  </>
                ) : (
                  <>
                    <Send size={13} /> Subscribe
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-center text-xs text-brand-cream/60 sm:flex-row sm:text-left">
          <p>? 2026 Crazy Cheesy Cafe. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/menu" className="hover:text-brand-yellow">
              Privacy Policy
            </Link>
            <span>?</span>
            <Link href="/menu" className="hover:text-brand-yellow">
              Terms &amp; Conditions
            </Link>
          </div>
          <p className="flex items-center gap-1 font-bold text-brand-yellow">
            Stay Cheesy! ??
          </p>
        </div>
      </div>
    </footer>
  );
}
