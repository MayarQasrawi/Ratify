import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../auth/utils/axiosInstance";

async function handleDeleteCriteria({ id, info }) {
  console.log("inside handle delete criteria", info, "id", id);
  const { data } = await axiosInstance.put(
    `EvaluationCriteria/stage/${id}/criteria-bulk`,
    info
  );
  return data;
}

export default function useHandleDeleteCriteria() {
  return useMutation({
    mutationFn: (data) => handleDeleteCriteria(data),
    retry: false,
    onError: (error) => {
      console.log(error?.response.data, `error in handle deleta cri  `);
    },
    onSuccess: (data) => {
      console.log(data, ` success handle delete cri detail done`);
    },
  });
}
