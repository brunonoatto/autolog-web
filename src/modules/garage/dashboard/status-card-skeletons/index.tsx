import { DashboardGrid } from '@modules/garage/dashboard/dashboard-grid';

// TODO: falta fazer skeleton com layout desktop
function StatusCardSkeleton() {
  return (
    <div className="animate-pulse min-h-32 rounded-lg flex flex-col justify-between border-2 border-neutral-600 p-2">
      <div className="space-y-2">
        <div className="h-6 w-28 rounded-full bg-neutral-600 m-auto" />
        <div className="h-4 w-48 rounded-full bg-neutral-600 m-auto" />
      </div>
      <div className="flex gap-2 justify-end">
        <div className="h-6 w-6 rounded-full bg-neutral-600" />
        <div className="h-4 w-48 rounded-full bg-neutral-600 self-center" />
      </div>
    </div>
  );
}

export function StatusCardSkeletons() {
  return (
    <DashboardGrid>
      <StatusCardSkeleton />
      <StatusCardSkeleton />
      <StatusCardSkeleton />
      <StatusCardSkeleton />
      <StatusCardSkeleton />
    </DashboardGrid>
  );
}
