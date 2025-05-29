"use client";

import NewLink from "./NewLink";
import styles from "@/styles/links.module.css";

export default function StaticLinksList({
  links,
  deleteLink,
  updateLink,
  platforms,
}) {
  return (
    <div className={styles.linksList}>
      {links?.map((x, index) => (
        <NewLink
          key={index}
          link={x}
          index={index}
          deleteLink={deleteLink}
          updateLink={updateLink}
          platforms={platforms}
          isDragDisabled={true}
        />
      ))}
    </div>
  );
}
