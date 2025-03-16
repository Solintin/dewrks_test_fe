// frontend/src/components/AddTaskModal.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEditTask } from "./mutations";
import { errorLogger } from "@/utils/helper";
import { Form, useForm } from "react-hook-form";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";


const editTaskSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
});
export type editTaskDTO = z.infer<typeof editTaskSchema>
interface IEditTaskProp { id: string, onClose: () => void, openSuccessModal: () => void, data: { title: string, description: string, status: string } }
export default function EditTaskModal({ onClose, openSuccessModal, data, id }: IEditTaskProp) {
    const form = useForm<editTaskDTO>(
        {
            resolver: zodResolver(editTaskSchema),
            defaultValues: {
                title: data.title,
                description: data.description
            }
        }
    );
    const { mutateAsync, isPending } = useEditTask()

    const editTask = async (data: editTaskDTO) => {
        try {
            await mutateAsync(
                { payload: data, id },
                {
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
                    <DialogTitle>Edit Task</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(editTask)}>
                        <div className="flex flex-col space-y-2">
                            <FormField
                                control={form.control}
                                name={"title"}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-normal text-text-500">
                                            Title
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Add task"
                                                className="shadow-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={"description"}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-normal text-text-500">
                                            Description
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Add task Description"
                                                className="shadow-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button isLoading={isPending}>Add Task</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog >
    );
}