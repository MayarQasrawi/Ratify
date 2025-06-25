import Modal from "../../shared/modal/Modal";
import FormContainer from "../../FormContainer";
import { GrStatusWarning } from "react-icons/gr";
import ModalButton from "../../Button/ModalButton"; // Import the reusable button
import useDeleteAccount from "../../../hooks/auth/useDeleteAccount"; // Import the delete account hook
import { useParams } from "react-router";
import { useState } from "react";
import ConfirmationModal from "../../shared/modal/ConfirmationModal"; // Import the confirmation modal
import Alert from "../../shared/Alert"; // Import the Alert component
function DeleteModal({ setShowDeleteModal, showDeleteModal }) {
  const {
    mutate: deleteAccount,
    isPending,
    isSuccess,
    isError,
    error,
    data,
  } = useDeleteAccount();

  const { id } = useParams();
  console.log("DeleteModal id:", id);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDeleteConfirmation = () => {
    
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    deleteAccount(id);
    setShowConfirmation(false);
    setShowDeleteModal(false);
    window.location.href = "/dashboard/admin/teams"; // Redirect after deletion
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
    // Optionally keep delete modal open or close it:
    setShowDeleteModal(false);
  };

  return (
    <>
      {isError && (
        <Alert
          type="error"
          message={error?.message || "Delete Request Fails"}
        />
      )}
      {isSuccess && (
        <Alert message={data?.message|| data?.meta || "Delete successfully"} />
      )}
      {showDeleteModal && (
        <Modal>
          <FormContainer fullWidth={false} onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-5">
              <span className="rounded-full text-red-500 flex bg-red-100 mx-auto w-20 h-20 md:mr-4 mb-4 items-center justify-center col-span-1">
                <GrStatusWarning size={30} className="inline" />
              </span>

              <div className="col-span-4">
                <h2 className="text-lg font-semibold mb-4">
                  Delete Examiner Account
                </h2>
                <p className="mb-4 text-gray-500">
                  This action will remove this examiner's account and all
                  associated data
                </p>

                <div className="flex justify-end space-x-4">
                  <ModalButton
                    variant="delete"
                    onClick={handleDeleteConfirmation}
                    aria-label="Confirm deletion"
                    type="button"
                  >
                    Delete
                  </ModalButton>

                  <ModalButton
                    variant="cancel"
                    onClick={() => setShowDeleteModal(false)}
                    aria-label="Cancel deletion"
                    type="button"
                  >
                    Cancel
                  </ModalButton>
                </div>
              </div>
            </div>
          </FormContainer>
        </Modal>
      )}

      {/* Confirmation Modal */}
      {showConfirmation && (
        <Modal>
          <ConfirmationModal
            view={true}
            Cancle={handleCancelDelete}
            Confirm={handleConfirmDelete}
            isPending={isPending}
            isSuccess={isSuccess}
            isError={isError}
            error={error}
            data={{ message: "Account deleted successfully" }}
          >
            Are you sure do you want to delete this account?
            <span className="text-red-500 text-[12px] block mt-1">
              Once you delete this account, there is no going back. Please be
              certain.
            </span>
          </ConfirmationModal>
        </Modal>
      )}
    </>
  );
}

export default DeleteModal;
