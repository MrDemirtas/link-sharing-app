"use client";

import { Suspense, useActionState, useEffect, useState } from "react";
import getPlatforms, {
  deleteLinkAction,
  getLinks,
  insertLinks,
  updateLinks,
} from "@/lib/action-links";

import StaticLinksList from "./StaticLinksList";
import dynamic from "next/dynamic";
import styles from "@/styles/links.module.css";

// Drag and drop bileşenini dynamic import ile yükle
const DragAndDropWrapper = dynamic(() => import("./DragAndDropWrapper"), {
  loading: () => <div className={styles.linksList}>Yükleniyor...</div>,
  ssr: false, // Server-side rendering'i devre dışı bırak
});

export default function LinksList({ linkData, platformData }) {
  const [links, setLinks] = useState(linkData);
  const [dbLinks, setDbLinks] = useState(linkData);
  const [newLinks, setNewLinks] = useState([]);
  const [platforms, setPlatforms] = useState(platformData);
  const [handleDelete, setHandleDelete] = useState(false);

  useEffect(() => {
    saveLinks();
  }, [handleDelete]);

  function handleNewLink() {
    const newLink = {
      platform_id: platforms[0].id,
      url: "",
      sequence: links.length,
    };
    setNewLinks((prev) => [...prev, newLink]);
    setLinks((prev) => [...prev, newLink]);
  }

  async function deleteLink(link) {
    setLinks(links.filter((x) => x.id != link.id));
    setNewLinks(newLinks.filter((x) => x.id != link.id));

    if (dbLinks.find((x) => x.id === link.id)) {
      const status = await deleteLinkAction(link.id);
      if (status.success) {
        setHandleDelete(!handleDelete);
      }
    }
  }

  function updateLink(updatedLink) {
    setLinks(
      links.map((link) => (link.id === updatedLink.id ? updatedLink : link))
    );

    if (newLinks.find((link) => link.id === updatedLink.id)) {
      setNewLinks(
        newLinks.map((link) =>
          link.id === updatedLink.id ? updatedLink : link
        )
      );
    }
  }

  async function saveLinks() {
    const options = links.map((x, index) => {
      const data = {
        platform_id: x.platform_id,
        url: x.url,
        sequence: index,
      };
      x.id && (data.id = x.id);
      return data;
    });
    await updateLinks(options);

    const updatedLinkData = await getLinks();
    setDbLinks(updatedLinkData);
    setLinks(updatedLinkData);
    setNewLinks([]);
  }

  return (
    <>
      <button onClick={handleNewLink} className={styles.addNewLinkBtn}>
        + Add new link
      </button>
      {links.length > 0 ? (
        <Suspense
          fallback={
            <StaticLinksList
              links={links}
              deleteLink={deleteLink}
              updateLink={updateLink}
              platforms={platforms}
            />
          }
        >
          <DragAndDropWrapper
            links={links}
            setLinks={setLinks}
            deleteLink={deleteLink}
            updateLink={updateLink}
            platforms={platforms}
          />
        </Suspense>
      ) : (
        <div className={styles.emptyListDiv}>
          <img src="/images/links-empty.svg" />
          <h2>Let's get you started</h2>
          <p>
            Use the "Add new link" button to get started. Once you have more
            than one link, you can reorder and edit them. We're here to help you
            share your profiles with everyone!
          </p>
        </div>
      )}
      <hr className={styles.hr} />
      <button
        disabled={links.length == 0 ? true : false}
        onClick={saveLinks}
        className={styles.saveBtn}
      >
        Save
      </button>
    </>
  );
}
