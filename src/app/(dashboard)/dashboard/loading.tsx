import { Card, CardContent, Skeleton } from "@/components/ui";

function UserProfileSkeleton() {
  return (
    <Card>
      <CardContent>
        <Skeleton className="h-4 w-[250px] mb-2" />
        <Skeleton className="h-4 w-[200px] mb-1" />
        <Skeleton className="h-4 w-[200px] mb-1" />
        <Skeleton className="h-4 w-[200px] mb-1" />
        <Skeleton className="h-4 w-[200px]" />
      </CardContent>
    </Card>
  );
}

function UserGroupsSkeleton() {
  return (
    <Card>
      <CardContent>
        <Skeleton className="h-4 w-[250px] mb-2" />
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="mb-2 flex justify-between">
            <div className="flex items-center">
              <Skeleton className="h-6 w-6 mr-2" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
            <div className="flex justify-end gap-2">
              <Skeleton className="h-8 w-[100px]" />
              <Skeleton className="h-8 w-[100px]" />
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
        <Skeleton className="h-4 w-[250px] mb-2" />
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="mb-2">
            <Skeleton className="h-4 w-[200px] mb-1" />
            <Skeleton className="h-4 w-[150px]" />
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
