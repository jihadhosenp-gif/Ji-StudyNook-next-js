import RoomDetailView from "./RoomDetailView";

export const metadata = {
  title: "StudyNook – Room Details",
  description: "View study room details, amenities and reserve an hourly slot.",
};

export default async function RoomPage({ params }) {
  const { id } = await params;
  // key remounts the view per room so its loading state resets on navigation.
  return <RoomDetailView key={id} roomId={id} />;
}
