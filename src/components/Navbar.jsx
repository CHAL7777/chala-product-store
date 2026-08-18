import React, { useContext, useState } from 'react'
import Logo from '../assets/logo2.png'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingBag, Heart } from 'lucide-react'
import { FaRegUser } from "react-icons/fa"
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi"
import MobileMenu from './MobileMenu'
import { ShopContext } from '../context/ShopContext'
import { useWishlist } from '../context/WishlistContext'

export const NavbarMenu = [
  { id: 1, title: "Home",     link: "/" },
  { id: 2, title: "Catalog",  link: "/products" },
  { id: 3, title: "Men",      link: "/mens" },
  { id: 4, title: "Women",    link: "/womens" },
  { id: 5, title: "Kids",     link: "/kids" },
  { id: 6, title: "Contact",  link: "/contact" },
]

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false)
  const { getTotalCartItems } = useContext(ShopContext)
  const { wishlistCount } = useWishlist()
  const location = useLocation()
  const isHome = location.pathname === '/'

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  const cartCount = getTotalCartItems()

  return (
    <nav
      className={`text-white py-3 sm:py-4 z-50 transition-all duration-300 ${
        isHome
          ? 'absolute top-0 left-0 right-0'
          : 'bg-zinc-950/85 backdrop-blur-md border-b border-zinc-800/80 sticky top-0'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className={`section-container flex justify-between items-center ${isHome ? 'rounded-2xl border border-white/10 bg-zinc-950/45 px-4 py-2.5 backdrop-blur-xl shadow-2xl shadow-black/10 sm:px-5' : ''}`}>
        {/* Logo & Brand */}
        <Link to="/" aria-label="SoleFlow Home" className="flex items-center gap-2">
          <img src={Logo} alt="SoleFlow logo" className='max-w-[90px] invert brightness-200' />
          <span className="font-extrabold text-xl tracking-tight text-zinc-100 hidden sm:inline">
            Sole<span className="text-brand">Flow</span>
          </span>
        </Link>

        {/* Desktop Menu Links */}
        <div className='hidden lg:block'>
          <ul className='flex items-center gap-1 relative z-40'>
            {NavbarMenu.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.link}
                  className={`inline-block text-xs font-semibold py-2 px-3 uppercase tracking-wider rounded-lg transition-all duration-200 ${
                    (item.link === '/' ? location.pathname === '/' : location.pathname.startsWith(item.link))
                      ? 'text-brand bg-brand/10 border border-brand/20'
                      : 'text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800/60'
                  }`}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop Utility Actions (Wishlist, Cart, Account) */}
        <div className="hidden sm:flex items-center gap-2">
          {/* Wishlist button */}
          <Link
            to='/wishlist'
            className='inline-flex items-center justify-center p-2.5 rounded-xl text-zinc-300 hover:text-rose-400 hover:bg-zinc-800/60 transition-all relative'
            aria-label={`Wishlist with ${wishlistCount} items`}
          >
            <Heart size={19} className={wishlistCount > 0 ? 'text-rose-400 fill-rose-400/20' : ''} />
            {wishlistCount > 0 && (
              <span className='bg-rose-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full absolute -top-1 -right-1 font-bold'>
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart button */}
          <Link
            to='/cart'
            className='inline-flex items-center justify-center p-2.5 rounded-xl text-zinc-300 hover:text-brand hover:bg-zinc-800/60 transition-all relative'
            aria-label={`Shopping cart with ${cartCount} items`}
          >
            <ShoppingBag size={19} className={cartCount > 0 ? 'text-brand' : ''} />
            {cartCount > 0 && (
              <span className='bg-brand text-zinc-950 text-[10px] w-4 h-4 flex items-center justify-center rounded-full absolute -top-1 -right-1 font-bold'>
                {cartCount}
              </span>
            )}
          </Link>

          {/* Account Button */}
          <button
            className='inline-flex items-center justify-center p-2.5 rounded-xl text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60 transition-all ml-1'
            aria-label="User account"
          >
            <FaRegUser size={15} />
          </button>
        </div>

        {/* Mobile menu icon controls */}
        <div className='flex items-center gap-3 sm:hidden z-50'>
          <Link to='/wishlist' className="relative p-1.5 text-zinc-300" aria-label="Wishlist">
            <Heart size={20} className={wishlistCount > 0 ? 'text-rose-400 fill-rose-400/20' : ''} />
            {wishlistCount > 0 && (
              <span className='bg-rose-500 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full absolute -top-1 -right-1 font-bold'>
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link to='/cart' className='relative p-1.5 text-zinc-300' aria-label="Shopping cart">
            <ShoppingBag size={20} className={cartCount > 0 ? 'text-brand' : ''} />
            {cartCount > 0 && (
              <span className='bg-brand text-zinc-950 text-[9px] w-4 h-4 flex items-center justify-center rounded-full absolute -top-1 -right-1 font-bold'>
                {cartCount}
              </span>
            )}
          </Link>
          <button
            onClick={toggleMenu}
            className='p-1.5 text-zinc-300 hover:text-white transition-all'
            aria-label={showMenu ? "Close menu" : "Open menu"}
            aria-expanded={showMenu}
          >
            {showMenu ? <HiMenuAlt1 size={26} /> : <HiMenuAlt3 size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <MobileMenu showMenu={showMenu} setShowMenu={setShowMenu} />
    </nav>
  )
}

export default Navbar
