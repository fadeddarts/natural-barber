import { mapsUrl, reviews } from "../data"
import { Reveal, Stars } from "./ui"

export function Testimonials() {
  return (
    <section className="border-t border-ivory/10 px-5 py-20 md:px-10 md:py-28" aria-labelledby="reviews-title">
      <div className="mx-auto max-w-[1500px]">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2
            id="reviews-title"
            className="font-serif text-[clamp(2.6rem,5vw,4.6rem)] leading-[0.9] tracking-[-0.03em]"
          >
            From the chair.
          </h2>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 text-sm text-ivory-dim hover:text-ivory"
            aria-label="Rated 4.5 out of 5 from 128 Google reviews"
          >
            <Stars value={4.5} />
            <span>4.5 / 128 Google reviews</span>
          </a>
        </Reveal>

        <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-10">
          {reviews.map((review, index) => (
            <Reveal key={review.name} delay={index * 0.06}>
              <figure className="border-t border-ivory/15 pt-6">
                <blockquote className="font-serif text-[1.65rem] leading-snug tracking-[-0.02em] italic">
                  “{review.quote}”
                </blockquote>
                <figcaption className="mt-6 text-[11px] font-medium uppercase tracking-[0.2em] text-ivory-dim">
                  {review.name}
                  <span className="mx-2 text-ivory/30">/</span>
                  Google review
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
