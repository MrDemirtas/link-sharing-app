"use client";

import { useActionState, useRef, useState } from "react";

import Image from "next/image";
import styles from "@/styles/profile.module.css";
import { updateProfile } from "@/lib/action-profile";

export default function ProfileForm() {
  const [state, actionForm, pending] = useActionState(updateProfile, null);
  const [imgSrc, setImgSrc] = useState("");
  console.log(state);
  const onChangeAvatar = (e) => {
    setImgSrc("");
    const file = e.target.files[0];
    if (file) {
      setImgSrc(URL.createObjectURL(file));
    }
  };

  return (
    <form action={actionForm} className={styles.form}>
      <div>
        <p>Profile picture</p>
        <label>
          {imgSrc.trim() ? (
            <img src={imgSrc} alt="profile image" width={193} height={193} />
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
          <input type="text" name="firstName" placeholder="Enter first name" />
        </label>
        <label>
          Last name*
          <input type="text" name="lastName" placeholder="Enter last name" />
        </label>
        <label>
          Email
          <input type="email" name="email" placeholder="Enter email" />
        </label>
      </div>
      <hr />
      <button type="submit" disabled={pending}>
        Save
      </button>
    </form>
  );
}
