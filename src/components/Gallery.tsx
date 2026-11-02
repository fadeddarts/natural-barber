import { gallery } from "../data"
import { IndexMark, Reveal } from "./ui"

function Tile({
  shot,
  className,
}: {
  shot: (typeof gallery)[number]
  className: string
}) {
  return (
    <figure className={`group relative overflow-hidden bg-panel ${className}`}>
      <img
        src={shot.src}
        alt={shot.alt}
        loading="lazy"
        decoding="async"
        className={`h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.045] ${shot.position}`}
      />
      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 via-ink/25 to-transparent px-4 pt-16 pb-4 text-[11px] font-medium uppercase tracking-[0.22em] text-ivory md:opacity-0 md:transition md:duration-300 md:group-hover:opacity-100">
        {shot.caption}
      </figcaption>
    </figure>
  )
}

export function Gallery() {
  const [shave, fadeClose, towel, chair, blend, texture, room, line] = gallery

  return (
    <section id="gallery" className="scroll-mt-24 border-t border-ivory/10 px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1500px]">
        <Reveal className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <div>
            <IndexMark index="06" label="Gallery" />
            <h2 className="mt-4 font-serif text-[clamp(3rem,6vw,5.7rem)] leading-[0.88] tracking-[-0.03em]">
              The work,
              <br />
              up close.
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-ivory-dim">
            Fades, beards, the chair, and the room. A record of the standard, not a catalogue of trends.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:gap-4">
          <Tile shot={shave} className="min-h-[420px] md:col-span-7 md:row-span-2 md:min-h-[680px]" />
          <Tile shot={fadeClose} className="min-h-[260px] md:col-span-5 md:min-h-[332px]" />
          <Tile shot={towel} className="min-h-[260px] md:col-span-5 md:min-h-[332px]" />
          <Tile shot={chair} className="min-h-[280px] md:col-span-4" />
          <Tile shot={blend} className="min-h-[280px] md:col-span-4" />
          <Tile shot={texture} className="min-h-[360px] md:col-span-4 md:row-span-2 md:min-h-full" />
          <Tile shot={room} className="min-h-[300px] md:col-span-8" />
          <Tile shot={line} className="min-h-[280px] md:col-span-12" />
        </div>
      </div>
    </section>
  )
}
