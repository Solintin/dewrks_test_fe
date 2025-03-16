// frontend/src/components/AddTaskModal.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCreateTask } from "./mutations";
import { errorLogger } from "@/utils/helper";

export default function AddTaskModal({ onClose, openSuccessModal }: { onClose: () => void, openSuccessModal: () => void }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const { mutateAsync, isPending } = useCreateTask()

    const addTask = async () => {
        try {
            await mutateAsync({
                title, description
            }, {
                onSuccess() {
                    onClose()
                    openSuccessModal()
                },
            })
        } catch (error) {
            errorLogger(error)

        }
    };

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Task</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col space-y-2">
                    <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <Input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    <Button isLoading={isPending} onClick={() => addTask()}>Add Task</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}