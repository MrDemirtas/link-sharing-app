"use client";

import { deleteAvatar, updateProfile } from "@/lib/action-profile";
import { useActionState, useEffect, useRef, useState } from "react";

import Image from "next/image";
import { Trash2 } from "lucide-react";
import styles from "@/styles/profile.module.css";
import { toast } from "sonner";
import { useUserContext } from "@/lib/UserProvider";

export default function ProfileForm({ userData }) {
  const avatarInputRef = useRef(null);
  const nameInputRef = useRef(null);
  const lastNameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const slugRef = useRef(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [state, actionForm, pending] = useActionState(updateProfile, null);
  const [imgSrc, setImgSrc] = useState(userData.img_url || "");
  const { updateProfile: updateContextProfile } = useUserContext();

  useEffect(() => {
    if (state?.data) {
      nameInputRef.current.value = state.data.first_name;
      lastNameInputRef.current.value = state.data.last_name;
      emailInputRef.current.value = state.data.email;
      slugRef.current.value = state.data.slug;

      // Context'i güncelle
      updateContextProfile({
        first_name: state.data.first_name,
        last_name: state.data.last_name,
        email: state.data.email,
        slug: state.data.slug,
        img_url: state.data.img_url,
      });
    }

    if (state) {
      if (state?.success) {
        toast.success(state.message);
      } else {
        toast.error(state.message);
      }
    }
  }, [state, updateContextProfile]);

  const onChangeAvatar = (e) => {
    setImgSrc("");
    const file = e.target.files[0];
    if (file) {
      // 1 MB = 1024 * 1024 bytes = 1048576 bytes
      const maxSize = 1024 * 1024; // 1 MB

      if (file.size > maxSize) {
        toast.error(
          "Dosya boyutu 1 MB'dan büyük olamaz. Lütfen daha küçük bir resim seçin."
        );
        // Input'u temizle
        avatarInputRef.current.value = "";
        return;
      }

      setImgSrc(URL.createObjectURL(file));
    }
  };

  const onRemoveAvatar = () => {
    setImgSrc("");
    avatarInputRef.current.value = "";
  };

  return (
    <form action={actionForm} className={styles.form}>
      <div className={styles.avatarDiv}>
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

      <div className={styles.formInputs}>
        <label>
          Username
          <input
            type="text"
            name="slug"
            ref={slugRef}
            placeholder="Enter username"
            defaultValue={userData.slug}
          />
        </label>
        <label>
          First name
          <input
            type="text"
            name="firstName"
            ref={nameInputRef}
            placeholder="Enter first name"
            defaultValue={userData.first_name}
          />
        </label>
        <label>
          Last name
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
  const { updateProfile: updateContextProfile } = useUserContext();

  const onConfirm = async () => {
    const { success, message, error } = await deleteAvatar();
    if (success) {
      setIsDeleteModalOpen(false);
      onRemoveAvatar();
      toast.success(message);
      // Avatar silindiğinde context'i güncelle
      updateContextProfile({ img_url: null });
    } else {
      toast.error(message || error);
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
