import coverImage from "../assets/images/BacBling.png";
import coverImage2 from "../assets/images/DuChoTanThe.png";
import coverImage3 from "../assets/images/NoiNayCoAnh.png";
import coverImage4 from "../assets/images/ExitSign.png";
import coverImage5 from "../assets/images/EmGaiMua.png";
import axios from 'axios';

export const firstRow = [
	
];

export const secondRow = [
	{ title: "BẮC BLING (BẮC NINH)", singer: "HOÀ MINZY ", cover: coverImage },
	{ title: "Dù cho tận thế (vẫn yêu em)", singer: "ERIK", cover: coverImage2 },
	{ title: "Nơi Này Có Anh", singer: "Sơn Tùng - MTP", cover: coverImage3 },
	{ title: "Exit Sign", singer: "Hiếu Thứ Hai", cover: coverImage4 },
	{ title: "Em Gái Mưa", singer: "Hương Tràm", cover: coverImage5 },
];

export const fetchSongs = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/songs');
        return response.data;
    } catch (error) {
        console.error('Có lỗi xảy ra khi lấy dữ liệu bài hát!', error);
        return [];
    }
};

