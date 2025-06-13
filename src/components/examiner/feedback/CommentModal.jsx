import { useState, useEffect } from "react";
import Modal from "../../shared/modal/Modal";
import useUpdateComment from "@/hooks/examiner/feedback/useUpdateComment";
import Alert from "@/components/shared/Alert";
import Spinner from "@/components/shared/Spinner";

export default function CommentModal({
  modalContent,
  setModalContent,
  onSave,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const {
    data,
    isPending,
    mutate: updateComment,
    isSuccess,
  } = useUpdateComment();
  console.log(modalContent, "modalContent");
  useEffect(() => {
    if (modalContent.isOpen) {
      setEditedContent(modalContent.content || "");
      setIsEditing(false);
    }
  }, [modalContent.isOpen, modalContent.content]);
  useEffect(() => {
    if (isSuccess)
      setTimeout(
        () => setModalContent({ ...modalContent, isOpen: false }),
        1400
      );
  }, [isSuccess]);
  if (!modalContent.isOpen) return null;

  const handleSave = async () => {
    console.log(
      editedContent,
      "modalContent.content modalContent.content modalContent.content"
    );
    updateComment({
      id: modalContent.id,
      body: { comments: editedContent, totalScore: modalContent.totalScore },
    });
  };

  const handleCancel = () => {
    setEditedContent(modalContent.content || "");
    setIsEditing(false);
  };

  const handleClose = () => {
    setModalContent({ ...modalContent, isOpen: false });
    setIsEditing(false);
  };

  return (
    <>
      {isSuccess && <Alert message={data.message} />}
      <Modal>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[32rem] overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
            <div className="flex items-center justify-between">
              <h3 className="text-[20px] font-semibold text-gray-900 dark:text-gray-100 font-mono">
                {modalContent.title}
              </h3>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-3 py-1 text-sm cursor-pointer font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors border border-blue-300 dark:border-blue-600 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20"
                >
                  Edit
                </button>
              )}
            </div>
          </div>

          <div className="px-6 py-4 flex-1 overflow-y-auto">
            {isEditing ? (
              <div className="space-y-4">
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="w-full h-40 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md resize-none focus:outline-none  bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Enter your comment..."
                  autoFocus
                />
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Characters: {editedContent.length}
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {modalContent.content || "No content available"}
                </p>
                {modalContent.lastModified && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Last modified:{" "}
                    {new Date(modalContent.lastModified).toLocaleString()}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3 flex-shrink-0">
            {isEditing ? (
              <>
                <button
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="px-4 py-2 cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isPending}
                  className="px-4 py-2 text-sm flex items-center gap-1.5 font-medium cursor-pointer text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed rounded-md transition-colors"
                >
                  {isPending && <Spinner />}
                  {isPending ? "Saving..." : "Save"}
                </button>
              </>
            ) : (
              !isPending && (
                <button
                  onClick={handleClose}
                  className="px-4 py-2 cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                >
                  Close
                </button>
              )
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}
