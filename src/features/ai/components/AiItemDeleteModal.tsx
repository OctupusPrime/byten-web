import DeleteConformationModal, {
  type DeleteConformationModalProps,
} from "@components/Modals/DeleteConformationModal";
import useDeletePrompt from "@hooks/query/ai/useDeletePrompt";

import type { aiItem } from "types/data/ai";

export interface AiItemDeleteModalProps
  extends Omit<
    DeleteConformationModalProps,
    "title" | "description" | "onSubmit" | "isSubmitLoading"
  > {
  state?: aiItem;
  onSuccess?: () => void;
}

const AiItemDeleteModal = (props: AiItemDeleteModalProps) => {
  const { state, onClose, onSuccess, ...others } = props;

  const { mutate, isLoading } = useDeletePrompt();

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
      title="AI Prompt Deletion Confirmation"
      description="Deleting this AI prompt will permanently remove it from your collection. "
    />
  );
};

export default AiItemDeleteModal;
