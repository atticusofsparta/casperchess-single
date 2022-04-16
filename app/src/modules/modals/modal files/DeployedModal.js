import React from "react";
import Modal from "../modal components/Modal";
import ModalBody from "../modal components/ModalBody";
import ModalHeader from "../modal components/ModalHeader";
import ModalFooter from "../modal components/ModalFooter";

export default function DeployedModal(props) {
  return (
    <Modal>
      <ModalHeader>
        <h3>Saving</h3>
      </ModalHeader>
      <ModalBody>
        <p>Please follow the prompts from the Casper Signer to complete saving to the blockchain.</p>
      </ModalBody>
      <ModalFooter>
         </ModalFooter>
    </Modal>
  );
}