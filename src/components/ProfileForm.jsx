"use client";

import { deleteAvatar, updateProfile } from "@/lib/action-profile";
import { useActionState, useEffect, useRef, useState } from "react";

import Image from "next/image";
import { Trash2 } from "lucide-react";
import styles from "@/styles/profile.module.css";

export default function ProfileForm({ userData }) {
  const avatarInputRef = useRef(null);
  const nameInputRef = useRef(null);
  const lastNameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [state, actionForm, pending] = useActionState(updateProfile, null);
  const [imgSrc, setImgSrc] = useState(userData.img_url || "");

  useEffect(() => {
    if (state?.data) {
      nameInputRef.current.value = state.data.first_name;
      lastNameInputRef.current.value = state.data.last_name;
      emailInputRef.current.value = state.data.email;
    }
  }, [state]);

  const onChangeAvatar = (e) => {
    setImgSrc("");
    const file = e.target.files[0];
    if (file) {
      setImgSrc(URL.createObjectURL(file));
    }
  };

  const onRemoveAvatar = () => {
    setImgSrc("");
    avatarInputRef.current.value = "";
  };

  return (
    <form action={actionForm} className={styles.form}>
      <div>
        <p>Profile picture</p>
        <label>
          {imgSrc.trim() ? (
            <>
              <img src={imgSrc} alt="profile image" width={193} height={193} />
              <button
                className={styles.removeAvatar}
                type="button"
                onClick={() => setIsDeleteModalOpen(true)}
              >
                <Trash2 size={16} />
                Remove Avatar
              </button>
            </>
          ) : (
            <Image
              src="/images/upload-image.svg"
              alt="upload image"
              width={193}
              height={193}
            />
          )}
          <input
            type="file"
            name="avatar"
            ref={avatarInputRef}
            hidden
            accept="image/png, image/jpg, image/jpeg"
            onChange={onChangeAvatar}
          />
        </label>
        <p>Image must be below 1024x1024px. Use PNG or JPG format.</p>
      </div>

      <div>
        <label>
          First name*
          <input
            type="text"
            name="firstName"
            ref={nameInputRef}
            placeholder="Enter first name"
            defaultValue={userData.first_name}
          />
        </label>
        <label>
          Last name*
          <input
            type="text"
            name="lastName"
            ref={lastNameInputRef}
            placeholder="Enter last name"
            defaultValue={userData.last_name}
          />
        </label>
        <label>
          Email
          <input
            type="email"
            name="email"
            ref={emailInputRef}
            placeholder="Enter email"
            defaultValue={userData.email}
          />
        </label>
      </div>
      <hr />
      <button type="submit" disabled={pending}>
        Save
      </button>
      {state?.success && <p className={styles.success}>{state.message}</p>}
      {state?.error && <p className={styles.error}>{state.error.message}</p>}
      {isDeleteModalOpen && (
        <DeleteAvataModal
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          onRemoveAvatar={onRemoveAvatar}
        />
      )}
    </form>
  );
}

const DeleteAvataModal = ({ setIsDeleteModalOpen, onRemoveAvatar }) => {
  const onConfirm = async () => {
    const { success, message, error } = await deleteAvatar();
    if (success) {
      setIsDeleteModalOpen(false);
      onRemoveAvatar();
    }
  };
  return (
    <div className={styles.deleteModal}>
      <div className={styles.deleteModalContent}>
        <h2>Delete Avatar</h2>
        <p>Are you sure you want to delete your avatar?</p>
        <div className={styles.deleteModalButtons}>
          <button type="button" onClick={() => setIsDeleteModalOpen(false)}>
            Cancel
          </button>
          <button type="button" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
