
import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { FaRegCalendarAlt, FaRegClock } from "react-icons/fa"
import { FiX } from "react-icons/fi"
import Modal from "@/components/shared/modal/Modal"
import { AnimatePresence} from "framer-motion"

export default function SingleAppointmentForm() {
  const [examinerId, setExaminerId] = useState("")
  const [date, setDate] = useState(null)
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!examinerId || !date || !startTime || !endTime) {
      alert("Please fill all required fields")
      return
    }

    setIsSubmitting(true)

    const startDate = new Date(date)
    const [startHours, startMinutes] = startTime.split(":").map(Number)
    startDate.setHours(startHours, startMinutes, 0)

    const endDate = new Date(date)
    const [endHours, endMinutes] = endTime.split(":").map(Number)
    endDate.setHours(endHours, endMinutes, 0)

    const appointmentData = {
      examinerId,
      startTime: startDate.toISOString(),
      endTime: endDate.toISOString(),
    }

    console.log("Submitting single appointment:", appointmentData)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      alert("Appointment scheduled successfully!")
      setExaminerId("")
      setDate(null)
      setStartTime("")
      setEndTime("")
      setShowPreview(false)
    }, 1000)
  }

  const handlePreview = () => {
    if (!examinerId || !date || !startTime || !endTime) {
      alert("Please fill all required fields")
      return
    }
    setShowPreview(true)
  }

  const closePreview = () => {
    setShowPreview(false)
  }

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

        <div className="space-y-2">
          <Label>Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <FaRegCalendarAlt className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startTime">Start Time</Label>
            <div className="relative">
              <FaRegClock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="startTime"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="endTime">End Time</Label>
            <div className="relative">
              <FaRegClock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="endTime"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex space-x-4 pt-4">
          <Button type="button" variant="outline" onClick={handlePreview}>
            Preview
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Scheduling..." : "Schedule Appointment"}
          </Button>
        </div>
      </form>

   <AnimatePresence>
        {showPreview && (
          <Modal>
            <motion.div 
              className="relative w-96"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
            >
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-2 top-8" 
                onClick={closePreview}
                aria-label="Close"
              >
                <FiX className="h-5 w-5" />
              </Button>
              <Card className="mt-6">
                <CardContent className="pt-6">
                  <motion.h3 
                    className="text-lg font-medium mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    Appointment Preview
                  </motion.h3>
                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <p><span className="font-medium">Examiner ID:</span> {examinerId}</p>
                    <p><span className="font-medium">Date:</span> {date ? format(date, "PPP") : ""}</p>
                    <p><span className="font-medium">Time:</span> {startTime} - {endTime}</p>
                  </motion.div>
                  <motion.div 
                    className="mt-6 flex justify-end"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Button variant="outline" onClick={closePreview}>
                      Close
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  
  )
}