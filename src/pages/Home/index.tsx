import banner from "../../assets/images/BANNER.jpg";
import RenderRows from "../../components/RenderRows";
import { secondRow } from "../../data/songs";
import SongList from "../../components/SongList";

const Home = () => {
    return (
        <div className="text-white md:pl-[370px] pl-5 px-5 py-5 flex flex-col w-full gap-5">
            <div className="w-full rounded-xl min-h-[calc(100vh-140px)] h-auto flex flex-col gap-5 bg-[#121212] px-5 md:py-5 pb-20 pt-5">
                <div
                    className="w-full relative bg-cover bg-center rounded-xl md:h-[200px] h-[100px] min-h-[100px]"
                    style={{ backgroundImage: `url(${banner})`, backgroundSize: 'cover' }}
                />
                <div className="w-full flex flex-col gap-8">
                   
                    <RenderRows
                        title="Đề Xuất Cho Bạn"
                        data={secondRow}
                    />
                    <div className="w-full flex flex-col">
                        <h1 className="text-xl font-bold mb-4">Danh sách bài hát</h1>
                        <SongList />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;