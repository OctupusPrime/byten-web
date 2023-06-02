import { Skeleton } from "@mantine/core";

const NoteItemLoader = () => {
  return (
    <>
      <div className="mb-2 py-[5px]">
        <Skeleton height={16} width={"83%"} />
        <Skeleton height={16} width={"40%"} mt={13} />
      </div>
      <div className="mb-5 flex justify-between">
        <div className="text-sm">
          <p className="text-gray-600 dark:text-gray-400">Created at</p>
          <Skeleton height={14} width={85} my={3} />
        </div>
        <div className="text-right text-sm">
          <p className="text-gray-600 dark:text-gray-400">Updated at</p>
          <Skeleton height={14} width={85} my={3} />
        </div>
      </div>
      <div className="">
        <Skeleton height={14} width={"60%"} />
        <Skeleton height={14} width={"78%"} mt={10} />
        <Skeleton height={14} width={"90%"} mt={10} />
        <Skeleton height={14} width={"49%"} mt={10} />
        <Skeleton height={14} width={"91%"} mt={24} />
        <Skeleton height={14} width={"20%"} mt={10} />
        <Skeleton height={14} width={"34%"} mt={24} />
        <Skeleton height={14} width={"43%"} mt={10} />
      </div>
    </>
  );
};

export default NoteItemLoader;
