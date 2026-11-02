import { Menu, X } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useEffect, useState } from "react"
import { navLinks, phoneDisplay, phoneHref } from "../data"
import { useBooking } from "../context/BookingContext"
import { useActiveSection } from "../lib/useActiveSection"
import { Button, EASE } from "./ui"

export function Nav() {
  const active = useActiveSection()
  const { openBooking } = useBooking()
  const reduce = useReducedMotion()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false)
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previous
    }
  }, [menuOpen])

  function book() {
    setMenuOpen(false)
    openBooking()
  }

  return (
    <>
    <motion.header
      initial={reduce ? false : { opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || menuOpen ? "border-b border-ivory/10 bg-ink/90 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-4 px-5 md:h-[4.5rem] md:px-8">
        <a href="#top" className="leading-none" onClick={() => setMenuOpen(false)}>
          <span className="block font-serif text-[1.65rem] italic tracking-[-0.03em] text-ivory">Natural</span>
          <span className="mt-0.5 block text-[9px] font-medium uppercase tracking-[0.32em] text-ivory-dim">
            Barber Shop
          </span>
        </a>

        <nav className="hidden items-center gap-6 xl:gap-8 lg:flex" aria-label="Primary">
          {navLinks.map((link) => {
            const current = active === link.id
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                aria-current={current ? "location" : undefined}
                className="group relative py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-ivory/80 transition-colors hover:text-ivory"
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 h-px bg-bronze transition-all duration-300 ${
                    current ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button onClick={book} className="hidden px-4 sm:inline-flex">
            <span className="xl:hidden">Book</span>
            <span className="hidden xl:inline">Book an appointment</span>
          </Button>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center text-ivory lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
            {menuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </div>
      </div>
    </motion.header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.35 }}
            className="fixed inset-0 z-40 overflow-y-auto bg-ink px-6 pt-24 pb-12 lg:hidden"
          >
            <nav className="flex flex-col" aria-label="Mobile">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setMenuOpen(false)}
                  initial={reduce ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.05 * index, ease: EASE }}
                  className="border-b border-ivory/10 py-4 font-serif text-5xl tracking-[-0.03em] text-ivory"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
            <div className="mt-10 flex flex-col items-start gap-6">
              <Button onClick={book}>Book an appointment</Button>
              <a href={phoneHref} className="text-lg text-ivory-dim">
                {phoneDisplay}
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
