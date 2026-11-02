const TZ = "America/Toronto"

export type Weekday = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun"

export type DayHours =
  | { day: string; short: Weekday; open: null; close: null }
  | { day: string; short: Weekday; open: number; close: number }

export const week: DayHours[] = [
  { day: "Monday", short: "Mon", open: null, close: null },
  { day: "Tuesday", short: "Tue", open: 9, close: 21 },
  { day: "Wednesday", short: "Wed", open: 9, close: 21 },
  { day: "Thursday", short: "Thu", open: 9, close: 21 },
  { day: "Friday", short: "Fri", open: 9, close: 21 },
  { day: "Saturday", short: "Sat", open: 9, close: 21 },
  { day: "Sunday", short: "Sun", open: 10, close: 21 },
]

const order: Weekday[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export function formatHour(hour: number) {
  const suffix = hour >= 12 ? "p.m." : "a.m."
  const h = hour % 12 === 0 ? 12 : hour % 12
  return `${h} ${suffix}`
}

export function formatRange(day: DayHours) {
  if (day.open === null) return "Closed"
  return `${formatHour(day.open)} – ${formatHour(day.close)}`
}

function parts(now: Date) {
  const list = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now)

  const weekday = (list.find((part) => part.type === "weekday")?.value ?? "Mon") as Weekday
  const hour = Number(list.find((part) => part.type === "hour")?.value ?? "0")
  const minute = Number(list.find((part) => part.type === "minute")?.value ?? "0")
  return { weekday, minutes: hour * 60 + minute }
}

export function torontoWeekday(now = new Date()) {
  return parts(now).weekday
}

export function shopStatus(now = new Date()) {
  const { weekday, minutes } = parts(now)
  const today = week.find((day) => day.short === weekday) ?? week[0]
  const todayIndex = order.indexOf(today.short)

  if (today.open !== null && minutes >= today.open * 60 && minutes < today.close * 60) {
    const remaining = today.close * 60 - minutes
    if (remaining <= 60) {
      return { open: true, label: `Open · closes soon, ${formatHour(today.close)}` }
    }
    return { open: true, label: `Open today · until ${formatHour(today.close)}` }
  }

  for (let step = 0; step < 7; step += 1) {
    const short = order[(todayIndex + step) % 7]
    const day = week.find((item) => item.short === short)
    if (!day || day.open === null) continue
    if (step === 0 && minutes >= day.open * 60) continue
    const when = step === 0 ? "today" : step === 1 ? "tomorrow" : day.day
    return { open: false, label: `Closed · opens ${when} ${formatHour(day.open)}` }
  }

  return { open: false, label: "Closed" }
}
