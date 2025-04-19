"use client";
import { MyContext } from "@/app/context/myContext";
import Image from "next/image";
import React, { useContext, useState } from "react";
import SidebarWidgetPanel from "../../Global/DrapMenu/DrapMenu";
import GridLayout, { Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import DrapCard from "../../Global/DrapMenu/DrapCard";
import Modal from "../../Global/Modal/Modal";
 
type GridItem = {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
};
  
type widget={
  id: number,
  image: string,
  description: string,
  title: string,
  category: string,
}

type ItemType = {
  id: number;
  image: string;
  description: string;
  title: string;
  category: string;
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  widget :widget,
};
function PageContent() {
  const {
    open_drap_menu,
    set_open_drap_menu,
    set_open_sidebar,
    start_drap,
    set_start_drap,
  } = useContext(MyContext);
  const [layout, setLayout] = useState<Layout[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [items, setItems] = useState<any>([]);
  const [open_delete_widget, set_open_delete_widget] = useState(false);
  const [selected_id, set_selected_id] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDrop = (layout: any, layoutItem: any, _event: any) => {
    const widgetData = JSON.parse(_event.dataTransfer.getData("widget"));
    const newItem = {
      i: widgetData.id.toString() + Date.now(),  
      x: layoutItem.x,
      y: layoutItem.y,
      w: 3,
      h: 3,
      widget: widgetData,
    };

    setLayout([...layout, newItem]);
    setItems([...items, newItem]);
  };
  const handleRemoveItem = () => {
    setItems((prevItems: ItemType[]) =>
      prevItems.filter((item) => item.i !== selected_id)
    );
    set_open_delete_widget(false);
  };

  const handleDuplicateItem = (itemToCopy: ItemType) => {
    const newId = Date.now().toString();
  
    const newItem: ItemType = {
      ...itemToCopy,
      i: newId,
      x: itemToCopy.x + 1,
      y: itemToCopy.y + 1,
    };
  
    const newLayoutItem: GridItem = {
      i: newId,
      x: itemToCopy.x + 1,
      y: itemToCopy.y + 1,
      w: itemToCopy.w,
      h: itemToCopy.h,
    };
  
    setItems((prev: ItemType[]) => [...prev, newItem]);
    setLayout((prev: GridItem[]) => [...prev, newLayoutItem]);
  };
  return (
    <div className="relative overflow-hidden ">
      <div
        className={`fixed z-50 bottom-10 transition-all duration-200  ${
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
        className={`layout mx-10   ${
          start_drap ? "min-h-[85vh] border-[1px] border-[#CBCBCB]" : "h-fit"
        }  p-2`}
        layout={layout}
        cols={16}
        rowHeight={30}
        width={1500}
        droppingItem={{ i: "dropping", w: 3, h: 4 }}
        compactType={null}
        verticalCompact={false}
        isDroppable={true}
        onDrop={handleDrop}
        onDragStart={() => {
          set_open_sidebar(false);
          set_start_drap(true);
        }}
        onDragStop={() => {
          set_start_drap(false);
          set_open_sidebar(true);
        }}
        preventCollision={true}
      >
        {items.map((item: ItemType) => (
            <div
              style={{
                minWidth: `${(1500 / 30) * item.w + 70}px`,
                minHeight: `${item.h * 30}px`,
              }}
              key={item.i}
              className="relative p-2 rounded h-full"
            >
              {/* Start Icons */}
              <div
                className={`absolute top-1 right-0 flex flex-col items-center gap-[6px] `}
              >
                {/* Start Copy icon */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDuplicateItem(item);
                  }}
                  className="z-50 cursor-pointer border-[1px] hover:[&>svg>path]:stroke-white border-[#F7A603] rounded-full p-1 flex items-center justify-center  bg-white hover:bg-[#F7A603]  transition-all duration-400 "
                >
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
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11.75 9V10.2C11.75 10.83 11.75 11.145 11.6278 11.3857C11.5199 11.5976 11.3476 11.7699 11.1358 11.8777C10.8958 12 10.5808 12 9.95 12H3.05C2.42 12 2.105 12 1.86425 11.8777C1.65238 11.7699 1.48014 11.5976 1.37225 11.3857C1.25 11.1457 1.25 10.8308 1.25 10.2V4.8C1.25 4.17 1.25 3.855 1.37225 3.61425C1.48014 3.40238 1.65238 3.23014 1.86425 3.12225C2.10425 3 2.41925 3 3.05 3H4.25"
                      stroke="#F7A603"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                {/*  End Copy icon*/}

                {/* Start Delete icon */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    set_selected_id(item.i);
                    set_open_delete_widget(true);
                  }}
                  className=" cursor-pointer border-[1px] hover:[&>svg>path]:fill-white border-[#EB8063] rounded-full p-1 flex items-center justify-center  bg-white hover:bg-[#EB8063]  transition-all duration-400 "
                >
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
                </button>
                {/*  End Delete icon*/}
              </div>
              {/* End Icons */}
              <div
                style={{
                  minWidth: `${(1500 / 30) * item.w + 70}px`,
                  minHeight: `${item.h * 30}px`,
                }}
              >
                <DrapCard widget={item.widget} drap={false} />
              </div>
            </div>
          )
         )}
      </GridLayout>
      {/* Start Delete Modal */}
      <Modal
        isOpen={open_delete_widget}
        onClose={() => set_open_delete_widget(false)}
      >
        <div className="p-2 ">
          <p className="">Are you sure you want to delete the Widget?</p>
          <div className=" mt-7 flex items-center justify-between">
            <button
              className=" w-[48%] border-2 border-gray-300 p-2 px-3 rounded-lg cursor-pointer  text-white font-medium hover:text-red-500 bg-red-500 hover:bg-white  translation-all duration-400"
              onClick={() => {
                handleRemoveItem();
              }}
            >
              Confirme
            </button>
            <button
              className="  w-[48%] border-2 border-gray-300 p-2 px-3 rounded-lg cursor-pointer font-medium hover:text-white  hover:bg-[#27336963]  translation-all duration-400"
              onClick={() => {
                set_open_delete_widget(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
      {/* End Delete Modal */}
    </div>
  );
}

export default PageContent;
