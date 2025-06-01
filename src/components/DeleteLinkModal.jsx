"use client";

import { AlertTriangle, X } from "lucide-react";

import styles from "@/styles/modal.module.css";
import { useState } from "react";

export default function DeleteLinkModal({
  isOpen,
  onClose,
  onConfirm,
  linkNumber,
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setIsDeleting(true);
    await onConfirm();
    setIsDeleting(false);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleBackdropClick}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <div className={styles.iconWrapper}>
            <AlertTriangle className={styles.warningIcon} />
          </div>
          <button
            className={styles.closeButton}
            onClick={onClose}
            disabled={isDeleting}
          >
            <X size={20} />
          </button>
        </div>

        <div className={styles.modalBody}>
          <h2 className={styles.modalTitle}>Linki Sil</h2>
          <p className={styles.modalDescription}>
            <strong>Link #{linkNumber}</strong> öğesini silmek istediğinizden
            emin misiniz? Bu işlem geri alınamaz ve link kalıcı olarak
            kaldırılacaktır.
          </p>
        </div>

        <div className={styles.modalFooter}>
          <button
            className={styles.cancelButton}
            onClick={onClose}
            disabled={isDeleting}
          >
            İptal
          </button>
          <button
            className={styles.deleteButton}
            onClick={handleConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <span className={styles.spinner}></span>
                Siliniyor...
              </>
            ) : (
              "Linki Sil"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
