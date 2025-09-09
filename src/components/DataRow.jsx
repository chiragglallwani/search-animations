"use client";
import { useState, useEffect } from "react";
import { cn, getRelativeTime } from "@/lib/utils";
import {
  Menu,
  Play,
  User,
  Image as ImageIcon,
  Folder,
  Link,
  ExternalLink,
  Check,
} from "lucide-react";
import Image from "next/image";

const avatar = Icon => (
  <div className="w-10 h-10 rounded-lg bg-gray-200/50 flex items-center justify-center">
    <Icon className="w-5 h-5 rounded-lg object-cover text-gray-400 fill-gray-300" />
  </div>
);

export default function DataRow({ item, search }) {
  const {
    title,
    description,
    type,
    status,
    link,
    lastUpadtedAt,
    createdAt,
    FileType,
    imgUrl,
  } = item;

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }, [copied]);

  const renderProfile = () => {
    switch (type) {
      case "Profile":
        return (
          <div className="relative">
            <Image
              src={imgUrl}
              alt={title}
              className="w-10 h-10 rounded-lg object-cover"
              width={40}
              height={40}
            />
            <span
              className={cn(
                "absolute -bottom-1 -right-1 border-3 border-white w-4 h-4 rounded-full",
                status === "Active Now" && "bg-green-500",
                status === "Active" && "bg-yellow-400",
                status === "Unactivated" && "bg-red-700"
              )}
            ></span>
          </div>
        );
      case "Chats":
        return (
          <Image
            src={imgUrl}
            alt={title}
            className="w-10 h-10 rounded-lg object-cover"
            width={40}
            height={40}
          />
        );
      case "Files":
        if (FileType === "Image") {
          return avatar(ImageIcon);
        }
        if (FileType === "Video") {
          return avatar(Play);
        }
        return avatar(Folder);
      case "Lists":
        return avatar(Menu);
      default:
        return avatar(User);
    }
  };

  const highlightSearchTerm = (text, searchTerm) => {
    if (!searchTerm || !text) return text;

    const regex = new RegExp(`(${searchTerm})`, "gi");
    const str = text.split(regex);

    return str.map((part, index) => {
      if (regex.test(part)) {
        return (
          <span key={index} className="bg-orange-200/70  font-semibold">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className="group flex items-start justify-between hover:bg-gray-100 border-b border-gray-200/50 py-3">
      <div className="flex items-center gap-2 px-5 flex-1 md:flex-[0.65]">
        {renderProfile()}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <p className="text-lg font-bold">
              {highlightSearchTerm(title, search)}
            </p>
            {type === "Files" && FileType === "Folder" && (
              <p className="text-sm bg-gray-200 px-1 rounded-md text-gray-600">
                {status}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-500 truncate">{description}</p>
            {type !== "Profile" && type !== "Chats" && (
              <p className="text-sm text-gray-500 hidden md:block">
                •{" "}
                {lastUpadtedAt !== createdAt
                  ? "Edited " +
                    getRelativeTime(parseInt(lastUpadtedAt)) +
                    " ago"
                  : "Added " + getRelativeTime(parseInt(createdAt)) + " ago"}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="px-5 hidden md:flex md:flex-[0.35] items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="relative group/button">
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-1 py-0.5 text-xs bg-gray-800 text-white rounded-md shadow-lg opacity-0 group-hover/button:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20">
            {copied ? (
              <div className="flex items-center gap-1">
                <Check className="w-4 h-4" />
                <span>Link copied!</span>
              </div>
            ) : (
              "Copy link"
            )}
          </div>

          <button
            onClick={() => {
              window.navigator.clipboard.writeText(link);
              setCopied(true);
            }}
            className="text-md text-gray-500 hover:bg-gray-500/20 rounded-md p-2 transition-colors duration-200"
          >
            <Link className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        <button
          onClick={() => window.open(link, "_blank")}
          className="text-md text-gray-500 hover:bg-gray-500/20 rounded-md p-2 transition-colors duration-200 flex items-center gap-2"
        >
          <ExternalLink className="w-4 h-4 text-gray-500" />
          New Tab
        </button>
      </div>
    </div>
  );
}
