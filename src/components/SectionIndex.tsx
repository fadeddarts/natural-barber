import { rail } from "../data"
import { useActiveSection } from "../lib/useActiveSection"

export function SectionIndex() {
  const active = useActiveSection()

  return (
    <nav
      aria-label="Section index"
      className="fixed top-1/2 left-5 z-30 hidden -translate-y-1/2 flex-col gap-3 2xl:flex"
    >
      {rail.map((item) => {
        const current = active === item.id
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            aria-label={item.label}
            aria-current={current ? "location" : undefined}
            className="group flex items-center gap-2"
          >
            <span
              className={`h-px transition-all duration-300 ${
                current ? "w-8 bg-bronze" : "w-3 bg-ivory/30 group-hover:w-6 group-hover:bg-ivory/70"
              }`}
            />
            <span className={`text-[10px] tracking-[0.16em] ${current ? "text-bronze" : "text-ivory-dim"}`}>
              {item.index}
            </span>
          </a>
        )
      })}
    </nav>
  )
}
