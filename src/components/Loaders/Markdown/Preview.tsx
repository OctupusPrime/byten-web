import { Skeleton } from "@mantine/core";

const Preview = () => {
  return (
    <div>
      <Skeleton height={14} width={"74%"} />
      <Skeleton height={14} width={"78%"} mt={10} />
      <Skeleton height={14} width={"78%"} mt={10} />
      <Skeleton height={14} width={"49%"} mt={10} />
      <Skeleton height={14} width={"91%"} mt={24} />
      <Skeleton height={14} width={"20%"} mt={10} />
      <Skeleton height={14} width={"34%"} mt={24} />
      <Skeleton height={14} width={"46%"} mt={10} />
    </div>
  );
};

export default Preview;
