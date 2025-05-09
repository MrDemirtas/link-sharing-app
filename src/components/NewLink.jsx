"use client";
import styles from "@/styles/links.module.css";
import getPlatforms from "@/lib/action-links";
import { Link, Menu } from "lucide-react";
import { useEffect, useState } from "react";

export default function NewLink({ link, index, deleteLink, updateLink }) {
  const [platforms, setPlatforms] = useState([]);

  useEffect(() => {
    async function getData() {
      const platformData = await getPlatforms();
      setPlatforms(platformData);
    }

    getData();
  }, []);

  function handleInputChange(e, field) {
    const value = e.target.value;
    const updatedLink = {
      ...link,
      [field]: value,
    };
    updateLink(updatedLink);
  }

  return (
    <div className={styles.newLinkSection}>
      <div className={styles.linkHeader}>
        <Menu />
        <h2>Link #{index + 1}</h2>
        <span onClick={() => deleteLink(link)}>Remove</span>
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
  );
}
