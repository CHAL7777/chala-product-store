import React from 'react'
import { FaUserCircle, FaGithub } from "react-icons/fa"
import { Link } from 'react-router-dom'
import { NavbarMenu } from './Navbar'

const MobileMenu = ({ showMenu, setShowMenu }) => {
  return (
    <>
      {/* Overlay backdrop */}
      {showMenu && (
        <div
          className="fixed inset-0 bg-black/60 z-30 md:hidden"
          onClick={() => setShowMenu(false)}
          aria-hidden="true"
        />
      )}

      {/* Slide-out drawer */}
      <div
        className={`${
          showMenu ? 'translate-x-0' : '-translate-x-full'
        } fixed bottom-0 top-0 left-0 z-40 flex h-screen w-[75%] max-w-[300px] flex-col justify-between bg-zinc-950/95 backdrop-blur-md px-8 pb-6 pt-16 text-foreground transition-transform duration-300 ease-in-out md:hidden rounded-r-xl shadow-2xl border-r border-zinc-800`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        <div>
          {/* User greeting */}
          <div className='flex items-center gap-3'>
            <FaUserCircle size={44} className='text-zinc-400' />
            <div>
              <h2 className='text-white font-medium'>Welcome</h2>
              <p className='text-xs text-zinc-500'>SoleFlow Store</p>
            </div>
          </div>

          {/* Nav links */}
          <nav className='mt-8'>
            <ul className='space-y-1'>
              {NavbarMenu.map((item) => (
                <li key={item.id} onClick={() => setShowMenu(false)}>
                  <Link
                    to={item.link}
                    className='block text-sm font-semibold py-2.5 px-3 uppercase text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors'
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Developer attribution & GitHub link */}
        <div className="border-t border-zinc-800 pt-4 space-y-2">
          <a
            href="https://github.com/CHAL7777"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-semibold text-zinc-300 hover:text-brand transition-colors p-2 rounded-lg bg-zinc-900 border border-zinc-800"
          >
            <FaGithub size={16} />
            <span>GitHub: CHAL7777</span>
          </a>
          <p className='text-zinc-500 text-[11px] text-center'>
            &copy; {new Date().getFullYear()} SoleFlow. Developed by CHAL7777
          </p>
        </div>
      </div>
    </>
  )
}

export default MobileMenu
