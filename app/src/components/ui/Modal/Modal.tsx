import styles from "./Modal.module.scss";

interface IntOverlay {
  children: any;
  active: boolean;
}
const Overlay = ({ children, active }: IntOverlay) => {
  return (
    <div
      className={styles.overlay}
      style={{ display: active ? "flex" : "none" }}
    >
      {children}
    </div>
  );
};

const Modal = ({ children }: any) => {
  return <div className={styles.modal}>{children}</div>;
};

const ModalTitle = ({ title,children}:any) => {
  return (
    <div className={styles.modalTitle}>
      <h1>{title}</h1>
      {children}
    </div>
  );
};

const ModalBody = ({ children }: any) => {
  return <div className={styles.modalBody}>{children}</div>;
};

const ModalFooter = ({ children }: any) => {
  return <div className={styles.modalFooter}> {children}</div>;
};

export { Overlay, Modal, ModalTitle, ModalFooter, ModalBody };
