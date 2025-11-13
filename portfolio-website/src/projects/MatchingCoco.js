export default function MatchingCoco() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-neutral-950 rounded-xl p-6 border border-neutral-700">
      <div className="bg-neutral-900/80 rounded-xl p-6 shadow-lg text-center max-w-sm">
        <h2 className="text-2xl font-bold mb-2">Matching Coco</h2>
        <p className="opacity-70 mb-4">
          My first iOS app — a card-matching game featuring my cousin’s dog Coco.
        </p>
        <img
          src="/matching-coco/screenshot.png"
          alt="Matching Coco screenshot"
          className="rounded-lg shadow-md"
        />
      </div>
    </div>
  );
}