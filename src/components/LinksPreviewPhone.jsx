"use client";

import {
  ArrowRight,
  Facebook,
  Github,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import SingleLink from "./SingleLink";
import getPlatformIcon from "@/utils/get-icon";
import styles from "@/styles/preview-phone.module.css";
import { useEffect } from "react";
import { useUserContext } from "@/lib/UserProvider";

export default function LinksPreviewPhone({ data }) {
  return (
    <div className={styles.previewPhoneCont}>
      <div className={styles.phoneContainer}>
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
              className={styles[x.platform.name.toLowerCase()]}
              href={x.url}
            >
              {getPlatformIcon(x.platform.name.toLowerCase())} {x.platform.name}
              <ArrowRight style={{ marginLeft: "auto" }} />
            </Link>
          ))}
        </div>
      </div>
      <svg
        width="308"
        height="632"
        viewBox="0 0 308 632"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M54.5 1H253.5C283.047 1 307 24.9528 307 54.5V577.5C307 607.047 283.047 631 253.5 631H54.5C24.9528 631 1 607.047 1 577.5V54.5C1 24.9528 24.9528 1 54.5 1Z"
          stroke="#737373"
        />
        <path
          d="M56.5 11H80.5C86.8513 11 92 16.1487 92 22.5C92 30.5081 98.4919 37 106.5 37H201.5C209.508 37 216 30.5081 216 22.5C216 16.1487 221.149 11 227.5 11H251.5C276.077 11 296 30.9233 296 55.5V576.5C296 601.077 276.077 621 251.5 621H56.5C31.9233 621 12 601.077 12 576.5V55.5C12 30.9233 31.9233 11 56.5 11Z"
          fill="white"
          stroke="#737373"
        />

        <defs>
          <clipPath id="clip0_36_9751">
            <rect
              width="16"
              height="16"
              fill="white"
              transform="translate(51 292)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
