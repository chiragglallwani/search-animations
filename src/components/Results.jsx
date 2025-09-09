"use client";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, MessageCircle, Paperclip, Settings, User } from "lucide-react";
import Tab from "@/components/ui/Tab";
import SettingsDialog from "@/components/SettingsDialog";
import DataRow from "@/components/DataRow";
import SkeletonLoader from "@/components/SkeletonLoader";

const TABS = {
  All: "All",
  Files: "Files",
  Profile: "Profile",
  Chats: "Chats",
  Lists: "Lists",
};

export default function Results({ data, isLoading = false, search }) {
  const activeTabClass = "font-semibold border-b-2 border-black text-black";
  const inactiveTabClass = "font-semibold pb-2 px-1 text-gray-500 text-md";
  const iconClass = "w-5 h-5 text-gray-400";

  const [activeTab, setActiveTab] = useState(TABS.All);
  const [filteredData, setFilteredData] = useState();
  const [typesFound, setTypesFound] = useState({
    [TABS.Files]: 0,
    [TABS.Profile]: 0,
    [TABS.Chats]: 0,
    [TABS.Lists]: 0,
  });
  const [showTabs, setShowTabs] = useState({
    [TABS.All]: true,
    [TABS.Files]: true,
    [TABS.Profile]: true,
    [TABS.Chats]: false,
    [TABS.Lists]: false,
  });
  const [showSettings, setShowSettings] = useState(false);

  const Tabs = [
    {
      name: TABS.All,
      count: data.length,
      onClick: () => setActiveTab(TABS.All),
      className: cn(inactiveTabClass, activeTab === TABS.All && activeTabClass),
    },
    {
      name: TABS.Files,
      icon: <Paperclip className={iconClass} />,
      count: typesFound.Files,
      onClick: () => setActiveTab(TABS.Files),
      className: cn(
        inactiveTabClass,
        activeTab === TABS.Files && activeTabClass
      ),
    },
    {
      name: TABS.Profile,
      icon: <User className={iconClass} />,
      count: typesFound.Profile,
      onClick: () => setActiveTab(TABS.Profile),
      className: cn(
        inactiveTabClass,
        activeTab === TABS.Profile && activeTabClass
      ),
    },
    {
      name: TABS.Chats,
      icon: <MessageCircle className={iconClass} />,
      count: typesFound.Chats,
      onClick: () => setActiveTab(TABS.Chats),
      className: cn(inactiveTabClass, activeTab === "chats" && activeTabClass),
    },
    {
      name: TABS.Lists,
      icon: <Menu className={iconClass} />,
      count: typesFound.Lists,
      onClick: () => setActiveTab(TABS.Lists),
      className: cn(
        inactiveTabClass,
        activeTab === TABS.Lists && activeTabClass
      ),
    },
  ];

  useEffect(() => {
    const targetFiles = data.filter(item => item.type === TABS.Files).length;
    const targetProfile = data.filter(
      item => item.type === TABS.Profile
    ).length;
    const targetChats = data.filter(item => item.type === TABS.Chats).length;
    const targetLists = data.filter(item => item.type === TABS.Lists).length;

    setTypesFound({
      [TABS.Files]: targetFiles,
      [TABS.Profile]: targetProfile,
      [TABS.Chats]: targetChats,
      [TABS.Lists]: targetLists,
    });
  }, [data]);

  useEffect(() => {
    if (activeTab !== TABS.All) {
      setFilteredData(data.filter(item => item.type === activeTab));
    } else {
      setFilteredData(data);
    }
  }, [activeTab, data]);

  console.log(filteredData);

  return (
    <div className="h-96 w-full flex flex-col bg-white rounded-2xl">
      <div className="flex border-b border-gray-200 px-5 flex-shrink-0">
        <div className="flex items-center justify-between w-full gap-4 md:gap-0">
          <div className="flex gap-2 overflow-x-auto">
            {Tabs.filter(tab => showTabs[tab.name]).map(tab => (
              <Tab key={tab.name} {...tab} />
            ))}
          </div>
          <div className="relative">
            <button onClick={() => setShowSettings(!showSettings)}>
              <Settings
                className={cn(
                  "h-5 w-5 text-gray-400",
                  showSettings && "rotate-180 duration-300",
                  !showSettings && "rotate-0 duration-300"
                )}
              />
            </button>
            {showSettings && (
              <div className="absolute top-10 right-0 drop-shadow-2xl bg-white rounded-md p-4 z-4">
                <div className="flex flex-col">
                  <form>
                    {Tabs.slice(1).map(tab => (
                      <SettingsDialog
                        icon={tab.icon}
                        key={tab.name}
                        label={tab.name}
                        value={showTabs[tab.name]}
                        onChange={() => {
                          setShowTabs({
                            ...showTabs,
                            [tab.name]: !showTabs[tab.name],
                          });
                          if (activeTab === tab.name) {
                            setActiveTab(TABS.All);
                          }
                        }}
                      />
                    ))}
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-4 overflow-y-auto flex-1 rounded-b-2xl">
        {isLoading ? (
          <SkeletonLoader />
        ) : filteredData?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-gray-500">
            <p className="text-lg font-medium">No results found</p>
            <p className="text-sm">Try adjusting your search terms</p>
          </div>
        ) : (
          filteredData?.map(item => (
            <DataRow search={search} key={item.id} item={item} />
          ))
        )}
      </div>
    </div>
  );
}
