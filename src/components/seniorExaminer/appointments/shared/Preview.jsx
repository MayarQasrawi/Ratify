import { Card, CardContent } from "@/components/ui/card"
import { format } from "date-fns"
import { AnimatePresence, motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Modal from "@/components/shared/modal/Modal"
import { FiX } from "react-icons/fi"

export default function Preview({
  title,
  slots = [],
  examinerId,
  dateRange,
  slotDuration,
  timeRange,
  totalSlots,
  setShowPreview,
  onConfirm, // إضافة prop للتأكيد
}) {
  if (!slots || slots.length === 0) return null

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm() // تنفيذ العملية
    }
    setShowPreview(false) // إغلاق الـ preview
  }

  return (
    <AnimatePresence>
      <Modal>
        <motion.div
          className="relative w-[50%]"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        >
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-2 top-8 z-10" 
            onClick={() => setShowPreview(false)}
          >
            <FiX className="h-5 w-5" />
          </Button>
          
          <Card className="mt-6 bg-[var(--sidebar-bg)]">
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-4 text-[var(--main-color)]">{title}</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  {examinerId && (
                    <p>
                      <span className="font-medium">Examiner ID:</span> {examinerId}
                    </p>
                  )}
                  {dateRange && (
                    <p>
                      <span className="font-medium">Date Range:</span> {dateRange}
                    </p>
                  )}
                  {slotDuration && (
                    <p>
                      <span className="font-medium">Slot Duration:</span> {slotDuration} minutes
                    </p>
                  )}
                  {timeRange && (
                    <p>
                      <span className="font-medium">Daily Hours:</span> {timeRange}
                    </p>
                  )}
                  <p>
                    <span className="font-medium">Total Slots:</span> {totalSlots || slots.length}
                  </p>
                </div>

                <div className="max-h-60 overflow-y-auto border rounded-md p-2">
                  <table className="min-w-full">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Start Time
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          End Time
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-[var(--sidebar-icon-bg)] divide-y divide-gray-200">
                      {slots.slice(0, 20).map((slot, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                            {format(slot.start, "PPP")}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                            {format(slot.start, "HH:mm")}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                            {format(slot.end, "HH:mm")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {slots.length > 20 && (
                    <p className="text-center text-sm text-gray-500 mt-2">
                      Showing 20 of {slots.length} slots
                    </p>
                  )}
                </div>

                {/* أزرار التحكم */}
                <div className="flex justify-end space-x-3 pt-4 border-t">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowPreview(false)}
                  >
                    Cancel
                  </Button>
                  {onConfirm && (
                    <Button 
                      onClick={handleConfirm}
                      className="bg-[var(--main-color)] hover:bg-[var(--main-color)]/90"
                    >
                      Confirm & Schedule
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </Modal>
    </AnimatePresence>
  )
}