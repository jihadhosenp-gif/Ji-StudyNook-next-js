import Protected from "@/components/Protected";
import AddRoomView from "./AddRoomView";

export const metadata = {
  title: "StudyNook – Add Room",
  description: "List a study room and give students a place to focus.",
};

export default function AddRoomPage() {
  return (
    <Protected>
      <AddRoomView />
    </Protected>
  );
}
