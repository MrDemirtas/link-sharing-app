"use client";

import { Link, Menu } from "lucide-react";

import { CSS } from "@dnd-kit/utilities";
import DeleteLinkModal from "./DeleteLinkModal";
import styles from "@/styles/links.module.css";
import { useSortable } from "@dnd-kit/sortable";
import { useState } from "react";
import { useUserContext } from "@/lib/UserProvider";

export default function NewLink({
  link,
  index,
  deleteLink,
  updateLink,
  platforms,
  handle,
  isDragDisabled,
}) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { userData, updateLinks: updateContextLinks } = useUserContext();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: link.id || link.sequence || index,
    disabled: isDragDisabled,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    ...(isDragging ? { zIndex: 1000, position: "relative" } : {}),
  };

  const dragProps = handle ? { ...attributes, ...listeners } : {};

  const handleInputChange = (e, field) => {
    const value =
      field === "platform_id" ? parseInt(e.target.value) : e.target.value;
    const updatedLink = { ...link, [field]: value };
    updateLink(updatedLink);

    // Anlık context güncellemeyi kaldırdık - sadece local state güncellenecek
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = () => {
    deleteLink(link);
    setIsDeleteModalOpen(false);

    // Link silme işleminde context güncellemesi gerekli değil
    // çünkü LinksList bileşeninde saveLinks() çağrılacak
  };

  return (
    <>
      <div ref={setNodeRef} style={style} className={styles.newLinkSection}>
        <div className={styles.linkHeader}>
          <Menu
            className={isDragDisabled ? styles.disabled : ""}
            style={{
              cursor: isDragDisabled ? "not-allowed" : "grab",
              outline: "none",
            }}
            {...dragProps}
          />
          <h2>Link #{index + 1}</h2>
          <button onClick={handleDeleteClick}>Remove</button>
        </div>
        <div>
          <h3>Platform</h3>
          <select
            value={link?.platform_id}
            onChange={(e) => handleInputChange(e, "platform_id")}
          >
            {platforms?.map((x) => (
              <option value={x?.id} key={x?.id}>
                {x?.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <h3>Link</h3>
          <div className={styles.inputContainer}>
            <Link />
            <input
              type="url"
              placeholder="e.g. https://www.github.com/johnappleseed"
              value={link?.url || ""}
              onChange={(e) => handleInputChange(e, "url")}
            />
          </div>
        </div>
      </div>

      <DeleteLinkModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        linkNumber={index + 1}
      />
    </>
  );
}
