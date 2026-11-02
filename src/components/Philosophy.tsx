import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { mapsUrl } from "../data"
import { IndexMark, Reveal } from "./ui"

const facts = [
  { value: "4.5", label: "Google rating", href: mapsUrl },
  { value: "128", label: "Reviews", href: mapsUrl },
  { value: "Walk-ins", label: "Welcome" },
]

export function Philosophy() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], [-28, 28])

  return (
    <section id="story" className="scroll-mt-24 border-t border-ivory/10 px-5 py-20 md:px-10 md:py-28 lg:py-36">
      <div className="mx-auto grid max-w-[1500px] items-end gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-6 lg:pb-6">
          <IndexMark index="02" label="Philosophy" />
          <h2 className="mt-6 font-serif text-[clamp(3.3rem,6.5vw,6.5rem)] leading-[0.86] tracking-[-0.03em]">
            <span className="block">Not just</span>
            <span className="block">a haircut.</span>
            <span className="mt-1 block italic text-bronze">A standard.</span>
          </h2>
          <p className="mt-8 max-w-md text-base leading-relaxed text-ivory-dim md:text-lg">
            Natural is a barbershop on Wilson Avenue. We cut hair the way a good tailor cuts cloth: measured, quiet,
            and specific to the person in the chair. Fades, beards, and a hot towel when the appointment calls for it.
            The room stays clean. The work stays unhurried.
          </p>
          <dl className="mt-12 grid grid-cols-3 gap-3 border-t border-ivory/15 pt-6">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="font-serif text-[clamp(1.45rem,2.4vw,2.15rem)] leading-none tracking-[-0.03em]">
                  {fact.href ? (
                    <a href={fact.href} target="_blank" rel="noreferrer" className="hover:text-bronze">
                      {fact.value}
                    </a>
                  ) : (
                    fact.value
                  )}
                </dt>
                <dd className="mt-2 text-[11px] uppercase tracking-[0.16em] text-ivory-dim">{fact.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div ref={ref} className="relative lg:col-span-5 lg:col-start-8">
          <div className="relative">
            <span className="absolute -top-2 -left-2 h-4 w-4 border-t border-l border-bronze/80" />
            <span className="absolute -top-2 -right-2 h-4 w-4 border-t border-r border-bronze/80" />
            <span className="absolute -bottom-2 -left-2 h-4 w-4 border-b border-l border-bronze/80" />
            <span className="absolute -right-2 -bottom-2 h-4 w-4 border-r border-b border-bronze/80" />
            <div className="aspect-[3/4] overflow-hidden bg-panel">
              <motion.img
                src={`${import.meta.env.BASE_URL}images/chair.jpg`}
                alt="A tufted brown leather barber chair with polished chrome arms"
                loading="lazy"
                decoding="async"
                style={reduce ? undefined : { y, scale: 1.12 }}
                className="h-full w-full object-cover object-[center_20%]"
              />
            </div>
          </div>
          <p className="mt-5 text-[11px] font-medium uppercase tracking-[0.22em] text-ivory-dim">
            The chair, before anyone sits.
          </p>
        </div>
      </div>
    </section>
  )
}
