import axiosInstance from "@lib/axios";
import { useQuery } from "@tanstack/react-query";
import { aiItem } from "types/data/ai";
import { type QueryOptions } from "types/queryHooks";

export type ModifyPromtsData = aiItem[];

export const reqModifyPromts = async () => {
  const { data } = await axiosInstance.get<ModifyPromtsData>("test");

  return data;
};

export default function useGetModifyPromts(
  options?: QueryOptions<["ai", "text-modify"], ModifyPromtsData>
) {
  return useQuery({
    queryKey: ["ai", "text-modify"],
    queryFn: reqModifyPromts,
    ...options,
  });
}
