import axiosInstance from "@lib/axios";
import { useQuery } from "@tanstack/react-query";
import { type QueryOptions } from "types/queryHooks";

const reqTest = async () => {
  const { data } = await axiosInstance.get("test");

  return data;
};

export default function useGetTest(options?: QueryOptions<["test"]>) {
  return useQuery({
    queryKey: ["test"],
    queryFn: reqTest,
    ...options,
  });
}
