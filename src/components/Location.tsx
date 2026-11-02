import { directionsUrl, mapEmbedUrl, mapsUrl, phoneDisplay, phoneHref } from "../data"
import { formatRange, week } from "../lib/hours"
import { useShopStatus } from "../lib/useShopStatus"
import { useBooking } from "../context/BookingContext"
import { Button, IndexMark, Reveal, SocialList } from "./ui"

export function Location() {
  const status = useShopStatus()
  const { openBooking } = useBooking()

  return (
    <section id="visit" className="scroll-mt-24 border-t border-ivory/10">
      <div className="grid lg:grid-cols-2">
        <Reveal className="px-5 py-20 md:px-12 lg:py-28 2xl:pl-28">
          <IndexMark index="07" label="Visit" />
          <h2 className="mt-4 font-serif text-[clamp(3rem,5vw,5rem)] leading-[0.88] tracking-[-0.03em]">
            902 Wilson Avenue.
          </h2>
          <p className="mt-4 text-ivory-dim">North York, Ontario · M3K 1E7</p>
          <p className="mt-5 inline-flex items-center gap-2 text-sm">
            <span className={`inline-block h-1.5 w-1.5 ${status.open ? "bg-bronze" : "bg-ivory-dim"}`} />
            {status.label}
          </p>

          <ul className="mt-10 max-w-md">
            {week.map((day) => {
              const today = day.short === status.today
              return (
                <li
                  key={day.short}
                  className={`flex items-baseline justify-between gap-6 border-t border-ivory/15 py-2.5 text-sm ${
                    today ? "text-ivory" : "text-ivory-dim"
                  }`}
                >
                  <span className="inline-flex items-center gap-2">
                    <span className={`h-1.5 w-1.5 ${today ? "bg-bronze" : "bg-transparent"}`} />
                    {day.day}
                  </span>
                  <span className="tabular-nums">{formatRange(day)}</span>
                </li>
              )
            })}
          </ul>

          <a
            href={phoneHref}
            className="mt-10 inline-block font-serif text-4xl tracking-[-0.03em] transition-colors hover:text-bronze md:text-5xl"
          >
            {phoneDisplay}
          </a>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button onClick={() => openBooking()}>Book an appointment</Button>
            <Button href={phoneHref} variant="ghost">
              Call
            </Button>
            <Button href={directionsUrl} variant="ghost" external>
              Directions
            </Button>
          </div>

          <SocialList className="mt-8" />
          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block text-[11px] font-medium uppercase tracking-[0.2em] text-ivory-dim hover:text-bronze"
          >
            Google listing
          </a>
        </Reveal>

        <div className="relative h-full min-h-[420px] border-t border-ivory/10 bg-[#141311] lg:border-t-0 lg:border-l">
          <iframe
            title="Map of Natural Barber Shop at 902 Wilson Avenue, North York"
            src={mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full grayscale contrast-125 brightness-[0.62]"
          />
          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="absolute bottom-4 left-4 bg-ivory px-4 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-ink"
          >
            Open in Google Maps
          </a>
        </div>
      </div>
    </section>
  )
}
