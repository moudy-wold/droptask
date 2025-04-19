"use client";
import React, { useContext } from "react";
import Image from "next/image";
import { MyContext } from "@/app/context/myContext";
type Props ={
  widget:{
    id: number,
    image: string,
    description: string,
    title: string,
    category: string,
  },
  drap:boolean
}
function DrapCard({ widget, drap }: Props) {
  const { set_start_drap } = useContext(MyContext);
  
  const handleDragStart =(e: React.DragEvent<HTMLDivElement>) => {
    set_start_drap(true);
    e.dataTransfer.setData("widget", JSON.stringify(widget));
  };
  return (
    <div 
      key={widget.id}
      draggable={drap ? true : false}
      onDragStart={handleDragStart}
      onDragEnd={() => {
        set_start_drap(false);
      }}
      className={`flex items-center  justify-center h-full gap-[7px] border-2 bg-white border-[#E8E8E8] rounded py-2 px-[6px] mb-3 ${
        drap && "hover:scale-[1.01] hover:shadow-2xl z-50  transition-all duration-400 cursor-pointer"
      }`}
    >
      {/* Start Image  */}
      <div>
        <Image
          src={widget.image}
          alt={widget.title}
          width={75}
          height={50}
          className="rounded w-[75px] h-[50px]"
        />
      </div>
      {/* End Image  */}
      <div className="flex flex-col gap-1">
        {/* Start Title */}
        <h3 className="text-[10px] font-bold text-gray-800">{widget.title}</h3>
        {/* End Title */}
        {/* Start Description */}
        <div>
          <p className="text-[7px] line-clamp-2 break-words text-[#273369] w-[102px] ">
            {widget.description}
          </p>
        </div>
        {/* End Description */}
        {/* Start Category */}
        <span className="text-[7px] w-fit p-[2px] text-[#707691] bg-[#EEEEEE] rounded-[4px] ">
          {widget.category} Widgets
        </span>
        {/* End Category */}
      </div>
    </div>
  );
}

export default DrapCard;
