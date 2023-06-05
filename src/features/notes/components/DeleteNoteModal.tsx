import DeleteConformationModal, {
  type DeleteConformationModalProps,
} from "@components/Modals/DeleteConformationModal";

import useDeleteNote from "@hooks/query/notes/useDeleteNote";

import type { NoteItem } from "types/data/notes";

export interface NoteDeleteModalProps
  extends Omit<
    DeleteConformationModalProps,
    "title" | "description" | "onSubmit" | "isSubmitLoading"
  > {
  state?: NoteItem;
  onSuccess?: () => void;
}

const DeleteNoteModal = (props: NoteDeleteModalProps) => {
  const { state, onClose, onSuccess, ...others } = props;

  const { mutate, isLoading } = useDeleteNote();

  const handleSubmit = () => {
    if (!state) return onClose();

    mutate(state, {
      onSuccess: () => {
        onClose();
        onSuccess?.();
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

export default DeleteNoteModal;
