import React from "react";
import Catalog from "../Catalog"; 

const DanhMuc = () => {
    return (
        <div className="text-white md:pl-[370px] pl-5 px-5 py-5 flex flex-col w-full gap-5">
            <div className="w-full rounded-xl min-h-[calc(100vh-140px)] h-auto flex flex-col gap-5 bg-[#121212] px-5 md:py-5 pb-20 pt-5">
                <div className="w-full flex flex-col gap-8">
                    <div className="w-full flex flex-col">
                        <h1 className="text-2xl font-bold mt-[40px] text-white">Danh mục bài hát</h1>
                        <ul className="list-disc pl-5 mb-4">
                        
                        </ul>
                        <Catalog /> 
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DanhMuc;