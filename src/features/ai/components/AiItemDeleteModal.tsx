import DeleteConformationModal, {
  type DeleteConformationModalProps,
} from "@components/Modals/DeleteConformationModal";
import type { aiItem } from "types/data/ai";

export interface AiItemDeleteModalProps
  extends Omit<
    DeleteConformationModalProps,
    "title" | "description" | "onSubmit" | "isSubmitLoading"
  > {
  state?: aiItem;
}

const AiItemDeleteModal = (props: AiItemDeleteModalProps) => {
  const { state, onClose, ...others } = props;

  const handleSubmit = () => {
    if (!state) return onClose();

    console.log("delete-ai-state", state);

    onClose();
  };

  return (
    <DeleteConformationModal
      {...others}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitLoading={false}
      title="AI Prompt Deletion Confirmation"
      description="Deleting this AI prompt will permanently remove it from your collection. "
    />
  );
};

export default AiItemDeleteModal;
