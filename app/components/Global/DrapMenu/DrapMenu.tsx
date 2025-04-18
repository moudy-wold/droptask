"use client";
import React, { Fragment, useContext, useState } from "react";
import { MyContext } from "@/app/context/myContext";
import Image from "next/image";
import DrapCard from "./DrapCard";

const widgetsData = [
  {
    id: 1,
    image: "/assets/58d223d66efde9ee66255a864775d6c9.png",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum ",
    title: "Average Age Chart",
    category: "Statistics",
  },
  {
    id: 2,
    image: "/assets/58d223d66efde9ee66255a864775d6c9.png",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum ",
    title: "Header Slider Widget",
    category: "Informative",
  },
  {
    id: 3,
    image: "/assets/58d223d66efde9ee66255a864775d6c9.png",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum ",
    title: "Quick Links Widget",
    category: "Informative",
  },
  {
    id: 4,
    image: "/assets/58d223d66efde9ee66255a864775d6c9.png",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum ",
    title: "Bubble Chart",
    category: "Statistics",
  },
   
];

const filters = ["All", "Informative", "Statistics"];

export default function SidebarWidgetPanel() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const { open_drap_menu, set_open_drap_menu,set_open_sidebar } = useContext(MyContext);
  const filteredWidgets = widgetsData.filter((widget) => {
    const matchesFilter =
      activeFilter === "All" || widget.category === activeFilter;
    const matchesSearch = widget.title
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });
 
  return (
    <div
      className={`${
        open_drap_menu ? " right-0" : " -right-[240px]"
      } fixed z-50 top-[55px] w-[240px] transition-all duration-200 bg-white  border-[#27336963] h-full border-l-[3px] py-[13px] pl-[15px] pr-2 flex flex-col`}
    >
      {/* Start Title And Close */}
      <div className="flex justify-between items-center mb-1">
        <h2 className="text font-semibold">Add widget</h2>
        <button
          className="text-xl text-[#7A85B7] cursor-pointer"
          onClick={() => {
            set_open_drap_menu((prev: boolean) => !prev);
            set_open_sidebar((prev: boolean) => !prev);

          }}
        >
          ✕
        </button>
      </div>
      {/* End Title And Close */}

      {/* Start Search */}
      <div className="flex items-center gap-[7px] border-2 border-[#A6B3D5] px-2 py-[5px] my-3 rounded-lg ">
        <Image
          src="/assets/search.svg"
          alt="search"
          width={12}
          height={12}
          className=""
        />
        <input
          type="text"
          placeholder="Search"
          className="  placeholder:text-[#A6B3D5] w-full text-sm outline-0"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {/* End Search */}

      <div className="flex flex-wrap gap-2 mb-[20px]">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-1 cursor-pointer  text-[9px] rounded-[4px] border bg-[#EEEEEE] text-gray-600 hover:bg-blue-100 transition ${
              activeFilter === filter
                ? "bg-blue-100 border-blue-400"
                : "border-gray-300"
            }`}
          >
            {filter} Widgets
          </button>
        ))}
      </div>
      {/* Start Cards */}
      <div className=" custom-scroll pr-[10px] flex-1">
        {filteredWidgets.map((widget) => (
         <div key={widget.id}>
          <DrapCard widget={widget} drap={true}/>
         </div>
        ))}
      </div>
      {/* End Cards */}
    </div>
  );
}
