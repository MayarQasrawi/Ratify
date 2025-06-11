import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format, eachDayOfInterval, addMinutes, parse } from "date-fns";
import { FaRegCalendarAlt } from "react-icons/fa";
import AppointmentsPreview from "@/components/seniorExaminer/appointments/shared/Preview";
import usePutAppointmentBulk from "@/hooks/seniorExaminer/appointment/usePutAppointmentBulk";
import Toast from "@/components/applicant/dashboard/Stages/Exam/Toast";
import ExaminerSelect from "./shared/ExaminerSelect";

export default function MultipleAppointmentsForm() {

  console.log("usePutSingleAppointment");

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
        { dayOfWeek: "Sunday", startTime: undefined, endTime: undefined },
        { dayOfWeek: "Monday", startTime: undefined, endTime: undefined },
        { dayOfWeek: "Tuesday", startTime: undefined, endTime: undefined },
        { dayOfWeek: "Wednesday", startTime: undefined, endTime: undefined },
        { dayOfWeek: "Thursday", startTime: undefined, endTime: undefined },
        { dayOfWeek: "Friday", startTime: undefined, endTime: undefined },
        { dayOfWeek: "Saturday", startTime: undefined, endTime: undefined },
      ],
    },
  });

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const [showPreview, setShowPreview] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [toasts, setToasts] = useState([]); // State لإدارة الـ toasts

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const generateTimeSlots = (data) => {
    const { startDate, endDate, slotDuration, weeklySchedule } = data;
    if (!startDate || !endDate || !slotDuration || !weeklySchedule) return [];

    const days = eachDayOfInterval({ start: startDate, end: endDate });
    const slots = [];

    days.forEach((day) => {
      const dayName = format(day, "EEEE");
      const schedule = weeklySchedule.find((s) => s.dayOfWeek === dayName);
      
      if (!schedule || !schedule.startTime || !schedule.endTime) {
        return;
      }

      const [startHour, startMinute] = schedule.startTime
        .split(":")
        .map(Number);
      const [endHour, endMinute] = schedule.endTime.split(":").map(Number);

      let currentTime = new Date(day);
      currentTime.setHours(startHour, startMinute, 0, 0);
      const dayEnd = new Date(day);
      dayEnd.setHours(endHour, endMinute, 0, 0);

      while (currentTime < dayEnd) {
        const slotEnd = addMinutes(currentTime, slotDuration);
        if (slotEnd <= dayEnd) {
          slots.push({ start: new Date(currentTime), end: slotEnd });
        }
        currentTime = addMinutes(currentTime, slotDuration);
      }
    });

    return slots;
  };

  const { mutate: sendBulkAppointments, isPending } = usePutAppointmentBulk();

  const onSubmit = (data) => {
    const today = new Date().setHours(0, 0, 0, 0);
    const selectedStart = new Date(data.startDate).setHours(0, 0, 0, 0);

    if (selectedStart < today) {
      const id = Date.now();
      setToasts((prev) => [
        ...prev,
        { id, message: "Start date cannot be in the past", type: "error" },
      ]);
      setTimeout(() => removeToast(id), 3000);
      return;
    }

    const activeSchedule = data.weeklySchedule.filter(
      (schedule) => schedule.startTime && schedule.endTime
    );

    if (activeSchedule.length === 0) {
      const id = Date.now();
      setToasts((prev) => [
        ...prev,
        { id, message: "Please configure at least one day of the week", type: "error" },
      ]);
      setTimeout(() => removeToast(id), 3000);
      return;
    }

    const appointmentData = {
      examinerId: data.examinerId,
      startDate: data.startDate.toISOString(),
      endDate: data.endDate.toISOString(),
      slotDurationMinutes: parseInt(data.slotDuration),
      weeklySchedule: activeSchedule.map((schedule) => ({
        dayOfWeek: schedule.dayOfWeek,
        startTime: schedule.startTime.length === 5
          ? `${schedule.startTime}:00`
          : schedule.startTime,
        endTime: schedule.endTime.length === 5
          ? `${schedule.endTime}:00`
          : schedule.endTime,
      })),
    };

    console.log("submit bulk:", appointmentData);
    sendBulkAppointments(appointmentData, {
      onSuccess: () => {
        const id = Date.now();
        setToasts((prev) => [
          ...prev,
          { id, message: "Appointments scheduled successfully!", type: "success" },
        ]);
        setTimeout(() => removeToast(id), 3000);
        reset();
        setShowPreview(false);
        setPreviewData(null);
      },
      onError: (error) => {
        const id = Date.now();
        setToasts((prev) => [
          ...prev,
          { id, message: `Failed to schedule appointments: ${error?.message || "Unknown error"}`, type: "error" },
        ]);
        setTimeout(() => removeToast(id), 3000);
      },
    });
  };

  const handleConfirmFromPreview = () => {
    if (previewData) {
      onSubmit(previewData.formData);
    }
  };

  const handlePreview = () => {
    const data = watch();
    
    const activeSchedule = data.weeklySchedule.filter(
      (schedule) => schedule.startTime && schedule.endTime
    );

    if (activeSchedule.length === 0) {
      const id = Date.now();
      setToasts((prev) => [
        ...prev,
        { id, message: "Please configure at least one day of the week before previewing", type: "error" },
      ]);
      setTimeout(() => removeToast(id), 3000);
      return;
    }

    const slots = generateTimeSlots(data);

    setPreviewData({
      formData: data,
      slots: slots,
      totalSlots: slots.length,
    });
    setShowPreview(true);
  };

  const timeOptions = Array.from({ length: 24 * 2 }, (_, i) => {
    const hour = Math.floor(i / 2);
    const minute = i % 2 === 0 ? "00" : "30";
    return `${hour.toString().padStart(2, "0")}:${minute}`;
  });

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
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <FaRegCalendarAlt className="mr-2 h-4 w-4" />
                      {field.value
                        ? format(field.value, "PPP")
                        : "Select start date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      selected={field.value}
                      onSelect={field.onChange}
                      mode="single"
                      initialFocus
                      disabled={(date) =>
                        date < new Date().setHours(0, 0, 0, 0)
                      }
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
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <FaRegCalendarAlt className="mr-2 h-4 w-4" />
                      {field.value
                        ? format(field.value, "PPP")
                        : "Select end date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      selected={field.value}
                      onSelect={field.onChange}
                      mode="single"
                      initialFocus
                      disabled={(date) =>
                        date < (watch("startDate") || new Date())
                      }
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
            <p className="text-red-500 text-sm">
              {errors.slotDuration.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Weekly Schedule</Label>
          <p className="text-xs text-gray-500 mt-3 mb-3">
            Leave start and end times empty for days you don't want to schedule appointments
          </p>
          <div className="space-y-2">
            {daysOfWeek.map((day, index) => (
              <div
                key={day}
                className={`flex flex-col sm:flex-row items-center gap-2 p-3 rounded-lg transition-colors ${
                  watch(`weeklySchedule[${index}].startTime`) && watch(`weeklySchedule[${index}].endTime`)
                    ? 'bg-blue-50 border border-blue-200'
                    : 'bg-[var(--sidebar-bg)]'
                }`}
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
                      render={({ field }) => (
                        <Select
                          value={field.value || ""}
                          onValueChange={(value) => field.onChange(value === "clear" ? undefined : value)}
                        >
                          <SelectTrigger className="h-9 text-sm">
                            <SelectValue placeholder="Start" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="clear" className="text-sm text-gray-500">
                              Clear selection
                            </SelectItem>
                            {timeOptions.map((time) => (
                              <SelectItem
                                key={time}
                                value={time}
                                className="text-sm"
                              >
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    to
                  </div>
                  <div className="flex-1">
                    <Controller
                      control={control}
                      name={`weeklySchedule[${index}].endTime`}
                      rules={{
                        validate: (value) => {
                          const startTime = watch(`weeklySchedule[${index}].startTime`);
                          
                          if (!startTime) {
                            return true;
                          }
                          
                          if (!value) {
                            return `End time is required when start time is set for ${day}`;
                          }
                          
                          return value > startTime || `End time for ${day} must be after start time`;
                        }
                      }}
                      render={({ field }) => (
                        <Select
                          value={field.value || ""}
                          onValueChange={(value) => field.onChange(value === "clear" ? undefined : value)}
                        >
                          <SelectTrigger className="h-9 text-sm">
                            <SelectValue placeholder="End" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="clear" className="text-sm text-gray-500">
                              Clear selection
                            </SelectItem>
                            {timeOptions.map((time) => (
                              <SelectItem
                                key={time}
                                value={time}
                                disabled={
                                  watch(`weeklySchedule[${index}].startTime`) && 
                                  time <= watch(`weeklySchedule[${index}].startTime`)
                                }
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
              ? `${format(previewData.formData.startDate, "PPP")} to ${format(
                  previewData.formData.endDate,
                  "PPP"
                )}`
              : ""
          }
          slotDuration={previewData.formData.slotDuration}
          timeRange="Varies by day"
          totalSlots={previewData.totalSlots}
          setShowPreview={setShowPreview}
          onConfirm={handleConfirmFromPreview}
        />
      )}

      {/* عرض الـ Toasts */}
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