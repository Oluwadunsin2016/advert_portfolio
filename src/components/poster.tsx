import Image from "next/image";

type Props = {
  poster?: string;
  accent: string;
  title: string;
  priority?: boolean;
  sizes?: string;
};

/** Fills its (relatively positioned) parent with the poster image, or a
 *  gradient in the advert's accent colour when there isn't one yet. */
export function Poster({ poster, accent, title, priority, sizes = "100vw" }: Props) {
  if (poster) {
    return (
      <Image
        src={poster}
        alt=""
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    );
  }
  return (
    <div
      aria-hidden
      className="absolute inset-0 flex items-end p-5"
      style={{
        background: `radial-gradient(120% 90% at 20% 10%, ${accent}cc, transparent 60%), radial-gradient(100% 80% at 90% 100%, ${accent}66, transparent 70%), #0b0b0c`,
      }}
    >
      <span className="font-display text-2xl font-bold leading-none text-white/25 sm:text-3xl">
        {title}
      </span>
    </div>
  );
}
