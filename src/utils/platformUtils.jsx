import Tooltip from "@mui/material/Tooltip";
import { FaWindows, FaPlaystation, FaXbox, FaApple, FaLinux, FaAndroid } from "react-icons/fa";
import { SiNintendo, SiGoogle, SiWii, SiNintendogamecube } from "react-icons/si";
import { GiSmartphone } from "react-icons/gi";
import { TbDeviceGamepad3Filled } from "react-icons/tb";

export const normalizePlatformName = (name) => {
  const lower = name.trim().toLowerCase();

  const map = {
    "playstation 5": "PlayStation",
    "playstation 4": "PlayStation",
    "playstation 3": "PlayStation",
    "xbox series s/x": "Xbox",
    "xbox one": "Xbox",
    "xbox 360": "Xbox",
    "pc": "PC",
    "windows": "PC",
    "macos": "Mac",
    "mac": "Mac",
    "classic macintosh": "Mac",
    "linux": "Linux",
    "android": "Android",
    "ios": "iOS",
    "nintendo switch": "Nintendo",
    "nintendo 3ds": "Nintendo",
    "stadia": "Stadia",
    "wii" : "Wii",
    "wii u" : "Wii",
    "gamecube": "GameCube",
    "game boy advance": "Game Boy",
    "game boy": "Game Boy",
    "game boy color": "Game Boy"
  };

  return map[lower] || name;
};

export const getPlatformIcon = (name) => {
  const lower = name.toLowerCase();
  const icon = (() => {
    if (lower.includes("playstation")) return <FaPlaystation size={20} />;
    if (lower.includes("xbox")) return <FaXbox size={20} />;
    if (lower.includes("pc") || lower.includes("windows")) return <FaWindows size={20} />;
    if (lower.includes("nintendo")) return <SiNintendo size={20} />;
    if (lower.includes("mac")) return <FaApple size={20} />;
    if (lower.includes("linux")) return <FaLinux size={20} />;
    if (lower.includes("android")) return <FaAndroid size={20} />;
    if (lower.includes("stadia")) return <SiGoogle size={20} />;
    if (lower.includes("ios")) return <GiSmartphone size={20} />;
    if (lower.includes("wii")) return <SiWii size={20} />;
    if (lower.includes("gamecube")) return <SiNintendogamecube size={20} />;
    if (lower.includes("game boy")) return <TbDeviceGamepad3Filled size={20} />;
    return "";
  })();

  return <Tooltip title={name}>{icon}</Tooltip>;
};
