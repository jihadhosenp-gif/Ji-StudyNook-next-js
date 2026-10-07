import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import FeaturedRooms from "@/components/home/FeaturedRooms";
import HowItWorks from "@/components/home/HowItWorks";
import WhyStudyNook from "@/components/home/WhyStudyNook";
import CallToAction from "@/components/home/CallToAction";

export const metadata = {
  title: "StudyNook – Home",
  description:
    "Find your quiet corner. Discover, book and list library study rooms with StudyNook.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <FeaturedRooms />
      <HowItWorks />
      <WhyStudyNook />
      <CallToAction />
    </>
  );
}
