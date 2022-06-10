import Sidebar from "../components/Sidebar";

function MainLayout({ children }) {
    return (
        <div>
            <Sidebar />
            {children}
        </div>
    );
}

export default MainLayout;