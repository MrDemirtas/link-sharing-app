import styles from "@/styles/preview-phone.module.css";
import getPlatformIcon from "@/utils/get-icon";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProfileLinks({ data }) {
  return (
    <div className={styles.profileLinksCont}>
      <div className={styles.profileContainer}>
        <Image
          src={data.img_url || "/images/user.svg"}
          alt="Your profile picture"
          height={96}
          width={96}
        />
        <div>
          <h2>
            {data.first_name} {data.last_name}
          </h2>
          <p>{data.email}</p>
        </div>
      </div>
      <div className={styles.linkContainer}>
        {data.links.map((x, index) => (
          <Link
            key={index}
            target="_blank"
            className={
              styles.previewLink + " " + styles[x.platform.name.toLowerCase()]
            }
            href={x.url}
          >
            {getPlatformIcon(x.platform.name.toLowerCase())} {x.platform.name}
            <ArrowRight style={{ marginLeft: "auto" }} />
          </Link>
        ))}
      </div>
    </div>
  );
}
