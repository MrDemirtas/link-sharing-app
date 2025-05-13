import { Github, Linkedin, Twitter, Youtube } from "lucide-react";

export default function getPlatformIcon(platformName) {
  const data = [
    {
      name: "github",
      icon: <Github />,
    },
    {
      name: "twitter",
      icon: <Twitter />,
    },
    {
      name: "youtube",
      icon: <Youtube />,
    },
    {
      name: "linkedin",
      icon: <Linkedin />,
    },
  ];

  return data.find((x) => x.name == platformName)?.icon || "";
}
