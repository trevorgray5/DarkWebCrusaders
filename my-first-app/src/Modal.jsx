import React from "react";
import styles from "./Modal.module.css";
import { RiCloseLine } from "react-icons/ri";
import TaskCards from "./taskCard";

  
  const Modal = ({ setIsOpen }) => {
  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          
          <button className={styles.submitButton} style={{"margin-left": "253px"}} onClick={() => setIsOpen(false)}>
            <RiCloseLine >Close</RiCloseLine>
          </button>
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
                <div>
                    <label htmlFor="boxTitleText" className={styles.labels}>Title</label>
                    <input type="text" id="boxTitleText"
                    className={styles.boxText} />
                    <br />
                    <label htmlFor="boxDescriptionText" className={styles.labels}>Description</label>
                    <input type="text" id="boxDescriptionText"
                    className={styles.boxText} />
                    <br />
                    <label htmlFor="dueDate" className={styles.labels}>Due Date</label>
                    <input type="date" id="boxDueDateText"
                    className={styles.boxText} />
                    <br />
                    <label htmlFor="boxTagsText" className={styles.labels}>Tags</label>
                    <input type="text" id="boxTagsText"
                    className={styles.boxText} />
                </div>
            </div>
          </div>
          <button
                className={styles.submitButton}
                onClick={() => {
                  setIsOpen(false);
                  TaskCards.addTask();}}>
                Submit
              </button>
        </div>
      </div>
    </>
  );
 };

export default Modal;
