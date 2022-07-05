import { Outlet } from "react-router-dom";
// import Cookies from "js-cookie";
// import { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

function BlogFeaturesPage() {
    return (
        <div className="pt-3">
            <Sidebar />
            <Outlet />
        </div>
    );
}

export default BlogFeaturesPage;