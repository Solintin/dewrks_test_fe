
import { Card, CardContent } from "@/components/ui/card";
import Topbar from "./misc/topbar";
import TaskListTable from "./misc/TaskTable";
import AddTaskModal from "./misc/addTaskModal";
import useControl from "@/hooks/useControl";
import { Button } from "@/components/ui/button";
import SuccessfulModal from "@/components/composables/SuccessfulModal";
import Sidebar from "./misc/sidebar";
import { useAdminDetail } from "@/hooks/useAdminDetail";

export default function DashboardPage(): JSX.Element {
    const { state: isOpenAdd, setTrue: onOpenAdd, setFalse: onCloseAdd } = useControl()
    const { state: isSuccessModalOpen, setTrue: openSuccessModal, setFalse: closeSuccessModal } = useControl()

    const { adminLogin } = useAdminDetail()



    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex flex-col flex-grow">
                <Topbar />
                <div className="p-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl">Welcome, {adminLogin?.name}</h1>
                        <Button onClick={() => onOpenAdd()}>Add Task</Button>

                    </div>
                    <div className="grid grid-cols-3 gap-4 my-4">
                        {/* {["pending", "in-progress", "completed"].map((status) => (
                            <Card key={status}>
                                <CardContent>
                                    <h2 className="text-lg font-bold">{status.toUpperCase()}</h2>
                                    <p>{(taskList ?? []).filter((task) => task.status === status).length} tasks</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div> */}



                    </div>
                    <TaskListTable />
                    {isOpenAdd && <AddTaskModal onClose={onCloseAdd} openSuccessModal={openSuccessModal} />}
                    {isSuccessModalOpen && <SuccessfulModal action={closeSuccessModal} body="Task added successfully" title="Task added" />}

                </div>
            </div>
        </div>
    );
}

