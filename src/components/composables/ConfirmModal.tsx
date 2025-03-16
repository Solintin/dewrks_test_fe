import { X } from "lucide-react";
import questionMark from "@/assets/svg/question-mark.svg";
import { motion } from "framer-motion";
import { Button } from "../ui/button";

const ConfirmModal = ({ onProceed, onCancel, isLoading }: { onProceed: () => void, onCancel: () => void, isLoading?: boolean }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-w-[500px] rounded-lg bg-white px-8 pb-8 pt-2"
      >
        <div className="flex justify-end">
          <button
            onClick={onCancel}
          >
            <X className="size-6" />
          </button>
        </div>
        <div className="mx-auto size-32">
          <img
            className="h-full w-full"
            src={questionMark}
            alt="question Mark"
          />
        </div>
        <div className="flex flex-col items-center text-secondary-black">
          <h2 className="text-center text-lg font-medium text-text-500">
            Are you sure?
          </h2>
          <p className="text-center">You cannot reverse this process</p>
          <Button disabled={isLoading} isLoading={isLoading ?? false} onClick={onProceed} className="mt-4 w-full rounded-md bg-error-500 hover:bg-red-400 px-4 py-2 text-sm text-white disabled:cursor-not-allowed disabled:bg-red-200">
            Yes, Proceed
          </Button>
          <button onClick={onCancel} className="mt-2.5 w-full rounded-md border border-error-500 px-4 py-2 text-sm text-error-500">
            No, Cancel this Process
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ConfirmModal;
