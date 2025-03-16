import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { Button } from "@/components/ui/button";
import { Edit3, LogOut, MoreHorizontal, Trash2 } from "lucide-react";

interface IProp {
  id: string,
  openRemoveTask: () => void,
  onOpenEdit: () => void,
  onOpenView?: () => void,
  setTaskId: (v: string) => void,
  setTask: () => void,
}
const Options = ({ id, openRemoveTask, onOpenEdit, onOpenView, setTaskId, setTask }: IProp) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="space-y-2 rounded-[10px] p-2" align="end">
        <DropdownMenuItem
          onClick={() => {
            onOpenView?.();
            setTask()
          }}
          className="flex items-center gap-2 rounded-md bg-[#5B93FF] bg-opacity-5 p-2 text-[#5B93FF]"
        >
          <Edit3 size={16} />
          <span>View Information</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => {
          onOpenEdit()
          setTaskId(id)
          setTask()

        }} className="flex items-center gap-2 rounded-md bg-[#FFAF0C] bg-opacity-5 p-2 text-[#FFAF0C]">
          <LogOut size={16} />
          <span>Edit Task</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => {
          openRemoveTask();
          setTaskId(id)
        }} className="flex items-center gap-2 rounded-md bg-[#E71D36] bg-opacity-5 p-2 text-[#E71D36]">
          <Trash2 size={16} />
          <span>Delete Task</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Options;
