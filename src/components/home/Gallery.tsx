import Image from "next/image";
import { images } from "@/data/menu";
import { SectionHeading } from "@/components/ui/SectionHeading";

const shots = [
  { src: images.sandwich, caption: "Loaded Sandwiches", tall: false },
  { src: images.pizza, caption: "Cheesy Pizzas", tall: true },
  { src: images.momos, caption: "Crispy Momos", tall: false },
  { src: images.garlic, caption: "Garlic Bread", tall: false },
  { src: images.beverages, caption: "Chilled Drinks", tall: false },
  { src: images.dessert, caption: "Sweet Endings", tall: true },
];

export function Gallery() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Cheesy Moments"
          title="Fresh From The Kitchen"
          description="A peek at what gets made fresh, every single day."
        />
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {shots.map((shot, i) => (
            <div
              key={shot.src + i}
              className={`group relative overflow-hidden rounded-3xl border border-white/10 shadow-card ${
                shot.tall ? "md:row-span-2" : ""
              }`}
            >
              <div
                className={`relative w-full ${
                  shot.tall ? "aspect-[3/4] md:h-full" : "aspect-[3/4]"
                }`}
              >
                <Image
                  src={shot.src}
                  alt={shot.caption}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-70 transition-opacity group-hover:opacity-90" />
                <p className="absolute bottom-3 left-3 right-3 translate-y-2 text-sm font-bold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {shot.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
