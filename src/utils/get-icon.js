import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Twitch,
  X,
  Youtube,
} from "lucide-react";

export default function getPlatformIcon(platformName) {
  const data = [
    {
      name: "github",
      icon: <Github />,
    },
    {
      name: "youtube",
      icon: <Youtube />,
    },
    {
      name: "linkedin",
      icon: <Linkedin />,
    },
    {
      name: "instagram",
      icon: <Instagram />,
    },
    {
      name: "facebook",
      icon: <Facebook />,
    },
    {
      name: "x",
      icon: <X />,
    },
    {
      name: "twitch",
      icon: <Twitch />,
    },
  ];

  return data.find((x) => x.name == platformName)?.icon || "";
}
