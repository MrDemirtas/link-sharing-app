import Image from "next/image";
import checkUserSession from "@/utils/check-user-session";
import styles from "@/styles/profile.module.css";

export default async function Profile() {
  await checkUserSession();

  return (
    <main className={styles.main}>
      <h1>Profile Details</h1>
      <p>Add your details to create a personal touch to your profile.</p>
      <form className={styles.form}>
        <div>
          <p>Profile picture</p>
          <Image
            src="/images/upload-image.svg"
            alt="upload image"
            width={193}
            height={193}
          />
          <p>Image must be below 1024x1024px. Use PNG or JPG format.</p>
        </div>

        <div>
          <label>
            First name*
            <input
              type="text"
              name="firstName"
              placeholder="Enter first name"
            />
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
        <button type="submit">Save</button>
      </form>
    </main>
  );
}
