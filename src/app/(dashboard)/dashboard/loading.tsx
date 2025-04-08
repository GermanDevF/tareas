import { Card, CardContent, Skeleton } from "@/components/ui";

interface SkeletonItemProps {
  width: string;
  height: string;
  className?: string;
}

function SkeletonItem({ width, height, className = "" }: SkeletonItemProps) {
  return <Skeleton className={`h-${height} w-${width} ${className}`} />;
}

function UserProfileSkeleton() {
  return (
    <Card>
      <CardContent>
        <SkeletonItem width="[250px]" height="4" className="mb-2" />
        <SkeletonItem width="[200px]" height="4" className="mb-1" />
        <SkeletonItem width="[200px]" height="4" className="mb-1" />
        <SkeletonItem width="[200px]" height="4" className="mb-1" />
        <SkeletonItem width="[200px]" height="4" />
      </CardContent>
    </Card>
  );
}

function UserGroupsSkeleton() {
  return (
    <Card>
      <CardContent>
        <SkeletonItem width="[250px]" height="4" className="mb-2" />
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="mb-2 flex justify-between">
            <div className="flex items-center">
              <SkeletonItem width="6" height="6" className="mr-2" />
              <SkeletonItem width="[150px]" height="4" />
            </div>
            <div className="flex justify-end gap-2">
              <SkeletonItem width="[100px]" height="8" />
              <SkeletonItem width="[100px]" height="8" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function UserTasksSkeleton() {
  return (
    <Card>
      <CardContent>
        <SkeletonItem width="[250px]" height="4" className="mb-2" />
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="mb-2">
            <SkeletonItem width="[200px]" height="4" className="mb-1" />
            <SkeletonItem width="[150px]" height="4" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default function Loading() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UserProfileSkeleton />
        <UserGroupsSkeleton />
        <UserTasksSkeleton />
      </div>
    </div>
  );
}
