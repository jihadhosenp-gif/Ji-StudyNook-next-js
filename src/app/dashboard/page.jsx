import Protected from "@/components/Protected";
import DashboardView from "./DashboardView";

export const metadata = {
  title: "StudyNook – Dashboard",
  description: "Your personal StudyNook workspace.",
};

export default function DashboardPage() {
  return (
    <Protected>
      <DashboardView />
    </Protected>
  );
}
