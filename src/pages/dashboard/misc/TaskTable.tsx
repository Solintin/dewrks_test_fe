import { DataTable } from "@/components/composables/DataTable";
import { useGetAllTasks, useDeleteTask } from "./mutations";
import { Checkbox } from "@/components/ui/checkbox";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import ConfirmModal from "@/components/composables/ConfirmModal";
import Options from "@/components/ui/options";
import useControl from "@/hooks/useControl";
import { errorLogger } from "@/utils/helper";
import { useEffect, useState } from "react";
import SuccessfulModal from "@/components/composables/SuccessfulModal";
import { ITask } from "./mutations";
import moment from "moment"
import EditTaskModal from "./editTaskModal";
import ViewTaskModal from "./viewTaskModal";
import { useQueryParam } from "@/hooks/useQueryParam";
import Pagination from "./pagination";


const TaskListTable = () => {
    const { state: isOpen, setTrue: onOpen, setFalse: onClose } = useControl()
    const { state: isOpenEdit, setTrue: onOpenEdit, setFalse: onCloseEdit } = useControl()
    const { state: isOpenView, setTrue: onOpenView, setFalse: onCloseView } = useControl()
    const { state: isSuccessModalOpen, setTrue: openSuccessModal, setFalse: closeSuccessModal } = useControl()
    const { state: isSuccessModalOpenEdit, setTrue: openSuccessModalEdit, setFalse: closeSuccessModalEdit } = useControl()
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState("")
    const statusFilter = useQueryParam("filter") as string
    const { mutateAsync, isPending: isRemoving } = useDeleteTask()
    const { data, isPending } = useGetAllTasks({ status: filter, page: currentPage })

    const [TaskId, setTaskId] = useState("")
    const [task, setTask] = useState<ITask>()
    const pageSize = 10; // Number of tasks per page
    const totalPages = Math.ceil((data?.pagination?.totalRecords ?? 0) / pageSize);

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
            // refetch(); // Re-fetch tasks when page changes
        }
    };
    useEffect(() => {
        setFilter(statusFilter)
    }, [statusFilter])
    async function onRemoveTask() {
        try {
            await mutateAsync(TaskId, {
                onSuccess() {
                    onClose()
                    openSuccessModal()
                },
            })
        } catch (error) {
            errorLogger(error)
        }
    }
    const columns: ColumnDef<ITask>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    className="border-[#86929E]"
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    className="border-[#86929E]"
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },

        {
            accessorKey: "_id",
            header: "Task ID",
            cell: ({ row }) => <div> {`${row.original._id.substring(0, 8)}...`} </div>,
        },
        {
            accessorKey: "title",
            header: "title",
            cell: ({ row }) => <div> {`${row.original.title} `} </div>,
        },
        {
            accessorKey: "description",
            header: "Desc",
            cell: ({ row }) => <div> {`${row.original.description}`} </div>,
        },
        {
            accessorKey: "createdAt",
            header: "Created Date",
            cell: ({ row }) => <div> {moment(row.original.createdAt).format("LLL")} </div>
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => <Badge status={row.getValue("status")} />,
        },
        {
            id: "actions",
            cell: ({ row }) => {

                return <Options setTaskId={setTaskId} setTask={() => { setTask(row.original) }} id={row.original._id} onOpenEdit={onOpenEdit} onOpenView={onOpenView} openRemoveTask={onOpen} />
            },
        },
    ];



    return (
        <div>
            <DataTable isLoading={isPending} columns={columns} data={(data?.data ?? []) as ITask[]} />
            <div className="flex justify-end">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
            {isOpen && <ConfirmModal onCancel={onClose} isLoading={isRemoving} onProceed={onRemoveTask} />}
            {isSuccessModalOpen && <SuccessfulModal action={closeSuccessModal} body="Task removed successfully" title="Task Removed" />}
            {isSuccessModalOpenEdit && <SuccessfulModal action={closeSuccessModalEdit} body="Task updated successfully" title="Task Updated" />}
            {isOpenEdit && <EditTaskModal onClose={onCloseEdit} data={{ title: task?.title as string, description: task?.description as string, status: task?.status as string }} id={TaskId} openSuccessModal={openSuccessModalEdit} />}
            {isOpenView && <ViewTaskModal onClose={onCloseView} task={task as ITask} />}

        </div>
    );
};

export default TaskListTable;
