import { DashboardContent } from "@/components/dashboard/dashboard-content";

export default function DashboardPage() {
  return (
    <div className="p-8">
     <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className=" rounded-lg pt-6">
        {<DashboardContent/>}
      </div>
    </div>
  );
}