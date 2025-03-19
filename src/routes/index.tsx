import { RouteObject } from "react-router-dom";
import Layout from "../layout";
import Home from "../pages/Home";
import DanhMuc from "../components/DanhMuc"; // Import DanhMuc component

const routes: RouteObject[] = [
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "", element: <Home /> },
            { path: "danh-muc", element: <DanhMuc /> }, // Add route for DanhMuc
        ],
    },
];

export default routes;