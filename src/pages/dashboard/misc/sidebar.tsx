// frontend/src/components/Sidebar.tsx
import { Button } from "@/components/ui/button";
import { useAdminDetail } from "@/hooks/useAdminDetail";
import { useToken } from "@/hooks/useToken";
import { LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
    const { removeAdminLogin } = useAdminDetail()
    const { removeToken } = useToken()
    const navigate = useNavigate()
    return (
        <div className="w-64 h-screen bg-primary-100 text-white p-4 flex flex-col justify-between">
            <div>
                <h2 className="text-xl font-bold">Task Manager</h2>
                <nav className="mt-4 space-y-2">
                    <Link to="/dashboard" className="block p-2 hover:bg-gray-700 rounded">All Tasks</Link>
                    <Link to="/dashboard?filter=pending" className="block p-2 hover:bg-gray-700 rounded">Pending</Link>
                    <Link to="/dashboard?filter=in-progress" className="block p-2 hover:bg-gray-700 rounded">In Progress</Link>
                    <Link to="/dashboard?filter=completed" className="block p-2 hover:bg-gray-700 rounded">Completed</Link>
                </nav>
            </div>
            <div>
                <Button
                    onClick={() => {
                        removeToken();
                        removeAdminLogin();
                        navigate("/login/");
                    }}
                    className="justify-start border-none bg-transparent px-4 text-red-500 shadow-none hover:bg-transparent"
                >
                    <LogOut />
                    <span>Log Out</span>
                </Button>
            </div>
        </div>
    );
}