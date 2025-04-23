import dynamic from "next/dynamic";

// Use dynamic imports with SSR disabled for components using client-side features
const DriversHeader = dynamic(
  () => import("@/components/demo-dashboard/sections/drivers/DriversHeader"),
  { ssr: false }
);
const DriversStats = dynamic(
  () => import("@/components/demo-dashboard/sections/drivers/DriversStats"),
  { ssr: false }
);
const DriversTable = dynamic(
  () => import("@/components/demo-dashboard/sections/drivers/DriversTable"),
  { ssr: false }
);

export default function DriversPage() {
  return (
    <div className="space-y-6">
      <DriversHeader />
      <DriversStats />
      <DriversTable />
    </div>
  );
}