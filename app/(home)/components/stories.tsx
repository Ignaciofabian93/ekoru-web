import clsx from "clsx";

const StoryIcon = () => {
  return <div className={clsx("w-[60px]", "h-[60px]", "rounded-full", "bg-gray-700")}></div>;
};

const numberOfStories = Array.from({ length: 20 }, (_, index) => index + 1);

export default function Stories() {
  return (
    <section className={clsx("w-full h-[100px]", "mb-2", "flex items-center justify-center")}>
      <div className={clsx("w-[90%]", "h-full", "flex items-center justify-start", "overflow-x-scroll")}>
        {numberOfStories.map((_, index) => (
          <div key={index} className={clsx("w-[60px]", "h-full", "flex items-center justify-center", "mx-4")}>
            <StoryIcon />
          </div>
        ))}
      </div>
    </section>
  );
}
