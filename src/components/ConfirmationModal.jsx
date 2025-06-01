"use client";

import { useEffect, useRef, useState } from "react";

import styles from "@/styles/confirmationModal.module.css";

export default function ConfirmationModal({
  isOpen,
  onConfirm,
  onCancel,
  title,
  message,
}) {
  const ref = useRef();

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const dialog = ref.current;
    dialog.showModal();
    return () => {
      dialog.close();
    };
  }, [isOpen]);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;

    const handleClickOutside = (event) => {
      if (event.target === dialog) {
        onCancel();
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onCancel();
      }
    };

    dialog.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      dialog.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onCancel]);

  return (
    <dialog ref={ref} className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3>{title}</h3>
        </div>
        <div className={styles.modalBody}>
          <p>{message}</p>
        </div>
        <div className={styles.modalActions}>
          <button onClick={onCancel} className={styles.cancelButton}>
            İptal
          </button>
          <button onClick={onConfirm} className={styles.confirmButton}>
            Evet, Çıkış Yap
          </button>
        </div>
      </div>
    </dialog>
  );
}
