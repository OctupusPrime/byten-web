import DeleteConformationModal, {
  type DeleteConformationModalProps,
} from "@components/Modals/DeleteConformationModal";

import useDeleteNote from "@hooks/query/notes/useDeleteNote";
import { notifications } from "@mantine/notifications";

import type { NoteItem } from "types/data/notes";

export interface NoteDeleteModalProps
  extends Omit<
    DeleteConformationModalProps,
    "title" | "description" | "onSubmit" | "isSubmitLoading"
  > {
  state?: NoteItem;
  onSuccess?: () => void;
}

const NoteDeleteModal = (props: NoteDeleteModalProps) => {
  const { state, onClose, onSuccess, ...others } = props;

  const { mutate, isLoading } = useDeleteNote();

  const handleSubmit = () => {
    if (!state) return onClose();

    mutate(state, {
      onSuccess: () => {
        onClose();
        onSuccess?.();
      },
      onError: () => {
        notifications.show({
          title: "Cannot delete note",
          message: "Try again later",
          color: "red",
        });
      },
    });
  };

  return (
    <DeleteConformationModal
      {...others}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitLoading={isLoading}
      title="Note Deletion Confirmation"
      description="Deleting this note will permanently remove it from your notes. "
    />
  );
};

export default NoteDeleteModal;
