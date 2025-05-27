 type StatusType = "Active" | "Pending" | "Premium" | "Regular" | "New" | string;
 
 interface StatusBadgeProps {
   status: StatusType;
 }
 
 
 const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const colors: Record<string, string> = {
    Active: "bg-green-500/20 text-green-400 border-green-500/30",
    Pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    Premium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    Regular: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    New: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium border ${
        colors[status] || "bg-gray-500/20 text-gray-400 border-gray-500/30"
      }`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;