"use client";

import { Loader2, SearchIcon } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import SButton from "@/components/SButton";
import Results from "@/components/Results";
export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  useEffect(() => {
    const handleKeyDown = event => {
      if (
        event.key?.toLowerCase() === "s" &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.altKey
      ) {
        if (document.activeElement !== inputRef.current) {
          event.preventDefault();
          inputRef.current?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (search.length === 0) {
      setData([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setData([]);

    const timeoutId = setTimeout(async () => {
      try {
        const response = await fetch("/results.json");
        const jsonData = await response.json();

        const filteredData = jsonData.results.filter(item =>
          item.title.toLowerCase().includes(search.toLowerCase())
        );

        setData(filteredData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
        setIsLoading(false);
      }
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [search]);

  return (
    <div
      className={`w-[90%] md:w-[70%] lg:w-[55%] mx-auto bg-white rounded-2xl drop-shadow-lg transition-all duration-1000 ease-in-out h-auto`}
    >
      <div className="flex gap-2 items-center p-5">
        <form
          className="w-full flex-1"
          autoComplete="off"
          onChange={handleSearch}
        >
          <div className="flex items-center justify-start gap-2">
            {search.length > 0 && data.length === 0 ? (
              <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
            ) : (
              <SearchIcon className="w-6 h-6 text-gray-400" />
            )}
            <input
              name="search"
              ref={inputRef}
              type="text"
              placeholder="Searching is easier"
              className="text-gray-700 w-full font-normal text-lg focus:outline-none"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </form>
        <div className="relative hidden sm:block flex-[0.35] xl:flex-[0.25]">
          <div
            className={`transition-all duration-700 ease-in-out text-right ${
              search.length > 0 ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <button
              onClick={() => setSearch("")}
              className="font-[600] text-black underline underline-offset-2 text-md"
            >
              Clear
            </button>
          </div>
          <div
            className={`absolute top-0 left-0 transition-all duration-700 ease-in-out ${
              search.length > 0 ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
          >
            <div className="flex gap-2">
              <SButton />
              <span className="font-semibold text-gray-400">quick access</span>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`transition-all duration-1000 ease-in-out ${
          search.length > 0
            ? "max-h-screen opacity-100 mt-4"
            : "max-h-0 opacity-0 mt-0"
        }`}
      >
        <Results search={search} data={data} isLoading={isLoading} />
      </div>
    </div>
  );
}
