import Link from "next/link";
import {
  Camera,
  ThumbsUp,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import { cafeInfo } from "@/data/cafe";
import { categories } from "@/data/categories";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer id="contact" className="bg-brand-dark text-brand-cream">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <BrandLogo light />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-brand-cream/70">
              {cafeInfo.shortDescription}
            </p>
            <div className="mt-5 flex gap-2">
              {[
                { href: cafeInfo.instagram, icon: Camera, label: "Instagram" },
                { href: cafeInfo.facebook, icon: ThumbsUp, label: "Facebook" },
                {
                  href: cafeInfo.whatsapp,
                  icon: MessageCircle,
                  label: "WhatsApp",
                },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-brand-cream transition-all hover:bg-brand-yellow hover:text-brand-charcoal"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-brand-yellow">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-cream/70 transition-colors hover:text-brand-yellow"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-brand-yellow">
              Categories
            </h3>
            <ul className="mt-4 space-y-2.5">
              {categories.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/menu?category=${cat.id}`}
                    className="text-sm text-brand-cream/70 transition-colors hover:text-brand-yellow"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-brand-yellow">
              Contact
            </h3>
            <ul className="mt-4 space-y-3.5 text-sm text-brand-cream/70">
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="shrink-0 text-brand-yellow" />
                {cafeInfo.phone}
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="shrink-0 text-brand-yellow" />
                {cafeInfo.email}
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin size={16} className="shrink-0 text-brand-yellow" />
                {cafeInfo.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-center text-sm text-brand-cream/50 sm:flex-row sm:text-left">
          <p>
            © 2026 {cafeInfo.name}. All rights reserved.
          </p>
          <p className="text-brand-yellow/70">
            Made with a whole lot of cheese.
          </p>
        </div>
      </div>
    </footer>
  );
}
