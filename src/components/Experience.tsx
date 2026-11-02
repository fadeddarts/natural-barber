import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { chapters } from "../data"
import { EASE, IndexMark } from "./ui"

export function Experience() {
  const [active, setActive] = useState(0)
  const reduce = useReducedMotion()
  const refs = useRef<Array<HTMLElement | null>>([])

  useEffect(() => {
    const nodes = refs.current.filter((node): node is HTMLElement => Boolean(node))
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (!hit) return
        const index = Number((hit.target as HTMLElement).dataset.index)
        if (!Number.isNaN(index)) setActive(index)
      },
      { rootMargin: "-42% 0px -48% 0px", threshold: 0 },
    )
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  const chapter = chapters[active] ?? chapters[0]

  return (
    <section id="experience" className="scroll-mt-24 border-t border-ivory/10">
      <div className="mx-auto max-w-[1500px] px-5 pt-20 md:px-10 lg:px-14 lg:pt-28">
        <IndexMark index="05" label="The experience" />
        <h2 className="mt-4 max-w-3xl font-serif text-[clamp(3rem,6vw,5.7rem)] leading-[0.88] tracking-[-0.03em]">
          What the hour feels like.
        </h2>
      </div>

      <div className="mx-auto mt-10 grid max-w-[1600px] lg:mt-4 lg:grid-cols-12">
        <div className="relative hidden lg:col-span-7 lg:block">
          <div className="sticky top-16 h-[calc(100svh-4rem)] p-6 xl:p-10">
            <div className="relative h-full overflow-hidden bg-panel">
              <AnimatePresence mode="sync">
                <motion.img
                  key={chapter.image}
                  src={chapter.image}
                  alt={chapter.alt}
                  initial={reduce ? false : { opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.7, ease: EASE }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex gap-1.5 p-5">
                {chapters.map((item, index) => (
                  <span
                    key={item.index}
                    className={`h-px w-7 ${index === active ? "bg-bronze" : "bg-ivory/35"}`}
                  />
                ))}
              </div>
              <p className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-ink/70 to-transparent px-5 pt-16 pb-5 text-[11px] font-medium uppercase tracking-[0.24em]">
                {chapter.index} / {chapter.title}
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          {chapters.map((item, index) => (
            <article
              key={item.index}
              data-index={index}
              ref={(node) => {
                refs.current[index] = node
              }}
              className="flex flex-col justify-center border-t border-ivory/10 px-5 py-14 md:px-10 lg:min-h-[100svh] lg:border-t-0 lg:px-12 lg:py-24 xl:px-16"
            >
              <img
                src={item.image}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                className="mb-8 aspect-[4/5] w-full object-cover lg:hidden"
              />
              <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-bronze">{item.index}</p>
              <h3 className="mt-3 font-serif text-5xl tracking-[-0.03em] md:text-6xl">{item.title}</h3>
              <p className="mt-5 max-w-md text-base leading-relaxed text-ivory-dim">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
