import { Avatar } from "@/components/ui/avatar";


export default function Topbar() {
    const userEmail = "user@example.com";

    return (
        <div className="flex justify-between items-center bg-gray-100 p-4 shadow">
            <h1 className="text-xl font-bold">Task Management</h1>
            <div className="flex items-center space-x-4">
                <span>{userEmail}</span>
                <Avatar className="w-8 h-8 bg-gray-400" />
            </div>
        </div>
    );
}