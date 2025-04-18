"use client";
import { MyContext } from "@/app/context/myContext";
import Image from "next/image";
import React, { useContext, useState } from "react";
import SidebarWidgetPanel from "../../Global/DrapMenu/DrapMenu";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import DrapCard from "../../Global/DrapMenu/DrapCard";

function PageContent() {
  const { open_drap_menu, set_open_drap_menu, set_open_sidebar } =
    useContext(MyContext);
  const [layout, setLayout] = useState<any>([]);
  const [items, setItems] = useState<any>([]);

  const handleDrop = (layout: any, layoutItem: any, _event: any) => {
    const widgetData = JSON.parse(_event.dataTransfer.getData("widget"));
    const newItem = {
      i: widgetData.id.toString() + Date.now(), // unique id
      x: layoutItem.x,
      y: layoutItem.y,
      w: 3,
      h: 4,
      widget: widgetData,
    };

    setLayout([...layout, newItem]);
    setItems([...items, newItem]);
  };

  return (
    <div className="relative overflow-hidden ">
      <div
        className={`fixed bottom-10 transition-all duration-200  ${
          open_drap_menu ? "right-[257px]" : "right-[17px]"
        }   flex items-center transition `}
      >
        <button
          className="p-[11px] block bg-[#F6A603] rounded-lg border-0 outline-0 hover:scale-115 hover:-translate-y-2 cursor-pointer transition-all duration-400"
          onClick={() => {
            set_open_drap_menu((prev: boolean) => !prev);
            set_open_sidebar((prev: boolean) => !prev);
          }}
        >
          <Image
            src="/assets/arrow.svg"
            alt="arrow"
            width={18}
            height={18}
            className=""
          />
        </button>
      </div>
      <SidebarWidgetPanel />

      <GridLayout
        className="layout min-h-[50vh] bg-red-50 p-2"
        layout={layout}
        cols={16}
        rowHeight={30}
        width={1500}  droppingItem={{ i: "dropping", w: 3, h: 4 }}

        compactType={null}
        verticalCompact={false}
        isDroppable={true}
        onDrop={handleDrop}
        preventCollision={true}
      >
        {items.map((item: any) => {
          return (
            <div key={item.i} className=" p-2 rounded">
              <div
                key={item.widget.id}
                className={`flex items-center justify-center h-full gap-[7px] border-2 bg-white border-[#E8E8E8] rounded py-2 px-[6px]    `}
              >
                <div
                  className={`absolute top-1 right-0 flex flex-col items-center gap-[6px] `}
                >
                  {/* Start edit icon */}
                  <div className=" cursor-pointer border-[1px] hover:[&>svg>path]:stroke-white border-[#5E79C1] rounded-full p-1 flex items-center justify-center  bg-white hover:bg-[#5E79C1]  transition-all duration-400 ">
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 15 15"
                      fill="none"
                      className=""
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.324 2.83512L12.5818 5.09295M4.54167 4.54195H2.16667C1.9567 4.54195 1.75534 4.62536 1.60687 4.77383C1.45841 4.92229 1.375 5.12366 1.375 5.33362V13.2503C1.375 13.4603 1.45841 13.6616 1.60687 13.8101C1.75534 13.9585 1.9567 14.042 2.16667 14.042H10.875C11.085 14.042 11.2863 13.9585 11.4348 13.8101C11.5833 13.6616 11.6667 13.4603 11.6667 13.2503V9.68779M13.5738 1.84237C13.7221 1.99065 13.8398 2.16671 13.9201 2.36048C14.0004 2.55425 14.0417 2.76194 14.0417 2.97168C14.0417 3.18143 14.0004 3.38911 13.9201 3.58288C13.8398 3.77666 13.7221 3.95271 13.5738 4.10099L8.15562 9.51916L5.33333 10.0836L5.89779 7.26133L11.316 1.84316C11.4641 1.69475 11.6401 1.57701 11.8338 1.49668C12.0275 1.41635 12.2352 1.375 12.4449 1.375C12.6546 1.375 12.8622 1.41635 13.0559 1.49668C13.2497 1.57701 13.4256 1.69475 13.5738 1.84316V1.84237Z"
                        stroke={`#5E79C1`}
                        className="transition-all duration-400"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  {/*  End edit icon*/}

                  {/* Start Copy icon */}
                  <div className=" cursor-pointer border-[1px] hover:[&>svg>path]:stroke-white border-[#F7A603] rounded-full p-1 flex items-center justify-center  bg-white hover:bg-[#F7A603]  transition-all duration-400 ">
                    <svg
                      width="15"
                      height="13"
                      viewBox="0 0 15 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.587 3.24C9.62218 3.28223 9.66621 3.31622 9.71598 3.33955C9.76575 3.36288 9.82003 3.37498 9.875 3.375H11.6C12.026 3.375 12.3237 3.375 12.5547 3.3945C12.7812 3.4125 12.9117 3.447 13.0107 3.49725C13.2226 3.60514 13.3949 3.77738 13.5027 3.98925C13.553 4.08825 13.5875 4.21875 13.6055 4.44525C13.625 4.677 13.625 4.974 13.625 5.4V7.35C13.625 7.776 13.625 8.073 13.6055 8.30475C13.5875 8.532 13.553 8.66175 13.5027 8.76075C13.3949 8.97262 13.2226 9.14486 13.0107 9.25275C12.9117 9.303 12.7812 9.3375 12.5547 9.3555C12.3237 9.375 12.026 9.375 11.6 9.375H5.9C5.474 9.375 5.177 9.375 4.94525 9.3555C4.71875 9.3375 4.58825 9.303 4.48925 9.25275C4.27738 9.14486 4.10514 8.97262 3.99725 8.76075C3.947 8.66175 3.9125 8.532 3.8945 8.30475C3.875 8.073 3.875 7.776 3.875 7.35V3.15C3.875 2.724 3.875 2.427 3.8945 2.19525C3.9125 1.96875 3.947 1.83825 3.99725 1.73925C4.10514 1.52738 4.27738 1.35514 4.48925 1.24725C4.58825 1.197 4.71875 1.1625 4.94525 1.1445C5.177 1.125 5.474 1.125 5.9 1.125H6.87575C7.30925 1.125 7.457 1.128 7.58975 1.164C7.71775 1.198 7.83625 1.25325 7.94525 1.32975C8.057 1.40925 8.15375 1.52025 8.43125 1.854L9.587 3.24Z"
                        stroke="#F7A603"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M11.75 9V10.2C11.75 10.83 11.75 11.145 11.6278 11.3857C11.5199 11.5976 11.3476 11.7699 11.1358 11.8777C10.8958 12 10.5808 12 9.95 12H3.05C2.42 12 2.105 12 1.86425 11.8777C1.65238 11.7699 1.48014 11.5976 1.37225 11.3857C1.25 11.1457 1.25 10.8308 1.25 10.2V4.8C1.25 4.17 1.25 3.855 1.37225 3.61425C1.48014 3.40238 1.65238 3.23014 1.86425 3.12225C2.10425 3 2.41925 3 3.05 3H4.25"
                        stroke="#F7A603"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  {/*  End Copy icon*/}

                  {/* Start Delete icon */}
                  <div className=" cursor-pointer border-[1px] hover:[&>svg>path]:fill-white border-[#EB8063] rounded-full p-1 flex items-center justify-center  bg-white hover:bg-[#EB8063]  transition-all duration-400 ">
                    <svg
                      width="12"
                      height="14"
                      viewBox="0 0 12 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.25 13.75C1.8375 13.75 1.4845 13.6033 1.191 13.3097C0.897502 13.0162 0.750503 12.663 0.750003 12.25V2.5C0.537503 2.5 0.359503 2.428 0.216003 2.284C0.0725027 2.14 0.000502586 1.962 2.5862e-06 1.75C-0.000497414 1.538 0.0715027 1.36 0.216003 1.216C0.360503 1.072 0.538503 1 0.750003 1H3.75C3.75 0.7875 3.822 0.6095 3.966 0.466C4.11 0.3225 4.288 0.2505 4.5 0.25H7.5C7.7125 0.25 7.89075 0.322 8.03475 0.466C8.17875 0.61 8.2505 0.788 8.25 1H11.25C11.4625 1 11.6408 1.072 11.7848 1.216C11.9288 1.36 12.0005 1.538 12 1.75C11.9995 1.962 11.9275 2.14025 11.784 2.28475C11.6405 2.42925 11.4625 2.501 11.25 2.5V12.25C11.25 12.6625 11.1033 13.0157 10.8098 13.3097C10.5163 13.6038 10.163 13.7505 9.75 13.75H2.25ZM9.75 2.5H2.25V12.25H9.75V2.5ZM4.5 10.75C4.7125 10.75 4.89075 10.678 5.03475 10.534C5.17875 10.39 5.2505 10.212 5.25 10V4.75C5.25 4.5375 5.178 4.3595 5.034 4.216C4.89 4.0725 4.712 4.0005 4.5 4C4.288 3.9995 4.11 4.0715 3.966 4.216C3.822 4.3605 3.75 4.5385 3.75 4.75V10C3.75 10.2125 3.822 10.3907 3.966 10.5347C4.11 10.6787 4.288 10.7505 4.5 10.75ZM7.5 10.75C7.7125 10.75 7.89075 10.678 8.03475 10.534C8.17875 10.39 8.2505 10.212 8.25 10V4.75C8.25 4.5375 8.178 4.3595 8.034 4.216C7.89 4.0725 7.712 4.0005 7.5 4C7.288 3.9995 7.11 4.0715 6.966 4.216C6.822 4.3605 6.75 4.5385 6.75 4.75V10C6.75 10.2125 6.822 10.3907 6.966 10.5347C7.11 10.6787 7.288 10.7505 7.5 10.75Z"
                        fill="#EB8063"
                      />
                    </svg>
                  </div>
                  {/*  End Delete icon*/}

                  {/* Start Hide icon */}
                  <div className=" cursor-pointer border-[1px] hover:[&>svg>path]:fill-white border-[#7E849E] rounded-full p-1 flex items-center justify-center  bg-white hover:bg-[#7E849E]  transition-all duration-400 ">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.99956 13.25C8.70906 13.25 9.35706 13.1727 9.94806 13.0392L8.63031 11.7215C8.42556 11.7372 8.21781 11.75 7.99956 11.75C3.98631 11.75 2.43156 8.86548 2.05506 7.99998C2.33729 7.36882 2.71916 6.78715 3.18606 6.27723L2.13756 5.22873C0.984056 6.47898 0.546806 7.73823 0.538556 7.76298C0.487148 7.91705 0.487148 8.08365 0.538556 8.23773C0.554306 8.28723 2.27481 13.25 7.99956 13.25ZM7.99956 2.74998C6.62181 2.74998 5.49006 3.04698 4.54656 3.48573L1.77981 0.719727L0.719306 1.78023L14.2193 15.2802L15.2798 14.2197L12.7906 11.7305C14.7511 10.2672 15.4508 8.26923 15.4613 8.23773C15.5127 8.08365 15.5127 7.91705 15.4613 7.76298C15.4448 7.71273 13.7243 2.74998 7.99956 2.74998ZM11.7286 10.6685L10.0186 8.95848C10.1611 8.66598 10.2496 8.34423 10.2496 7.99998C10.2496 6.76923 9.23031 5.74998 7.99956 5.74998C7.65531 5.74998 7.33356 5.83848 7.04181 5.98173L5.68581 4.62573C6.43034 4.37085 7.21263 4.24381 7.99956 4.24998C12.0128 4.24998 13.5676 7.13448 13.9441 7.99998C13.7176 8.51898 13.0696 9.75648 11.7286 10.6685Z" fill="#7E849E"/>
</svg>

                  </div>
                  {/*  End Hide icon*/}
                </div>
                {/* Start Image  */}
                <div>
                  <Image
                    src={item.widget.image}
                    alt={item.widget.title}
                    width={75}
                    height={50}
                    className="rounded w-full h-full"
                  />
                </div>
                {/* End Image  */}
                <div className="flex flex-col gap-1">
                  {/* Start Title */}
                  <h3 className="text-[10px] font-bold text-gray-800">
                    {item.widget.title}
                  </h3>
                  {/* End Title */}
                  {/* Start Description */}
                  <div>
                    <p className="text-[7px] line-clamp-2 break-words text-[#273369] w-[102px] ">
                      {item.widget.description}
                    </p>
                  </div>
                  {/* End Description */}
                  {/* Start Category */}
                  <span className="text-[7px] w-fit p-[2px] text-[#707691] bg-[#EEEEEE] rounded-[4px] ">
                    {item.widget.category} Widgets
                  </span>
                  {/* End Category */}
                </div>
              </div>
            </div>
          );
        })}
      </GridLayout>
    </div>
  );
}

