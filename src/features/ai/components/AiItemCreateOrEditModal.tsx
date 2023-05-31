import {
  Modal,
  TextInput,
  type ModalProps,
  Textarea,
  Button,
} from "@mantine/core";

import { type aiItem } from "types/data/ai";

import { z } from "zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

const FormSchema = z.object({
  title: z.string().min(3).max(50),
  command: z.string().min(3).max(200),
});

type FormSchemaType = z.infer<typeof FormSchema>;

export interface AiItemCreateOrEditModalProps
  extends Omit<ModalProps, "title" | "children"> {
  state?: aiItem;
  createType?: aiItem["type"];
  isEdit?: boolean;
}

const AiItemCreateOrEditModal = (props: AiItemCreateOrEditModalProps) => {
  const { state, createType, isEdit, onClose, opened, ...others } = props;

  const itemType = isEdit ? state?.type : createType ?? "promt";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    if (!opened) return;

    reset(state);
  }, [opened]);

  const submit: SubmitHandler<FormSchemaType> = (formVal) => {
    console.log("submit", formVal);
  };

  return (
    <Modal
      {...others}
      opened={opened}
      onClose={onClose}
      title={isEdit ? "Edit promt" : "Create promt"}
    >
      <form onSubmit={handleSubmit(submit)}>
        <TextInput
          label="Name"
          {...register("title")}
          error={errors?.title?.message}
          data-autofocus
        />
        <Textarea
          label="Command"
          description="This will be processed with chatgpt"
          classNames={{
            root: "!mt-1",
          }}
          {...register("command")}
          error={errors?.command?.message}
          autosize
          minRows={2}
          maxRows={10}
        />
        <TextInput
          classNames={{
            root: "!mt-1",
          }}
          label="Type"
          disabled
          value={itemType}
        />
        <div className="mt-3 flex items-center justify-between">
          <Button type="button" variant="subtle" color="red" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">{isEdit ? "Update" : "Create"}</Button>
        </div>
      </form>
    </Modal>
  );
};

export default AiItemCreateOrEditModal;
