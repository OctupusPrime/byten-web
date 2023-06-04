import {
  Modal,
  TextInput,
  type ModalProps,
  Textarea,
  Button,
} from "@mantine/core";

import { z } from "zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
  title: z.string().min(3).max(50),
  command: z.string().min(3).max(200),
});

type FormSchemaType = z.infer<typeof FormSchema>;

export interface AiAutoCompleteModalProps
  extends Omit<ModalProps, "title" | "children"> {
  state?: string;
  onSubmit?: () => void;
}

const AiAutoCompleteModal = (props: AiAutoCompleteModalProps) => {
  const { state, onClose, opened, ...others } = props;
  const isEdit = !!state;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });
  const submit: SubmitHandler<FormSchemaType> = (formVal) => {};

  return (
    <Modal
      {...others}
      opened={opened}
      onClose={onClose}
      title={isEdit ? "Edit prompt" : "Create prompt"}
    >
      <form onSubmit={handleSubmit(submit)}>
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

export default AiAutoCompleteModal;
