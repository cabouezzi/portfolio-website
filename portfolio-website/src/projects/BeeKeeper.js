export default function BeeKeeper() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-neutral-900 rounded-xl border border-neutral-700 p-6">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold mb-2">BeeKeeper (iOS/macOS)</h2>
        <p className="opacity-70 mb-4">
          A multi-platform hive inspection and apiary tracking app.
        </p>

        <img
          src="/beekeeper/screenshot.png"
          alt="BeeKeeper screenshot"
          className="rounded-lg shadow-lg w-full"
        />
      </div>
    </div>
  );
}