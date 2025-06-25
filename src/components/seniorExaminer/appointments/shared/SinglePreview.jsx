// components/shared/appointments-preview-modal.jsx
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { FiX, FiCalendar, FiClock, FiUser, FiCheck } from "react-icons/fi"
import Modal from "@/components/shared/modal/Modal"
import { format } from "date-fns"

export default function SinglePreview({ open, onClose, data ,onConfirm}) {
  if (!data) return null
  console.log("preview", data)
  
  const { examinerName, date, startTime, endTime } = data
console.log("examinerName", examinerName)
  return (
    <AnimatePresence>
      {open && (
        <Modal>
          <motion.div
            className="relative w-full max-w-md mx-4"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            {/* Close Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute -right-0 -top-[-8] z-10 text-white  hover:bg-gray-600/20 hover:text-white rounded-full h-8 w-8" 
              onClick={onClose}
            >
              <FiX className="h-4 w-4" />
            </Button>

            {/* Main Card */}
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-0 shadow-xl overflow-hidden pt-0">
              {/* Header */}
              <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-6">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FiCalendar className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">Appointment Preview</h3>
                  <p className="text-blue-100 text-sm mt-1">Review your appointment details</p>
                </motion.div>
              </CardHeader>

              {/* Content */}
              <CardContent className="p-6 space-y-4">
                {/* Examiner */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center p-4 bg-white rounded-lg shadow-sm border border-gray-100"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <FiUser className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Examiner</p>
                    <p className="text-gray-900 font-semibold">{examinerName || 'Not specified'}</p>
                  </div>
                </motion.div>

                {/* Date */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center p-4 bg-white rounded-lg shadow-sm border border-gray-100"
                >
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <FiCalendar className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Date</p>
                    <p className="text-gray-900 font-semibold">
                      {date ? format(date, "EEEE, MMMM do, yyyy") : 'Not selected'}
                    </p>
                  </div>
                </motion.div>

                {/* Time */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center p-4 bg-white rounded-lg shadow-sm border border-gray-100"
                >
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                    <FiClock className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Time</p>
                    <p className="text-gray-900 font-semibold">
                      {startTime && endTime ? `${startTime} - ${endTime}` : 'Not selected'}
                    </p>
                  </div>
                </motion.div>

                {/* Success Message */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200"
                >
                  <FiCheck className="h-5 w-5 text-green-600 mr-3" />
                  <p className="text-green-700 text-sm font-medium">
                    Ready to schedule your appointment
                  </p>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex gap-3 pt-4"
                >
                  <Button 
                    variant="outline" 
                    onClick={onClose}
                    className="flex-1 border-gray-300 hover:bg-gray-50"
                  >
                    Close
                  </Button>
                  <Button 
                  onClick={onConfirm}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg"
                  >
                    Confirm
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  )
}