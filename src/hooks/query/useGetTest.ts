import axiosInstance from "@lib/axios";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

const reqTest = async () => {
  const { data } = await axiosInstance.get("test");

  return data;
};

export default function useGetTest(
  options?: Omit<
    UseQueryOptions<unknown, unknown, any, ["test"]>,
    "initialData"
  >
) {
  return useQuery({
    queryKey: ["test"],
    queryFn: reqTest,
    ...options,
  });
}
