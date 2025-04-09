import FullCard from "@/components/cards/FullCard";
import ImageCard from "@/components/cards/ImageCard";
import LiteCard from "@/components/cards/LiteCard";

export default function FeedPage() {
  return (
    <main className="w-screen h-screen flex flex-col items-center justify-start">
      <h1>Feed</h1>
      <ImageCard />
      <LiteCard />
      <FullCard />
    </main>
  );
}
