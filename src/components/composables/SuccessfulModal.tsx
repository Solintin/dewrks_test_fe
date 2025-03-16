import { X } from "lucide-react";
import { motion } from "framer-motion";
import SuccessMark from "@/assets/svg/successful-mark.svg";

const SuccessfulModal = ({ action, title, body }: { action: () => void, title?: string; body?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[99] flex items-center justify-center bg-black/50"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-w-96 rounded-lg bg-white px-8 pb-8 pt-2"
      >
        <div className="flex justify-end">
          <button onClick={action}>
            <X className="size-6" />
          </button>
        </div>
        <div className="flex flex-col items-center text-secondary-black">
          <div>
            <img className="h-32 w-48" src={SuccessMark} alt="" />
          </div>
          <h2 className="text-lg font-medium">{title ? title : "Action Performed"}</h2>
          <p>
            {body ? body : "Action Performed Successfully"}
          </p>

          <button
            onClick={action}
            className="mt-4 w-full rounded-md bg-primary-100 px-4 py-2 text-white">
            Done
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SuccessfulModal;
