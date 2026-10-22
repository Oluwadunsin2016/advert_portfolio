/** A CSS MacBook. `children` fill the 16:10 screen. */
export function MacbookMockup({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full">
      {/* Lid: bezel around the screen */}
      <div className="relative mx-auto w-[86%] rounded-t-[1.25rem] bg-[#0d0d0f] p-[1.4%] pb-[1.8%] ring-1 ring-white/12">
        <span
          aria-hidden
          className="absolute top-[0.55%] left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-[#2a2a2e] ring-1 ring-white/5"
        />
        <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-black">{children}</div>
      </div>

      {/* Base */}
      <div
        aria-hidden
        className="relative h-3 w-full rounded-b-[1.25rem] bg-linear-to-b from-[#c9c9cf] via-[#9a9aa1] to-[#5d5d63] sm:h-4"
      >
        <span className="absolute inset-x-0 top-0 h-px bg-white/60" />
        <span className="absolute top-0 left-1/2 h-1/2 w-[14%] -translate-x-1/2 rounded-b-md bg-[#8a8a91]" />
      </div>
      <div aria-hidden className="mx-auto h-1 w-[96%] rounded-b-full bg-black/60 blur-[2px]" />
    </div>
  );
}
