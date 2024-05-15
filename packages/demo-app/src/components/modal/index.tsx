import React, { ReactElement } from "react";
import Modal from "react-modal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Button from "../form-controls/button";
import { detectMob } from "../../shared/utils";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: detectMob()? "51%": "30%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

interface IAppModal {
  isOpen: boolean;
  closeModal: any;
  title: string;
  children: ReactElement;
  onConfirm: any;
}



export function AppModal(props: IAppModal) {
  const { isOpen, closeModal, title, children, onConfirm } = props;

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onAfterOpen={() => {}}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="modal-width">
          <div className="grid grid-cols-2 pb-2 border-solid border-b">
            <h2 className="text-3xl bold ">{title}</h2>

            <FontAwesomeIcon
              icon={faXmark}
              onClick={closeModal}
              className="text-2xl text-slate-700 justify-self-end cursor-pointer"
              size="lg"
            />
          </div>

          <div className="my-4">{children}</div>

          <div className="border-solid border-t mt-6 pt-4 grid items-center">
            <div>
              <Button onClick={onConfirm} label="Apply" />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
