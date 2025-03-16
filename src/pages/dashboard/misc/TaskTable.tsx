import { DataTable } from "@/components/composables/DataTable";
import { useGetAllTasks, useDeleteTask } from "./mutations";
import { Checkbox } from "@/components/ui/checkbox";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import ConfirmModal from "@/components/composables/ConfirmModal";
import Options from "@/components/ui/options";
import useControl from "@/hooks/useControl";
import { errorLogger } from "@/utils/helper";
import { useState } from "react";
import SuccessfulModal from "@/components/composables/SuccessfulModal";
import { ITask } from "./mutations";
import moment from "moment"
import EditTaskModal from "./editTaskModal";


const TaskListTable = () => {
    const { state: isOpen, setTrue: onOpen, setFalse: onClose } = useControl()
    const { state: isOpenEdit, setTrue: onOpenEdit, setFalse: onCloseEdit } = useControl()
    // const { state: isOpenView, setTrue: onOpenView, setFalse: onCloseView } = useControl()
    const { state: isSuccessModalOpen, setTrue: openSuccessModal, setFalse: closeSuccessModal } = useControl()
    const { mutateAsync, isPending: isRemoving } = useDeleteTask()
    const [TaskId, setTaskId] = useState("")
    const [task, setTask] = useState<ITask>()
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

                return <Options setTaskId={setTaskId} setTask={() => { setTask(row.original) }} id={row.original._id} onOpenEdit={onOpenEdit} openRemoveTask={onOpen} />
            },
        },
    ];

    const { data, isPending } = useGetAllTasks()


    return (
        <div>
            <DataTable isLoading={isPending} columns={columns} data={(data?.data ?? []) as ITask[]} />
            {isOpen && <ConfirmModal onCancel={onClose} isLoading={isRemoving} onProceed={onRemoveTask} />}
            {isSuccessModalOpen && <SuccessfulModal action={closeSuccessModal} body="Task removed successfully" title="Task removed" />}
            {isOpenEdit && <EditTaskModal onClose={onCloseEdit} data={{ title: task?.title as string, description: task?.description as string, status: task?.status as string }} id={TaskId} openSuccessModal={openSuccessModal} />}
            {/* {isOpenView && <AddTaskModal onClose={onCloseView} />} */}

        </div>
    );
};

export default TaskListTable;
