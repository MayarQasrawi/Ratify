import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { appointmentSchema } from "@/hooks/seniorExaminer/appointment/appointmentSchema";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaRegCalendarAlt, FaRegClock } from "react-icons/fa";
import { format } from "date-fns";
import usePutSingleAppointment from "@/hooks/seniorExaminer/appointment/usePutSingleAppointment";
import AppointmentPreviewModal from "@/components/seniorExaminer/appointments/shared/SinglePreview";
import Toast from "@/components/applicant/dashboard/Stages/Exam/Toast";
import ExaminerSelect from "./shared/ExaminerSelect";

export default function SingleAppointmentForm() {
  const [previewData, setPreviewData] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [selectedExaminerName, setSelectedExaminerName] = useState("");

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      examinerId: "",
      date: null,
      startTime: "",
      endTime: "",
    },
  });

  const { mutate: putAppointment, isPending } = usePutSingleAppointment();

  const onSubmit = (data) => {
    const [sh, sm] = data.startTime.split(":").map(Number);
    const [eh, em] = data.endTime.split(":").map(Number);

    const startDate = new Date(data.date);
    startDate.setHours(sh, sm, 0);

    const endDate = new Date(data.date);
    endDate.setHours(eh, em, 0);

    const appointmentData = {
      examinerId: data.examinerId,
      startTime: startDate.toISOString(),
      endTime: endDate.toISOString(),
    };

    const id = Date.now();

    putAppointment(appointmentData, {
      onSuccess: () => {
        setToasts((prev) => [
          ...prev,
          {
            id,
            message: "Appointment scheduled successfully!",
            type: "success",
          },
        ]);
        setTimeout(() => removeToast(id), 3000);
        reset();
        setPreviewData(null);
        setSelectedExaminerName("");
      },
      onError: (err) => {
        setToasts((prev) => [
          ...prev,
          {
            id,
            message: "Something went wrong: " + err.message,
            type: "error",
          },
        ]);
        setTimeout(() => removeToast(id), 3000);
        console.log(err);
      },
    });
  };

  const handlePreview = () => {
    handleSubmit((data) => {
      setPreviewData({
        examinerId: data.examinerId,
        examinerName: selectedExaminerName, // استخدام الاسم المحفوظ
        date: data.date,
        startTime: data.startTime,
        endTime: data.endTime,
      });
    })();
  };

  // Function to disable past dates
  const isDateDisabled = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Examiner ID */}
        <ExaminerSelect 
          control={control} 
          errors={errors} 
          onExaminerChange={setSelectedExaminerName} // تمرير دالة لحفظ اسم الممتحن
        />

        {/* Date */}
        <div className="space-y-2">
          <Label>Date</Label>
          <Controller
            control={control}
            name="date"
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <FaRegCalendarAlt className="mr-2 h-4 w-4" />
                    {field.value ? format(field.value, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={isDateDisabled}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            )}
          />
          {errors.date && (
            <p className="text-red-500 text-sm">{errors.date.message}</p>
          )}
        </div>

        {/* Time inputs */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startTime">Start Time</Label>
            <div className="relative">
              <FaRegClock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="startTime"
                type="time"
                {...register("startTime")}
                className="pl-10"
              />
              {errors.startTime && (
                <p className="text-red-500 text-sm">
                  {errors.startTime.message}
                </p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="endTime">End Time</Label>
            <div className="relative">
              <FaRegClock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="endTime"
                type="time"
                {...register("endTime")}
                className="pl-10"
              />
              {errors.endTime && (
                <p className="text-red-500 text-sm">{errors.endTime.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-4 pt-4">
          <Button type="button" variant="outline" onClick={handlePreview}>
            Preview
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Scheduling..." : "Schedule Appointment"}
          </Button>
        </div>
      </form>

      {/* Preview Modal */}
      <AppointmentPreviewModal
        open={!!previewData}
        onClose={() => setPreviewData(null)}
        data={previewData}
        onConfirm={() => handleSubmit(onSubmit)()}
      />

      {/* Toasts */}
      <div className="fixed top-5 right-5 space-y-2 z-50">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            id={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={removeToast}
          />
        ))}
      </div>
    </div>
  );
}