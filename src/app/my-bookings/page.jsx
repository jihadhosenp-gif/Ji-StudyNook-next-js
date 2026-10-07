import Protected from "@/components/Protected";
import MyBookingsView from "./MyBookingsView";

export const metadata = {
  title: "StudyNook – My Bookings",
  description: "Manage your upcoming and past study room bookings.",
};

export default function MyBookingsPage() {
  return (
    <Protected>
      <MyBookingsView />
    </Protected>
  );
}
