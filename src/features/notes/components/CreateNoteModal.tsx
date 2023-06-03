import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import type { NoteItemApi } from "types/data/notes";

import { Modal, Textarea, type ModalProps, Button } from "@mantine/core";

import useCreateNote from "@hooks/query/notes/useCreateNote";
import { notifications } from "@mantine/notifications";

const FormSchema = z.object({
  title: z.string().min(1),
});

type FormSchemaType = z.infer<typeof FormSchema>;

export interface CreateNoteModalProps
  extends Omit<ModalProps, "title" | "children"> {
  onSuccess?: (data: NoteItemApi) => void;
}

const CreateNoteModal = (props: CreateNoteModalProps) => {
  const { onSuccess, onClose, ...others } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const { mutate, isLoading } = useCreateNote();

  const submit: SubmitHandler<FormSchemaType> = (formVal) => {
    mutate(formVal.title, {
      onSuccess: (data) => {
        onSuccess?.(data);
        onClose();
      },
      onError: () => {
        notifications.show({
          title: "Cannot create note",
          message: "Try again later",
          color: "red",
        });
      },
    });
  };

  return (
    <Modal {...others} onClose={onClose} title={"Create note"}>
      <form onSubmit={handleSubmit(submit)}>
        <Textarea
          label="Name"
          {...register("title")}
          error={errors?.title?.message}
          autosize
          minRows={2}
          maxRows={10}
          data-autofocus
        />
        <div className="mt-3 flex items-center justify-between">
          <Button type="button" variant="subtle" color="red" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={isLoading}>
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateNoteModal;
