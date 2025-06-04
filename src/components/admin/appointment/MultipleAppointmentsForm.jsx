

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format, eachDayOfInterval, addMinutes, setHours, setMinutes } from "date-fns"
import { FaRegCalendarAlt } from "react-icons/fa"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function MultipleAppointmentsForm() {
  const [examinerId, setExaminerId] = useState("")
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [slotDuration, setSlotDuration] = useState(50)
  const [startHour, setStartHour] = useState(9)
  const [endHour, setEndHour] = useState(17)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [generatedSlots, setGeneratedSlots] = useState([])

  const generateTimeSlots = () => {
    if (!startDate || !endDate || !slotDuration || !startHour || !endHour) return []

    const days = eachDayOfInterval({ start: startDate, end: endDate })
    const slots = []

    days.forEach((day) => {
      let currentTime = setHours(setMinutes(day, 0), startHour)
      const dayEnd = setHours(setMinutes(day, 0), endHour)

      while (currentTime < dayEnd) {
        const slotEnd = addMinutes(currentTime, slotDuration)

        if (slotEnd <= dayEnd) {
          slots.push({
            start: new Date(currentTime),
            end: slotEnd,
          })
        }

        currentTime = addMinutes(currentTime, slotDuration)
      }
    })

    return slots
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!examinerId || !startDate || !endDate || !slotDuration || !startHour || !endHour) {
      alert("Please fill all required fields")
      return
    }

    setIsSubmitting(true)

    const appointmentData = {
      examinerId,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      slotDurationMinutes: parseInt(slotDuration),
      startHour: parseInt(startHour),
      endHour: parseInt(endHour),
    }

    console.log("Submitting multiple appointments:", appointmentData)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      alert("Appointments scheduled successfully!")
      setExaminerId("")
      setStartDate(null)
      setEndDate(null)
      setSlotDuration(50)
      setStartHour(9)
      setEndHour(17)
      setShowPreview(false)
      setGeneratedSlots([])
    }, 1000)
  }

  const handlePreview = () => {
    if (!examinerId || !startDate || !endDate || !slotDuration || !startHour || !endHour) {
      alert("Please fill all required fields")
      return
    }

    const slots = generateTimeSlots()
    setGeneratedSlots(slots)
    setShowPreview(true)
  }

  const hourOptions = Array.from({ length: 24 }, (_, i) => i)

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="examinerId">Examiner ID</Label>
          <Input
            id="examinerId"
            value={examinerId}
            onChange={(e) => setExaminerId(e.target.value)}
            placeholder="Enter examiner ID"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <FaRegCalendarAlt className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP") : "Select start date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>End Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <FaRegCalendarAlt className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "PPP") : "Select end date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                  disabled={(date) => date < (startDate || new Date())}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="slotDuration">Slot Duration (minutes)</Label>
          <Input
            id="slotDuration"
            type="number"
            value={slotDuration}
            onChange={(e) => setSlotDuration(e.target.value)}
            min="5"
            max="240"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startHour">Start Hour</Label>
            <Select value={String(startHour)} onValueChange={(val) => setStartHour(parseInt(val))}>
              <SelectTrigger>
                <SelectValue placeholder="Select start hour" />
              </SelectTrigger>
              <SelectContent>
                {hourOptions.map((hour) => (
                  <SelectItem key={hour} value={String(hour)}>
                    {hour.toString().padStart(2, "0")}:00
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="endHour">End Hour</Label>
            <Select value={String(endHour)} onValueChange={(val) => setEndHour(parseInt(val))}>
              <SelectTrigger>
                <SelectValue placeholder="Select end hour" />
              </SelectTrigger>
              <SelectContent>
                {hourOptions.map((hour) => (
                  <SelectItem key={hour} value={String(hour)} disabled={hour <= startHour}>
                    {hour.toString().padStart(2, "0")}:00
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex space-x-4 pt-4">
          <Button type="button" variant="outline" onClick={handlePreview}>
            Preview
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Scheduling..." : "Schedule Appointments"}
          </Button>
        </div>
      </form>

      {showPreview && (
        <Card className="mt-6">
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Appointments Preview</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Examiner ID:</span> {examinerId}
                </p>
                <p>
                  <span className="font-medium">Date Range:</span>{" "}
                  {startDate ? format(startDate, "PPP") : ""} to{" "}
                  {endDate ? format(endDate, "PPP") : ""}
                </p>
                <p>
                  <span className="font-medium">Slot Duration:</span> {slotDuration} minutes
                </p>
                <p>
                  <span className="font-medium">Daily Hours:</span> {startHour}:00 to {endHour}:00
                </p>
                <p>
                  <span className="font-medium">Total Slots:</span> {generatedSlots.length}
                </p>
              </div>

              {generatedSlots.length > 0 && (
                <div className="max-h-60 overflow-y-auto border rounded-md p-2">
                  <table className="min-w-full">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Time</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Time</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {generatedSlots.slice(0, 20).map((slot, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{format(slot.start, "PPP")}</td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{format(slot.start, "HH:mm")}</td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{format(slot.end, "HH:mm")}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {generatedSlots.length > 20 && (
                    <p className="text-center text-sm text-gray-500 mt-2">
                      Showing 20 of {generatedSlots.length} slots
                    </p>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
