import { z } from "zod"

export const appointmentSchema = z
  .object({
    examinerId: z.string().min(1, "Examiner ID is required"),
    date: z.date({ required_error: "Date is required" }),
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
  })
  .refine((data) => {
    const [sh, sm] = data.startTime.split(":").map(Number)
    const [eh, em] = data.endTime.split(":").map(Number)

    const start = new Date(data.date)
    const end = new Date(data.date)
    start.setHours(sh, sm)
    end.setHours(eh, em)

    return end > start
  }, {
    message: "End time must be after start time",
    path: ["endTime"]
  })
