// utils/timezoneUtils.js

/**
 * حل مشكلة فرق التوقيت - يمكن استخدام هذه الدوال في الكود الموجود
 */

// 1. تحويل التاريخ المحلي إلى UTC للإرسال للـ API
export const convertLocalToUTC = (localDateTime) => {
  if (!localDateTime) return null;
  
  const localDate = new Date(localDateTime);
  const utcDate = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000);
  return utcDate.toISOString();
};

// 2. تحويل التاريخ من UTC إلى التوقيت المحلي للعرض
export const convertUTCToLocal = (utcDateTime) => {
  if (!utcDateTime) return null;
  
  const utcDate = new Date(utcDateTime);
  return new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60000);
};

// 3. إنشاء تاريخ محلي مع وقت محدد
export const createLocalDateTime = (date, time) => {
  if (!date || !time) return null;
  
  const [hours, minutes] = time.split(':');
  const localDate = new Date(date);
  localDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
  
  return localDate;
};

// 4. تنسيق التاريخ والوقت للعرض (فلسطين)
export const formatLocalDateTime = (dateTime, options = {}) => {
  if (!dateTime) return '';
  
  const date = new Date(dateTime);
  const defaultOptions = {
    timeZone: 'Asia/Gaza', // توقيت فلسطين
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  };
  
  return date.toLocaleString('ar-PS', { ...defaultOptions, ...options });
};

// 5. تنسيق الوقت فقط
export const formatTimeOnly = (dateTime) => {
  if (!dateTime) return '';
  
  const date = new Date(dateTime);
  return date.toLocaleTimeString('ar-PS', {
    timeZone: 'Asia/Gaza',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
};

// 6. تنسيق التاريخ فقط
export const formatDateOnly = (dateTime) => {
  if (!dateTime) return '';
  
  const date = new Date(dateTime);
  return date.toLocaleDateString('ar-PS', {
    timeZone: 'Asia/Gaza',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

// 7. التحقق من أن التاريخ في المستقبل (بالتوقيت المحلي)
export const isFutureDateTime = (dateTime) => {
  if (!dateTime) return false;
  
  const date = new Date(dateTime);
  const now = new Date();
  
  return date > now;
};

// 8. الحصول على تاريخ اليوم بالتوقيت المحلي
export const getTodayLocal = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};

// 9. مقارنة التواريخ (نفس اليوم)
export const isSameDay = (date1, date2) => {
  if (!date1 || !date2) return false;
  
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  
  return d1.getDate() === d2.getDate() &&
         d1.getMonth() === d2.getMonth() &&
         d1.getFullYear() === d2.getFullYear();
};

export const processAvailableDates = (apiData) => {
  if (!apiData || !Array.isArray(apiData)) return [];
  
  const now = new Date();
  const today = getTodayLocal();
  
  return apiData
    .map((dateItem) => {
      const serverDate = new Date(dateItem.date);
      return {
        ...dateItem,
        localDate: serverDate,
        displayDate: formatDateOnly(serverDate)
      };
    })
    .filter((item) => {
      // تصفية التواريخ السابقة
      return item.localDate >= today;
    });
};

export const processTimeSlots = (apiData, selectedDate) => {
  if (!apiData || !Array.isArray(apiData) || !selectedDate) return [];
  
  const selectedDateStr = formatDateOnly(selectedDate);
  const dateItem = apiData.find((item) => {
    const itemDateStr = formatDateOnly(item.date);
    return itemDateStr === selectedDateStr;
  });
  
  if (!dateItem || !dateItem.slots) return [];
  
  const now = new Date();
  
  return dateItem.slots
    .filter((slot) => {
      if (slot.isBooked) return false;
      
      const slotDateTime = new Date(slot.startTime);
      return slotDateTime > now;
    })
    .map((slot) => {
      const startTime = new Date(slot.startTime);
      const endTime = new Date(slot.endTime);
      
      return {
        ...slot,
        displayTime: formatTimeOnly(startTime),
        displayStartTime: formatLocalDateTime(startTime),
        displayEndTime: formatLocalDateTime(endTime),
        localStartTime: startTime,
        localEndTime: endTime
      };
    });
};

export const prepareBookingData = (appointmentData) => {
  return {
    ...appointmentData,
    startTime: appointmentData.startTime ? convertLocalToUTC(appointmentData.startTime) : null,
    endTime: appointmentData.endTime ? convertLocalToUTC(appointmentData.endTime) : null,
    scheduledDate: appointmentData.scheduledDate ? convertLocalToUTC(appointmentData.scheduledDate) : null
  };
};

export const processApiResponse = (apiData) => {
  if (!apiData) return null;
  
  if (Array.isArray(apiData)) {
    return apiData.map(item => ({
      ...item,
      // إضافة النسخ المحلية للتواريخ
      localStartTime: item.startTime ? convertUTCToLocal(item.startTime) : null,
      localEndTime: item.endTime ? convertUTCToLocal(item.endTime) : null,
      displayStartTime: item.startTime ? formatLocalDateTime(item.startTime) : '',
      displayEndTime: item.endTime ? formatLocalDateTime(item.endTime) : '',
      displayTime: item.startTime ? formatTimeOnly(item.startTime) : '',
      displayDate: item.startTime ? formatDateOnly(item.startTime) : ''
    }));
  }
  
  return {
    ...apiData,
    localStartTime: apiData.startTime ? convertUTCToLocal(apiData.startTime) : null,
    localEndTime: apiData.endTime ? convertUTCToLocal(apiData.endTime) : null,
    displayStartTime: apiData.startTime ? formatLocalDateTime(apiData.startTime) : '',
    displayEndTime: apiData.endTime ? formatLocalDateTime(apiData.endTime) : '',
    displayTime: apiData.startTime ? formatTimeOnly(apiData.startTime) : '',
    displayDate: apiData.startTime ? formatDateOnly(apiData.startTime) : ''
  };
};

