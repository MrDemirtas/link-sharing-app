"use client";

import { Link, Menu } from "lucide-react";

import { CSS } from "@dnd-kit/utilities";
import DeleteLinkModal from "./DeleteLinkModal";
import styles from "@/styles/links.module.css";
import { useSortable } from "@dnd-kit/sortable";
import { useState } from "react";

export default function NewLink({
  link,
  index,
  deleteLink,
  updateLink,
  platforms,
  isDragDisabled = false,
}) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: link?.id,
      disabled: isDragDisabled,
    });

  function handleInputChange(e, field) {
    const value = e.target.value;
    const updatedLink = {
      ...link,
      [field]: value,
    };
    updateLink(updatedLink);
  }

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    await deleteLink(link);
    setIsDeleteModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsDeleteModalOpen(false);
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Drag disabled durumunda attributes ve listeners'ı kullanma
  const dragProps = isDragDisabled ? {} : { ...attributes, ...listeners };

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
