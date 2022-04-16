import React from "react";
import Modal from "../modal components/Modal";
import ModalBody from "../modal components/ModalBody";
import ModalHeader from "../modal components/ModalHeader";
import ModalFooter from "../modal components/ModalFooter";
import "./styles.loading.css"

export default function ExecutionModal(props) {

    
  return (
    <Modal>
      <ModalHeader>
        <h3>Writing to the blockchain</h3>
      </ModalHeader>
      <ModalBody>
        <p>Please wait while your results are written to the blockchain.</p>
        <center><div class="lds-dual-ring"></div></center>
      </ModalBody>
      <ModalFooter>
         </ModalFooter>
    </Modal>
  );
}