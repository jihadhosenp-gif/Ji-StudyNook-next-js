import Protected from "@/components/Protected";
import MyListingsView from "./MyListingsView";

export const metadata = {
  title: "StudyNook – My Listings",
  description: "Manage the study rooms you list on StudyNook.",
};

export default function MyListingsPage() {
  return (
    <Protected>
      <MyListingsView />
    </Protected>
  );
}
