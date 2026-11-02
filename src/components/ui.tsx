import { ArrowUpRight, Star } from "lucide-react"
import { motion, useReducedMotion, useScroll, type Variants } from "framer-motion"
import type { ReactNode } from "react"
import { socials } from "../data"

export const EASE = [0.22, 1, 0.36, 1] as const

const buttonStyles = {
  light: "bg-ivory text-ink hover:bg-bronze",
  dark: "bg-ink text-ivory hover:bg-bronze hover:text-ink",
  ghost: "border border-ivory/35 text-ivory hover:bg-ivory hover:text-ink",
  line: "border border-ink/20 text-ink hover:bg-ink hover:text-ivory",
} as const

export function Button({
  children,
  variant = "light",
  href,
  onClick,
  className = "",
  external = false,
}: {
  children: ReactNode
  variant?: keyof typeof buttonStyles
  href?: string
  onClick?: () => void
  className?: string
  external?: boolean
}) {
  const classNames = `inline-flex min-h-11 items-center justify-center gap-2.5 px-5 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 ${buttonStyles[variant]} ${className}`

  if (href) {
    return (
      <a
        href={href}
        className={classNames}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {children}
        {external ? <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden /> : null}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} className={classNames}>
      {children}
    </button>
  )
}

export function IndexMark({
  index,
  label,
  tone = "dark",
}: {
  index: string
  label: string
  tone?: "dark" | "light"
}) {
  const color = tone === "light" ? "text-bronze-deep" : "text-bronze"
  const slash = tone === "light" ? "text-ink/30" : "text-ivory/35"
  return (
    <p className={`text-[11px] font-medium uppercase tracking-[0.28em] ${color}`}>
      {index}
      <span className={`mx-2 ${slash}`}>/</span>
      {label}
    </p>
  )
}

export function Stars({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-1" aria-hidden="true">
      {Array.from({ length: 5 }, (_, index) => {
        const amount = Math.min(1, Math.max(0, value - index))
        return (
          <span key={index} className="relative inline-flex">
            <Star size={13} strokeWidth={1.25} className="text-bronze" />
            <span
              className="absolute inset-y-0 left-0 overflow-hidden"
              style={{ width: `${amount * 100}%` }}
            >
              <Star size={13} strokeWidth={1.25} className="fill-bronze text-bronze" />
            </span>
          </span>
        )
      })}
    </span>
  )
}

export function SocialList({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-x-5 gap-y-2 ${className}`}>
      {socials.map((item) => (
        <li key={item.label}>
          <a
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="text-[11px] font-medium uppercase tracking-[0.2em] text-ivory-dim transition-colors hover:text-bronze"
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  )
}

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

export const rise: Variants = {
  hide: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
}

export function ProgressBar() {
  const { scrollYProgress } = useScroll()
  const reduce = useReducedMotion()
  if (reduce) return null
  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed inset-x-0 top-0 z-[60] h-px origin-left bg-bronze"
    />
  )
}
