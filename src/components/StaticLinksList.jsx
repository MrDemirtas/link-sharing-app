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
      {links?.map((x) => (
        <NewLink
          key={x.id}
          link={x}
          index={x.sequence}
          deleteLink={deleteLink}
          updateLink={updateLink}
          platforms={platforms}
          isDragDisabled={true}
        />
      ))}
    </div>
  );
}