export default PageContent;

// "use client";
// import { MyContext } from "@/app/context/myContext";
// import Image from "next/image";
// import React, { useContext, useState } from "react";
// import SidebarWidgetPanel from "../../Global/DrapMenu/DrapMenu";

// import {
//   DndContext,
//   closestCenter,
//   useDraggable,
//   useDroppable,
// } from "@dnd-kit/core";

// function PageContent() {
//   const { open_drap_menu, set_open_drap_menu, set_open_sidebar } =
//     useContext(MyContext);
//   const [layout, setLayout] = useState<any>([]);
//   const [items, setItems] = useState<any>([]);

//   const handleDragEnd = (event: any) => {
//     const { active, over } = event;

//     if (over) {
//       console.log(active.data)
//       const widgetData = active.data.current?.widget;

//       const newItem = {
//         i: over.id,
//         widget: widgetData,
//       };

//       setItems((prev: any[]) => {
//         const filtered = prev.filter((i) => i.i !== over.id); // لو في عنصر قديم بنفس المكان
//         return [...filtered, newItem];
//       });
//     }
//   };
//   return (
//     <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
//       <div className="relative overflow-hidden ">
//         <div
//           className={`fixed bottom-10 transition-all duration-200  ${
//             open_drap_menu ? "right-[257px]" : "right-[17px]"
//           }   flex items-center transition `}
//         >
//           <button
//             className="p-[11px] block bg-[#F6A603] rounded-lg border-0 outline-0 hover:scale-115 hover:-translate-y-2 cursor-pointer transition-all duration-400"
//             onClick={() => {
//               set_open_drap_menu((prev: boolean) => !prev);
//               set_open_sidebar((prev: boolean) => !prev);
//             }}
//           >
//             <Image
//               src="/assets/arrow.svg"
//               alt="arrow"
//               width={18}
//               height={18}
//               className=""
//             />
//           </button>
//         </div>
//         <SidebarWidgetPanel />

