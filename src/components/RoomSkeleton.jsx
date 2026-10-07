/** Skeleton placeholder shaped like a RoomCard while data loads. */
export default function RoomSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface">
      <div className="skeleton aspect-[16/10] rounded-none" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="skeleton h-5 w-2/3" />
        <div className="skeleton h-3.5 w-full" />
        <div className="skeleton h-3.5 w-4/5" />
        <div className="skeleton h-3.5 w-1/2" />
        <div className="flex gap-1.5">
          <div className="skeleton h-5 w-16" />
          <div className="skeleton h-5 w-20" />
          <div className="skeleton h-5 w-14" />
        </div>
        <div className="mt-auto flex items-center justify-between border-t border-line pt-4">
          <div className="skeleton h-6 w-16" />
          <div className="skeleton h-4 w-24" />
        </div>
      </div>
    </div>
  );
}

export function RoomGridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <RoomSkeleton key={i} />
      ))}
    </div>
  );
}
