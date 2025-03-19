import {
    AddCircleOutline,
    HeartOutline,
    HomeOutline,
    LibraryOutline,
} from "react-ionicons";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Sidebar = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    const sidebarItems = [
        { title: "Trang chủ", icon: <HomeOutline color={"#b3b3b3"} />, path: "/" }, // Add path for home
        { title: "Thư viện", icon: <LibraryOutline color={"#b3b3b3"} /> },
        { title: "Bài hát yêu thích", icon: <HeartOutline color={"#b3b3b3"} /> },
        { title: "Danh mục", icon: <LibraryOutline color={"#b3b3b3"} />, path: "/danh-muc" }, // Add new item
    ];

    const handleAddPlaylist = () => {
        alert("Playlist created and songs saved!");
    };

    const handleNavigate = (path: string) => {
        navigate(path);
    };

    return (
        <div className="md:h-screen h-fit md:w-[350px] w-full bg-[#121212] md:fixed block md:left-0 top-0 p-5 z-30">
            <div className="w-full flex flex-col gap-7 md:px-0 px-3">
                {sidebarItems.map((item) => {
                    return (
                        <div
                            key={item.title}
                            className="flex items-center gap-3 cursor-pointer"
                            onClick={() => item.path && handleNavigate(item.path)} // Add onClick handler
                        >
                            {item.icon}
                            <span className="font-medium text-[#b3b3b3] text-[14.5px]">{item.title}</span>
                        </div>
                    );
                })}
            </div>
            <hr className="border-[#b3b3b3] my-7 opacity-30" />
            <div className="w-full flex flex-col gap-7 md:px-0 px-3">
                <div className="w-full flex items-center justify-between">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={handleAddPlaylist}>
                        <AddCircleOutline color={"#b3b3b3"} />
                        <span className="font-medium text-[#b3b3b3] text-[14px]">Tạo playlist mới</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;