import { useEffect, useState } from "react"
import { shopStatus, torontoWeekday } from "./hours"

export function useShopStatus() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 60_000)
    return () => window.clearInterval(id)
  }, [])

  return { ...shopStatus(now), today: torontoWeekday(now) }
}
