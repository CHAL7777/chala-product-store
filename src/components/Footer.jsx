import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaGithub } from 'react-icons/fa';
import Logo from '../assets/logo2.png';

const Footer = () => {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800/80 text-zinc-400 pt-16 pb-8">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-zinc-800">
          {/* Brand & Mission */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <img src={Logo} alt="SoleFlow" className="max-w-[80px] invert brightness-200" />
              <span className="font-extrabold text-xl text-zinc-100">
                Sole<span className="text-brand">Flow</span>
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-zinc-400">
              Next-generation athletic & lifestyle footwear portfolio. Designed for supreme responsiveness, stability, and streetwear aesthetics.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/CHAL7777"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-brand hover:border-brand transition-colors"
                aria-label="GitHub Profile"
              >
                <FaGithub size={16} />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-brand hover:border-brand transition-colors" aria-label="Instagram">
                <FaInstagram size={14} />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-brand hover:border-brand transition-colors" aria-label="Twitter">
                <FaTwitter size={14} />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-brand hover:border-brand transition-colors" aria-label="Facebook">
                <FaFacebookF size={14} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-zinc-100 uppercase tracking-widest">Shop Footwear</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/products" className="hover:text-zinc-100 transition-colors">All Products</Link>
              </li>
              <li>
                <Link to="/mens" className="hover:text-zinc-100 transition-colors">Men's Collection</Link>
              </li>
              <li>
                <Link to="/womens" className="hover:text-zinc-100 transition-colors">Women's Collection</Link>
              </li>
              <li>
                <Link to="/kids" className="hover:text-zinc-100 transition-colors">Kids' Collection</Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-zinc-100 uppercase tracking-widest">Customer Support</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/contact" className="hover:text-zinc-100 transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-zinc-100 transition-colors">View Shopping Cart</Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-zinc-100 transition-colors">My Saved Wishlist</Link>
              </li>
              <li>
                <a
                  href="https://github.com/CHAL7777/chala-product-store"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand transition-colors flex items-center gap-1.5"
                >
                  <FaGithub size={12} />
                  <span>GitHub Repository</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-zinc-100 uppercase tracking-widest">Newsletter</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Subscribe to get special discounts and early access to limited sneaker drops.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 pt-1">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-brand"
              />
              <button type="submit" className="btn-primary py-2 px-3 text-xs font-bold shrink-0">
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 text-center text-xs text-zinc-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            &copy; {new Date().getFullYear()} SoleFlow. Developed by{' '}
            <a
              href="https://github.com/CHAL7777"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-300 font-semibold hover:text-brand transition-colors"
            >
              CHAL7777
            </a>
            . All rights reserved.
          </p>
          <div className="flex gap-4 text-xs">
            <a
              href="https://github.com/CHAL7777/chala-product-store"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand transition-colors flex items-center gap-1"
            >
              <FaGithub size={13} />
              <span>Source Code</span>
            </a>
            <span className="hover:text-zinc-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-zinc-400 cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
