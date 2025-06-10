import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format, eachDayOfInterval, addMinutes, parse } from "date-fns"
import { FaRegCalendarAlt } from "react-icons/fa"
import AppointmentsPreview from "@/components/seniorExaminer/appointments/shared/Preview"
import usePutAppointmentBulk from "@/hooks/seniorExaminer/appointment/usePutAppointmentBulk"
import Toast from "@/components/applicant/dashboard/Stages/Exam/Toast"
import ExaminerSelect from "./shared/ExaminerSelect"

export default function MultipleAppointmentsForm() {
  console.log("usePutSingleAppointment")
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      examinerId: "",
      startDate: null,
      endDate: null,
      slotDuration: 50,
      weeklySchedule: [
        { dayOfWeek: "Sunday", startTime: "09:00", endTime: "17:00" },
        { dayOfWeek: "Monday", startTime: "09:00", endTime: "17:00" },
        { dayOfWeek: "Tuesday", startTime: "09:00", endTime: "17:00" },
        { dayOfWeek: "Wednesday", startTime: "09:00", endTime: "17:00" },
        { dayOfWeek: "Thursday", startTime: "09:00", endTime: "17:00" },
        { dayOfWeek: "Friday", startTime: "09:00", endTime: "17:00" }, 
        { dayOfWeek: "Saturday", startTime: "09:00", endTime: "17:00" },
      ]
    },
  })

  const daysOfWeek = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
  ]

  const [showPreview, setShowPreview] = useState(false)
  const [previewData, setPreviewData] = useState(null) // حفظ بيانات الـ preview

  const generateTimeSlots = (data) => {
    const { startDate, endDate, slotDuration, weeklySchedule } = data
    if (!startDate || !endDate || !slotDuration || !weeklySchedule) return []

    const days = eachDayOfInterval({ start: startDate, end: endDate })
    const slots = []

    days.forEach((day) => {
      const dayName = format(day, "EEEE")
      const schedule = weeklySchedule.find((s) => s.dayOfWeek === dayName)
      if (!schedule || !schedule.startTime || !schedule.endTime) return

      const [startHour, startMinute] = schedule.startTime.split(":").map(Number)
      const [endHour, endMinute] = schedule.endTime.split(":").map(Number)

      let currentTime = new Date(day)
      currentTime.setHours(startHour, startMinute, 0, 0)
      const dayEnd = new Date(day)
      dayEnd.setHours(endHour, endMinute, 0, 0)

      while (currentTime < dayEnd) {
        const slotEnd = addMinutes(currentTime, slotDuration)
        if (slotEnd <= dayEnd) {
          slots.push({ start: new Date(currentTime), end: slotEnd })
        }
        currentTime = addMinutes(currentTime, slotDuration)
      }
    })

    return slots
  }

  const { mutate: sendBulkAppointments, isPending } = usePutAppointmentBulk()

  const onSubmit = (data) => {
    const appointmentData = {
      examinerId: data.examinerId,
      startDate: data.startDate.toISOString(),
      endDate: data.endDate.toISOString(),
      slotDurationMinutes: parseInt(data.slotDuration),
      weeklySchedule: data.weeklySchedule.map((schedule) => ({
        dayOfWeek: schedule.dayOfWeek,
        startTime: schedule.startTime,
        endTime: schedule.endTime,
      })),
    }

    sendBulkAppointments(appointmentData, {
      onSuccess: () => {
        Toast("Appointments scheduled successfully!")
        reset()
        setShowPreview(false)
        setPreviewData(null)
      },
      onError: (error) => {
        Toast(`Failed to schedule appointments: ${error.message}`)
      },
    })
  }

  // دالة للتأكيد من الـ preview
  const handleConfirmFromPreview = () => {
    if (previewData) {
      onSubmit(previewData.formData)
    }
  }

  const handlePreview = () => {
    const data = watch()
    const slots = generateTimeSlots(data)
    
    // حفظ البيانات في الـ state
    setPreviewData({
      formData: data,
      slots: slots,
      totalSlots: slots.length
    })
    setShowPreview(true)
  }

  const timeOptions = Array.from({ length: 24 * 2 }, (_, i) => {
    const hour = Math.floor(i / 2)
    const minute = i % 2 === 0 ? "00" : "30"
    return `${hour.toString().padStart(2, "0")}:${minute}`
  })

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <ExaminerSelect control={control} errors={errors} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Start Date</Label>
            <Controller
              control={control}
              name="startDate"
              rules={{ required: "Start date is required" }}
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <FaRegCalendarAlt className="mr-2 h-4 w-4" />
                      {field.value ? format(field.value, "PPP") : "Select start date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      selected={field.value}
                      onSelect={field.onChange}
                      mode="single"
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
            {errors.startDate && (
              <p className="text-red-500 text-sm">{errors.startDate.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>End Date</Label>
            <Controller
              control={control}
              name="endDate"
              rules={{ required: "End date is required" }}
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <FaRegCalendarAlt className="mr-2 h-4 w-4" />
                      {field.value ? format(field.value, "PPP") : "Select end date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      selected={field.value}
                      onSelect={field.onChange}
                      mode="single"
                      initialFocus
                      disabled={(date) => date < (watch("startDate") || new Date())}
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
            {errors.endDate && (
              <p className="text-red-500 text-sm">{errors.endDate.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="slotDuration">Slot Duration (minutes)</Label>
          <Input
            type="number"
            id="slotDuration"
            {...register("slotDuration", {
              required: "Slot duration is required",
              min: { value: 5, message: "Minimum duration is 5 minutes" },
              max: { value: 240, message: "Maximum duration is 240 minutes" },
            })}
            className="w-full"
          />
          {errors.slotDuration && (
            <p className="text-red-500 text-sm">{errors.slotDuration.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Weekly Schedule</Label>
          <div className="space-y-2">
            {daysOfWeek.map((day, index) => (
              <div
                key={day}
                className="flex flex-col sm:flex-row items-center gap-2 bg-[var(--sidebar-bg)] p-3 rounded-lg"
              >
                <div className="w-24 sm:w-28">
                  <Label className="text-sm font-medium">{day}</Label>
                  <Input
                    type="hidden"
                    {...register(`weeklySchedule[${index}].dayOfWeek`)}
                    value={day}
                  />
                </div>
                <div className="flex flex-1 gap-2 w-full sm:w-auto">
                  <div className="flex-1">
                    <Controller
                      control={control}
                      name={`weeklySchedule[${index}].startTime`}
                      rules={{ required: `Start time for ${day} is required` }}
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="h-9 text-sm">
                            <SelectValue placeholder="Start" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeOptions.map((time) => (
                              <SelectItem key={time} value={time} className="text-sm">
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.weeklySchedule?.[index]?.startTime && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.weeklySchedule[index].startTime.message}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">to</div>
                  <div className="flex-1">
                    <Controller
                      control={control}
                      name={`weeklySchedule[${index}].endTime`}
                      rules={{
                        required: `End time for ${day} is required`,
                        validate: (value) =>
                          value > watch(`weeklySchedule[${index}].startTime`) ||
                          `End time for ${day} must be after start time`,
                      }}
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="h-9 text-sm">
                            <SelectValue placeholder="End" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeOptions.map((time) => (
                              <SelectItem
                                key={time}
                                value={time}
                                disabled={time <= watch(`weeklySchedule[${index}].startTime`)}
                                className="text-sm"
                              >
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.weeklySchedule?.[index]?.endTime && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.weeklySchedule[index].endTime.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex space-x-4 pt-4">
          <Button type="button" variant="outline" onClick={handlePreview}>
            Preview
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Scheduling..." : "Schedule Appointments"}
          </Button>
        </div>
      </form>

      {showPreview && previewData && (
        <AppointmentsPreview
          title="Appointments Preview"
          slots={previewData.slots}
          examinerId={previewData.formData.examinerId}
          dateRange={
            previewData.formData.startDate && previewData.formData.endDate
              ? `${format(previewData.formData.startDate, "PPP")} to ${format(previewData.formData.endDate, "PPP")}`
              : ""
          }
          slotDuration={previewData.formData.slotDuration}
          timeRange="Varies by day"
          totalSlots={previewData.totalSlots}
          setShowPreview={setShowPreview}
          onConfirm={handleConfirmFromPreview} // إضافة دالة التأكيد
        />
      )}
    </div>
  )
}