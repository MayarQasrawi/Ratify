

import { parseISO, format } from "date-fns"

export default function FormattedTimeRange({ startTime, endTime, className = "" }) {
  return (
    <span className={className}>
      {format(parseISO(startTime), "h:mm a")} – {format(parseISO(endTime), "h:mm a")}
    </span>
  )
}
