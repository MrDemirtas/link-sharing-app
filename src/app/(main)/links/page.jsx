import { getLinks, getPlatforms } from "@/lib/action-links";

import LinksList from "@/components/LinksList";
import checkUserSession from "@/utils/check-user-session";
import styles from "@/styles/links.module.css";

export default async function Links() {
  await checkUserSession();
  const linkData = await getLinks();
  const platformData = await getPlatforms();
  return (
    <div className={styles.linksPageContainer}>
      <div className={styles.linksPage}>
        <div className={styles.linksPageHeader}>
          <h1>Customize your links</h1>
          <p>
            Add/edit/remove links below and then share all your profiles with
            the world!
          </p>
        </div>
        <LinksList linkData={linkData} platformData={platformData} />
      </div>
    </div>
  );
}
