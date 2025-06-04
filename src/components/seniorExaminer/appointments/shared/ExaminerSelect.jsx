// components/shared/ExaminerSelect.jsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Controller } from "react-hook-form";
import { useAuthContext } from "@/contexts/AuthProvider";
import Extract from "@/utils/Extract";
import useExaminerDetails from "@/hooks/seniorExaminer/appointment/useExaminerDetails";
import useExaminersSummary from "@/hooks/seniorExaminer/appointment/useExaminersSummary";
import { useEffect ,useState} from "react";


export default function ExaminerSelect({
  control,
  name = "examinerId",
  errors,
}) {
  const { auth } = useAuthContext();
  const id = Extract(auth, "nameid");
  
  const { data: info, isLoading: isLoadingDetails, isError: isErrorDetails } = useExaminerDetails(id);
  console.log("info",info)
  const trackId = info?.[0]?.id;
  
  // Only call the hook when trackId exists, but call it at the top level
  const { data: examiners, isLoading: isLoadingSummary, isError: isErrorSummary } = useExaminersSummary(trackId);

  console.log("id", id);
  console.log("senior info:", info);
  console.log("trackId", trackId);
  console.log("all examiner in the track", examiners);

  // Show loading state
  if (isLoadingDetails || (trackId && isLoadingSummary)) {
    return (
      <div className="space-y-2 relative">
        <Label htmlFor={name}>Examiner</Label>
        <div className="w-full min-h-[40px] px-3 py-2 border border-gray-300 rounded-md bg-gray-50 flex items-center">
          <span className="text-gray-500">Loading examiners...</span>
        </div>
      </div>
    );
  }

  // Show error state
  if (isErrorDetails || isErrorSummary) {
    return (
      <div className="space-y-2 relative">
        <Label htmlFor={name}>Examiner</Label>
        <div className="w-full min-h-[40px] px-3 py-2 border border-red-300 rounded-md bg-red-50 flex items-center">
          <span className="text-red-500">Error loading examiners</span>
        </div>
      </div>
    );
  }
  
    

  // const examiners = [
  //   { id: "1", fullName: "Dr. Ahmad Nasser" },
  //   { id: "2", fullName: "Dr. Lina Khaled" },
  //   { id: "3", fullName: "Prof. Youssef Salim" },
  // ];

  return (
   <div className="space-y-2 relative">
  <Label htmlFor={name}>Examiner</Label>
  <Controller
    control={control}
    name={name}
    render={({ field }) => (
      <Select onValueChange={field.onChange} value={field.value}>
        <SelectTrigger className="w-full min-h-[40px]">
          <SelectValue placeholder="Select examiner" />
        </SelectTrigger>
      {examiners &&

       (
        <SelectContent 
          className="w-full max-h-[300px]" 
          position="popper"
          side="bottom"
          align="start"
          sideOffset={4}
        >
          {examiners?.map((examiner) => (
            <SelectItem key={examiner.id} value={examiner.id}>
              {examiner.fullName}
            </SelectItem>
          ))}
        </SelectContent>
       ) 
      }
        
      </Select>
    )}
  />
  {errors?.[name] && (
    <p className="text-red-500 text-sm">{errors[name].message}</p>
  )}
</div>
  );
}


//   <div className="space-y-2">
//   <Label htmlFor={name}>Examiner</Label>
//   <Controller
//     control={control}
//     name={name}
//     render={({ field }) => (
//       <select 
//         {...field}
//         className="w-full min-h-[40px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//       >
//         <option value="">Select examiner</option>
//         {examiners.map((examiner) => (
//           <option key={examiner.id} value={examiner.id}>
//             {examiner.fullName}
//           </option>
//         ))}
//       </select>
//     )}
//   />
//   {errors?.[name] && (
//     <p className="text-red-500 text-sm">{errors[name].message}</p>
//   )}
// </div>
