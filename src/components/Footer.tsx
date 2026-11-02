import { navLinks, phoneDisplay, phoneHref } from "../data"
import { useBooking } from "../context/BookingContext"
import { Button, SocialList } from "./ui"

const year = new Date().getFullYear()

export function Footer() {
  const { openBooking } = useBooking()

  return (
    <footer className="overflow-x-clip border-t border-ivory/10">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-10 px-5 pt-20 md:flex-row md:items-end md:justify-between md:px-10 md:pt-28">
        <h2 className="max-w-[12ch] font-serif text-[clamp(3.4rem,7vw,7rem)] leading-[0.86] tracking-[-0.035em]">
          The chair is yours.
        </h2>
        <div className="flex flex-col items-start gap-5 pb-2">
          <Button onClick={() => openBooking()}>Book an appointment</Button>
          <a href={phoneHref} className="text-sm text-ivory-dim transition-colors hover:text-ivory">
            {phoneDisplay}
          </a>
        </div>
      </div>

      <nav
        aria-label="Footer"
        className="mx-auto mt-16 flex max-w-[1500px] flex-wrap gap-x-6 gap-y-3 px-5 md:px-10"
      >
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className="text-[11px] font-medium uppercase tracking-[0.18em] text-ivory-dim transition-colors hover:text-ivory"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="mt-16 overflow-hidden">
        <p
          aria-hidden="true"
          className="px-3 font-serif text-[22vw] leading-[0.76] tracking-[-0.055em] whitespace-nowrap text-ivory select-none"
        >
          Natural
        </p>
      </div>

      <div className="mx-auto flex max-w-[1500px] flex-col gap-4 border-t border-ivory/10 px-5 py-6 text-[11px] font-medium uppercase tracking-[0.16em] text-ivory-dim md:flex-row md:items-center md:justify-between md:px-10">
        <p>© {year} Natural Barber Shop</p>
        <p>902 Wilson Ave · North York · Ontario</p>
        <SocialList />
      </div>
    </footer>
  )
}
