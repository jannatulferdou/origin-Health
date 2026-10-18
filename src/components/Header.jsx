import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { AppointmentButton, Brand } from './UI'
const links = [
  ['Our care', '#care'],
  ['Our approach', '#approach'],
  ['Wellness', '#wellness'],
]
export default function Header({ onBook }) {
  const [open, setOpen] = useState(false)
  const toggleRef = useRef(null)
  useEffect(() => {
    if (!open) return
    const handleKey = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    const breakpoint = window.matchMedia('(min-width: 768px)')
    const closeOnDesktop = () => {
      if (breakpoint.matches) setOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    breakpoint.addEventListener('change', closeOnDesktop)
    return () => {
      document.removeEventListener('keydown', handleKey)
      breakpoint.removeEventListener('change', closeOnDesktop)
    }
  }, [open])
  const book = () => {
    if (open) toggleRef.current?.focus()
    setOpen(false)
    onBook()
  }
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Brand onClick={() => setOpen(false)} />
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([label, href]) => (
            <a href={href} key={href}>
              {label}
            </a>
          ))}
        </nav>
        <AppointmentButton className="header-book" onClick={book} />
        <button
          className="menu-toggle"
          ref={toggleRef}
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      <nav
        id="mobile-navigation"
        className="mobile-nav"
        aria-label="Mobile navigation"
        hidden={!open}
      >
        {links.map(([label, href]) => (
          <a href={href} key={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
        <AppointmentButton onClick={book} />
      </nav>
    </header>
  )
}
