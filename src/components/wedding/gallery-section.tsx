import Image from "next/image";

export function GallerySection({ images }: { images: readonly { src: string; alt: string }[] }) {
  if (!images.length) return null;
  return (
    <section aria-labelledby="gallery-title" className="text-center">
      <p className="text-[10px] uppercase tracking-[.35em] text-gold-deep">Recuerdos</p>
      <h2 id="gallery-title" className="mt-3 font-display text-4xl text-wood">Nuestra historia</h2>
      <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((image, index) => (
          <figure key={image.src} className={`relative overflow-hidden rounded-sm bg-beige shadow-[0_14px_30px_-18px_rgba(63,48,31,.5)] ${index === 0 ? "row-span-2 aspect-[3/5]" : "aspect-[4/3] sm:aspect-[3/4]"}`}>
            <Image src={image.src} alt={image.alt} fill sizes="(max-width: 640px) 46vw, 210px" className="object-cover transition-transform duration-700 hover:scale-[1.03]" />
          </figure>
        ))}
      </div>
    </section>
  );
}
