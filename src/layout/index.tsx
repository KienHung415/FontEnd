import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const Layout = () => {
	return (
		<div className="w-full h-full text-white relative">
			<Sidebar />
			<Navbar />
			<Outlet />
		</div>
	);
};

export default Layout;
