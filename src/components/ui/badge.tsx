type Status = "pending" | "in-progress" | "completed";

export const Badge = ({ status }: { status: Status }) => {
  const colorMap = {
    "pending": "bg-primary-50 text-primary-100",
    "in-progress": "bg-yellow-100 text-yellow-500",
    "completed": "bg-green-50 text-green-100",
  };

  return (
    <span
      className={`rounded-lg px-4 py-2 text-xs font-medium uppercase ${colorMap[status]}`}
    >
      {status}
    </span>
  );
};
