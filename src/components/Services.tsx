import { ArrowUpRight } from "lucide-react"
import { cad, services } from "../data"
import { useBooking } from "../context/BookingContext"
import { Button, IndexMark, Reveal } from "./ui"

export function Services() {
  const { openBooking } = useBooking()

  return (
    <section id="services" className="scroll-mt-24 bg-ink px-4 py-16 md:px-8 md:py-24 lg:px-12">
      <div className="mx-auto max-w-[1120px] bg-ivory px-5 py-14 text-ink md:px-12 md:py-20 lg:px-14">
        <Reveal className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <IndexMark index="03" label="The menu" tone="light" />
            <h2 className="mt-4 font-serif text-[clamp(3rem,6vw,5.6rem)] leading-[0.88] tracking-[-0.03em]">
              Services <span className="italic text-bronze-deep">&</span> pricing
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-[#3f3b36]">
            Six ways to take the chair. Times are a guide. Prices are in Canadian dollars.
          </p>
        </Reveal>

        <div className="mt-12 hidden grid-cols-[3.5rem_minmax(0,1fr)_5.5rem_5.5rem_4.5rem] gap-4 pb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-[#5c564c] md:grid">
          <span>No.</span>
          <span>Service</span>
          <span>Time</span>
          <span className="text-right">Price</span>
          <span className="sr-only">Book</span>
        </div>

        <div className="mt-2 md:mt-0">
          {services.map((service, index) => (
            <Reveal key={service.id} delay={index * 0.04}>
              <article className="group border-t border-ink/15 py-7 transition-colors duration-300 hover:bg-[#e9e1d4] md:grid md:grid-cols-[3.5rem_minmax(0,1fr)_5.5rem_5.5rem_4.5rem] md:items-baseline md:gap-4 md:px-2">
                <span className="font-serif text-lg italic text-bronze-deep">{service.index}</span>
                <div className="mt-3 md:mt-0">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-serif text-[2rem] leading-none tracking-[-0.03em] md:text-[2.35rem]">
                      {service.name}
                    </h3>
                    <span className="font-medium tabular-nums md:hidden">{cad(service.price)}</span>
                  </div>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#3f3b36]">{service.description}</p>
                  <p className="mt-2 text-sm tabular-nums text-[#5c564c] md:hidden">{service.minutes} min</p>
                </div>
                <span className="hidden tabular-nums md:block">{service.minutes} min</span>
                <span className="hidden text-right font-medium tabular-nums md:block">{cad(service.price)}</span>
                <button
                  type="button"
                  onClick={() => openBooking(service.name)}
                  className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.18em] md:mt-0"
                >
                  Book
                  <ArrowUpRight
                    size={14}
                    strokeWidth={1.5}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                  <span className="sr-only">{service.name}</span>
                </button>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-6 border-t border-ink/15 pt-8 sm:flex-row sm:items-center">
          <p className="max-w-md text-sm leading-relaxed text-[#3f3b36]">
            Walk-ins are welcome. Booking keeps a chair at the time you want.
          </p>
          <Button variant="dark" onClick={() => openBooking()}>
            Book an appointment
          </Button>
        </div>
      </div>
    </section>
  )
}
