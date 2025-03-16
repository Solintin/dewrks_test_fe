// frontend/src/components/ViewTaskModal.tsx
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ITask } from "./mutations";

interface ViewTaskModalProps {
    task: ITask;
    onClose: () => void
}

export default function ViewTaskModal({ task, onClose }: ViewTaskModalProps): JSX.Element {
    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent>
                <div className="mb-4">
                    <DialogTitle className="text-lg font-bold">Task Details</DialogTitle>
                </div>
                <div className="space-y-2">
                    <p><strong>Title:</strong> {task.title}</p>
                    <p><strong>Description:</strong> {task.description}</p>
                    <p><strong>Status:</strong> {task.status}</p>
                    <p><strong>Created At:</strong> {new Date(task.createdAt).toLocaleString()}</p>
                    <p><strong>Updated At:</strong> {new Date(task.updatedAt).toLocaleString()}</p>
                    <h3 className="font-bold">Status Tracker</h3>
                    <ul className="list-disc list-inside">
                        {task.statusTracker.map((tracker) => (
                            <li key={tracker._id}>
                                {tracker.status} - {new Date(tracker.updateAt).toLocaleString()}
                            </li>
                        ))}
                    </ul>
                </div>
            </DialogContent>
        </Dialog>
    );
}

