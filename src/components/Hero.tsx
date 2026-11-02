import { motion, useReducedMotion } from "framer-motion"
import { mapsUrl } from "../data"
import { useBooking } from "../context/BookingContext"
import { useShopStatus } from "../lib/useShopStatus"
import { Button, EASE, rise } from "./ui"

const container = {
  hide: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
}

export function Hero() {
  const { openBooking } = useBooking()
  const status = useShopStatus()
  const reduce = useReducedMotion()

  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden bg-ink text-ivory">
      <motion.div
        className="absolute inset-0 lg:left-[34%]"
        initial={reduce ? false : { scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: EASE }}
      >
        <img
          src={`${import.meta.env.BASE_URL}images/hero.jpg`}
          alt="A barber trimming a client’s beard with shears in low, warm light"
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-[center_42%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/35 lg:bg-gradient-to-r lg:from-ink lg:via-ink/55 lg:to-ink/10" />
      </motion.div>

      <p className="pointer-events-none absolute top-28 right-5 z-10 hidden text-[10px] font-medium uppercase tracking-[0.42em] text-ivory/75 [writing-mode:vertical-rl] lg:block">
        902 Wilson Avenue
      </p>

      <motion.div
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1500px] flex-col justify-end px-5 pt-28 pb-12 md:px-10 lg:pb-16"
        variants={container}
        initial={reduce ? false : "hide"}
        animate="show"
      >
        <motion.p variants={rise} className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-medium uppercase tracking-[0.26em]">
          <span>North York, Toronto</span>
          <span className="h-px w-8 bg-bronze" />
          <span className="inline-flex items-center gap-2 normal-case tracking-[0.08em] text-ivory-dim">
            <span className={`inline-block h-1.5 w-1.5 ${status.open ? "bg-bronze" : "bg-ivory-dim"}`} />
            {status.label}
          </span>
        </motion.p>

        <motion.h1
          variants={rise}
          className="font-serif text-[clamp(4.1rem,8.4vw,8.15rem)] leading-[0.84] tracking-[-0.035em]"
        >
          <span className="block">The art</span>
          <span className="block">
            of a <em className="italic text-bronze">better</em>
          </span>
          <span className="block">cut.</span>
        </motion.h1>

        <motion.p variants={rise} className="mt-7 max-w-md text-base leading-relaxed text-ivory-dim md:text-lg">
          Precision, character, and craftsmanship. A different standard of grooming.
        </motion.p>

        <motion.div variants={rise} className="mt-8 flex flex-wrap items-center gap-3">
          <Button onClick={() => openBooking()}>Book an appointment</Button>
          <Button href="#services" variant="ghost">
            View services
          </Button>
        </motion.div>

        <motion.p variants={rise} className="mt-6 text-sm text-ivory-dim">
          <a href={mapsUrl} target="_blank" rel="noreferrer" className="underline-offset-4 hover:text-ivory hover:underline">
            4.5 from 128 Google reviews
          </a>
          <span className="mx-3 text-ivory/30">/</span>
          Walk-ins welcome
        </motion.p>
      </motion.div>

      <div className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-3 lg:flex">
        <motion.span
          className="block h-px w-14 origin-left bg-ivory/70"
          animate={reduce ? undefined : { scaleX: [0.3, 1, 0.3] }}
          transition={reduce ? undefined : { duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-ivory/80">Scroll</span>
      </div>
    </section>
  )
}
