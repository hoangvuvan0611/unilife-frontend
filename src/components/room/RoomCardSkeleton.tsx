import { Skeleton } from "@/components/ui/skeleton";

export default function RoomCardSkeleton() {
  return (
    <div className="flex flex-col space-y-2">
      <Skeleton className="aspect-square w-full rounded-xl" />
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-10" />
      </div>
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-4 w-1/4" />
    </div>
  );
} 