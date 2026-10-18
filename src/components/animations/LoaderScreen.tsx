import Image from "next/image";

/** The brand emblem and a thin progress line, no text. Shared by the first-load preloader and page transitions. */
export function LoaderScreen() {
  return (
    <div className="flex flex-col items-center px-6">
      <Image src="/branding/bsq-emblem.png" alt="" width={240} height={186} priority className="h-28 w-auto object-contain sm:h-32" />
      <div className="relative mt-8 h-[2px] w-48 overflow-hidden bg-[#181818]/15 sm:w-56">
        <div className="loader-bar absolute inset-y-0 left-0 w-1/2 bg-legacy-red" />
      </div>
    </div>
  );
}
