import React from "react";
import Modal from "@mui/material/Modal";
import { X } from "lucide-react";

type ModalProps = {
  type: string;
  openModal: boolean;
  handleCloseModal: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  modalHeader: string;
  placeHolderTopic?: string;
  handleChangeTopicName?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClickSave: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
};

const MyModal = ({
  type,
  openModal,
  handleCloseModal,
  modalHeader,
  placeHolderTopic,
  handleChangeTopicName,
  handleClickSave,
}: ModalProps) => {
  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="edit-topic"
    >
      <div className="flex flex-col max-w-sm w-4/6 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-white rounded-sm border border-gray/30 p-4">
        <button className="self-end" onClick={handleCloseModal}>
          <X className="w-5 h-5 p-0 m-0 font-medium text-gray/70 hover:text-gray/90 " />
        </button>
        <h3 className="text-lg font-normal text-center font-inter text-grayDark/90">
          {modalHeader}
        </h3>

        <div className="py-4 ">
          <div className="flex flex-col gap-4">
            {type !== "delete" && (
              <div>
                <label
                  htmlFor="name"
                  className="text-[#747577] text-sm text-right "
                >
                  Name:
                </label>
                <input
                  id="name"
                  onChange={handleChangeTopicName}
                  className="mt-1"
                  placeholder={placeHolderTopic}
                />
              </div>
            )}

            <div className="flex flex-col gap-4">
              {type === "delete" ? (
                <button onClick={handleClickSave} className="bg-red/80">
                  Delete
                </button>
              ) : (
                <button className="self-center" onClick={handleClickSave}>
                  Save
                </button>
              )}

              <button
                onClick={handleCloseModal}
                className="text-[#6E6E6E] bg-transparent border border-[#6E6E6E] rounded-sm hover:border-blue hover:text-blue hover:bg-transparent"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MyModal;
