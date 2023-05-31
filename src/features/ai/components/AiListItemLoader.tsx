import { Skeleton } from "@mantine/core";

const AiListItemLoader = () => {
  return (
    <div className="w-full rounded-md bg-gray-50 px-3 py-2 dark:bg-neutral-800">
      <Skeleton height={22} width={"65%"} />
      <Skeleton height={16} mt={12} />
      <Skeleton height={16} mt={6} width={"30%"} />
    </div>
  );
};

export default AiListItemLoader;
