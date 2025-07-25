export default function TaskSkeleton({ count }: { count: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          className="animate-pulse p-4 flex justify-between items-start rounded-xl bg-gray-100 shadow-sm"
          key={i}
        >
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
        </div>
      ))}
    </>
  );
}
