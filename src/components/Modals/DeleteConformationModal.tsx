import { Button, Modal, type ModalProps } from "@mantine/core";

export interface DeleteConformationModalProps
  extends Omit<ModalProps, "children"> {
  description?: string;
  onSubmit: () => void;
  isSubmitLoading?: boolean;
}

const DeleteConformationModal = (props: DeleteConformationModalProps) => {
  const { description, onSubmit, isSubmitLoading, onClose, ...others } = props;

  return (
    <Modal {...others} onClose={onClose}>
      {description ? <p className="mb-3 mt-1 text-sm">{description}</p> : null}
      <div className="flex items-center justify-between">
        <Button variant="subtle" onClick={onClose}>
          Cancel
        </Button>
        <Button
          color="red"
          variant="light"
          loading={isSubmitLoading}
          onClick={onSubmit}
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteConformationModal;