//         <div className="grid grid-cols-16 gap-2 min-h-[50vh] bg-red-50 p-2">
//           {Array.from({ length: 50 }).map((_, idx) => {
//             const currentItem = items.find(
//               (item: any) => item.i === `cell-${idx}`
//             );

//             return (
//               <DroppableCell key={idx} id={`cell-${idx}`} item={currentItem} />
//             );
//           })}
//         </div>
//       </div>
//     </DndContext>
//   );
// }

// export default PageContent;
// const DroppableCell = ({ id, item }: any) => {
//   const { setNodeRef, isOver } = useDroppable({ id });

//   return (
//     <div
//       ref={setNodeRef}
//       className={`w-[90px] h-[90px] border border-gray-300 rounded-md transition
//         ${isOver ? "bg-gray-300" : ""}
//         ${item ? "bg-red-300" : ""}
//       `}
//     >
//       {item && (
//         <div key={item.i} className="bg-blue-100 p-2 rounded">
//           <div
//             key={item.widget.id}
//             onDragStart={(e) => {
//               e.dataTransfer.setData("widget", JSON.stringify(item.widget));
//             }}
//             className={`flex items-center gap-[7px] border-2 bg-white border-[#E8E8E8] rounded py-2 px-[6px] mb-3  transition-all duration-400 cursor-pointer`}
//           >
//             {/* Start Image  */}
//             <div>
//               <Image
//                 src={item.widget.image}
//                 alt={item.widget.title}
//                 width={75}
//                 height={50}
//                 className="rounded w-[75px] h-[50px]"
//               />
//             </div>
//             {/* End Image  */}
//             <div className="flex flex-col gap-1">
//               {/* Start Title */}
//               <h3 className="text-[10px] font-bold text-gray-800">
//                 {item.widget.title}
//               </h3>
//               {/* End Title */}
//               {/* Start Description */}
//               <div>
//                 <p className="text-[7px] line-clamp-2 break-words text-[#273369] w-[102px] ">
//                   {item.widget.description}
//                 </p>
//               </div>
//               {/* End Description */}
//               {/* Start Category */}
//               <span className="text-[7px] w-fit p-[2px] text-[#707691] bg-[#EEEEEE] rounded-[4px] ">
//                 {item.widget.category} Widgets
//               </span>
//               {/* End Category */}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
