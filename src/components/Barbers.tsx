import { barbers } from "../data"
import { IndexMark, Reveal } from "./ui"

const offsets = ["", "lg:mt-28", "lg:mt-12"]
const aspects = ["aspect-[3/4]", "aspect-[4/5]", "aspect-[3/4]"]

export function Barbers() {
  return (
    <section id="barbers" className="scroll-mt-24 border-t border-ivory/10 px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1500px]">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <IndexMark index="04" label="The barbers" />
            <h2 className="mt-4 font-serif text-[clamp(3rem,6vw,5.7rem)] leading-[0.88] tracking-[-0.03em]">
              Three chairs.
              <br />
              One standard.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-ivory-dim md:text-base">
            Ask for a chair when you book, or take whoever is free. The finish does not change with the chair.
          </p>
        </Reveal>

        <div className="mt-16 grid items-start gap-14 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {barbers.map((barber, index) => (
            <Reveal key={barber.name} delay={index * 0.08} className={offsets[index] ?? ""}>
              <article>
                <div className={`overflow-hidden bg-panel ${aspects[index]}`}>
                  <img
                    src={barber.image}
                    alt={barber.alt}
                    loading="lazy"
                    decoding="async"
                    className={`h-full w-full object-cover transition duration-700 ease-out hover:scale-[1.04] ${barber.position}`}
                  />
                </div>
                <h3 className="mt-5 font-serif text-4xl tracking-[-0.03em]">{barber.name}</h3>
                <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.22em] text-bronze">
                  {barber.specialty}
                </p>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-ivory-dim">{barber.bio}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
