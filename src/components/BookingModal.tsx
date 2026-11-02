import { useEffect, useId, useRef, useState, type FormEvent } from "react"
import { services, phoneDisplay, phoneHref } from "../data"
import { useBooking } from "../context/BookingContext"

type Fields = {
  name: string
  phone: string
  service: string
  day: string
  time: string
  note: string
}

const empty: Fields = {
  name: "",
  phone: "",
  service: "",
  day: "",
  time: "",
  note: "",
}

const times = Array.from({ length: 24 }, (_, index) => {
  const hour = 9 + Math.floor(index / 2)
  const minute = index % 2 === 0 ? "00" : "30"
  if (hour > 20) return null
  const suffix = hour >= 12 ? "p.m." : "a.m."
  const h = hour % 12 === 0 ? 12 : hour % 12
  return `${h}:${minute} ${suffix}`
}).filter((value): value is string => Boolean(value))

function todayValue() {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const day = String(now.getDate()).padStart(2, "0")
  return `${now.getFullYear()}-${month}-${day}`
}

export function BookingModal() {
  const { open, service, closeBooking } = useBooking()
  if (!open) return null
  return <BookingDialog preset={service ?? ""} onClose={closeBooking} />
}

function BookingDialog({ preset, onClose }: { preset: string; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const baseId = useId()
  const [form, setForm] = useState<Fields>({ ...empty, service: preset })
  const [errors, setErrors] = useState<Partial<Fields>>({})
  const [sent, setSent] = useState(false)
  const [message, setMessage] = useState("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const node = dialogRef.current
    const previous = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const focusable = () =>
      Array.from(
        node?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      )

    window.setTimeout(() => focusable()[0]?.focus(), 20)

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose()
        return
      }
      if (event.key !== "Tab" || !node) return
      const items = focusable()
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = previousOverflow
      previous?.focus()
    }
  }, [onClose, sent])

  function update(field: keyof Fields, value: string) {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  function submit(event: FormEvent) {
    event.preventDefault()
    const next: Partial<Fields> = {}
    if (form.name.trim().length < 2) next.name = "Add your name."
    if (form.phone.replace(/\D/g, "").length < 10) next.phone = "Add a phone number we can reach."
    if (!form.service) next.service = "Choose a service."
    setErrors(next)
    if (Object.keys(next).length > 0) return

    const text = [
      "Hi Natural Barber Shop — I'd like to book.",
      `Name: ${form.name.trim()}`,
      `Phone: ${form.phone.trim()}`,
      `Service: ${form.service}`,
      form.day || form.time ? `When: ${[form.day, form.time].filter(Boolean).join(" · ")}` : "When: flexible",
      form.note.trim() ? `Note: ${form.note.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n")

    setMessage(text)
    setSent(true)
    window.location.href = `sms:${phoneHref.replace("tel:", "")}?&body=${encodeURIComponent(text)}`
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(message)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  const fieldClass =
    "mt-1 w-full border-b border-ink/20 bg-transparent py-2 text-base text-ink transition-colors focus:border-ink focus-visible:outline-none"

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-ink/75 p-3 sm:items-center"
      onMouseDown={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${baseId}-title`}
        onMouseDown={(event) => event.stopPropagation()}
        className="max-h-[min(92svh,760px)] w-full max-w-[560px] overflow-y-auto bg-ivory p-6 text-ink sm:p-10"
        style={{ colorScheme: "light" }}
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-bronze-deep">Appointment</p>
            <h2 id={`${baseId}-title`} className="mt-2 font-serif text-4xl tracking-[-0.03em] sm:text-5xl">
              {sent ? "The request is ready." : "Book a chair."}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 px-2 text-[11px] font-medium uppercase tracking-[0.18em]"
          >
            Close
          </button>
        </div>

        {sent ? (
          <div className="mt-8">
            <p className="max-w-md text-base leading-relaxed text-[#3f3b36]">
              A text to {phoneDisplay} should be open. If this device cannot send it, call the shop and read them the
              request. Walk-ins are still welcome.
            </p>
            <pre className="mt-6 border-t border-ink/15 pt-4 font-sans text-sm leading-relaxed whitespace-pre-wrap text-ink">
              {message}
            </pre>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={phoneHref}
                className="inline-flex min-h-11 items-center bg-ink px-5 text-[11px] font-medium uppercase tracking-[0.2em] text-ivory"
              >
                Call the shop
              </a>
              <button
                type="button"
                onClick={copy}
                className="inline-flex min-h-11 items-center border border-ink/20 px-5 text-[11px] font-medium uppercase tracking-[0.2em]"
              >
                {copied ? "Copied" : "Copy request"}
              </button>
            </div>
          </div>
        ) : (
          <form className="mt-8 grid gap-6" onSubmit={submit} noValidate>
            <p className="text-sm leading-relaxed text-[#3f3b36]">
              902 Wilson Avenue · Walk-ins welcome. We’ll confirm the chair by text or by phone.
            </p>

            <label className="block" htmlFor={`${baseId}-name`}>
              <span className="text-[11px] font-medium uppercase tracking-[0.2em]">Name</span>
              <input
                id={`${baseId}-name`}
                name="name"
                autoComplete="name"
                value={form.name}
                onChange={(event) => update("name", event.target.value)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? `${baseId}-name-error` : undefined}
                className={fieldClass}
              />
              {errors.name ? (
                <span id={`${baseId}-name-error`} className="mt-1 block text-sm text-[#7a2e24]">
                  {errors.name}
                </span>
              ) : null}
            </label>

            <label className="block" htmlFor={`${baseId}-phone`}>
              <span className="text-[11px] font-medium uppercase tracking-[0.2em]">Phone</span>
              <input
                id={`${baseId}-phone`}
                name="phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                value={form.phone}
                onChange={(event) => update("phone", event.target.value)}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? `${baseId}-phone-error` : undefined}
                className={fieldClass}
              />
              {errors.phone ? (
                <span id={`${baseId}-phone-error`} className="mt-1 block text-sm text-[#7a2e24]">
                  {errors.phone}
                </span>
              ) : null}
            </label>

            <label className="block" htmlFor={`${baseId}-service`}>
              <span className="text-[11px] font-medium uppercase tracking-[0.2em]">Service</span>
              <select
                id={`${baseId}-service`}
                name="service"
                value={form.service}
                onChange={(event) => update("service", event.target.value)}
                aria-invalid={Boolean(errors.service)}
                aria-describedby={errors.service ? `${baseId}-service-error` : undefined}
                className={fieldClass}
              >
                <option value="">Choose a service</option>
                {services.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
              {errors.service ? (
                <span id={`${baseId}-service-error`} className="mt-1 block text-sm text-[#7a2e24]">
                  {errors.service}
                </span>
              ) : null}
            </label>

            <div className="grid gap-6 sm:grid-cols-2">
              <label className="block" htmlFor={`${baseId}-day`}>
                <span className="text-[11px] font-medium uppercase tracking-[0.2em]">Preferred day</span>
                <input
                  id={`${baseId}-day`}
                  name="day"
                  type="date"
                  min={todayValue()}
                  value={form.day}
                  onChange={(event) => update("day", event.target.value)}
                  className={fieldClass}
                />
              </label>
              <label className="block" htmlFor={`${baseId}-time`}>
                <span className="text-[11px] font-medium uppercase tracking-[0.2em]">Preferred time</span>
                <select
                  id={`${baseId}-time`}
                  name="time"
                  value={form.time}
                  onChange={(event) => update("time", event.target.value)}
                  className={fieldClass}
                >
                  <option value="">Flexible</option>
                  {times.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="block" htmlFor={`${baseId}-note`}>
              <span className="text-[11px] font-medium uppercase tracking-[0.2em]">Note</span>
              <textarea
                id={`${baseId}-note`}
                name="note"
                rows={3}
                value={form.note}
                onChange={(event) => update("note", event.target.value)}
                className={`${fieldClass} resize-none`}
              />
            </label>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="submit"
                className="inline-flex min-h-11 items-center bg-ink px-5 text-[11px] font-medium uppercase tracking-[0.2em] text-ivory"
              >
                Text the shop
              </button>
              <a
                href={phoneHref}
                className="inline-flex min-h-11 items-center border border-ink/20 px-5 text-[11px] font-medium uppercase tracking-[0.2em]"
              >
                Call {phoneDisplay}
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
