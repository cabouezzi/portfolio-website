export default function Boids() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-black rounded-xl relative overflow-hidden border border-neutral-700">
      <canvas
        id="boids-canvas"
        className="absolute inset-0 w-full h-full"
      />
      <div className="absolute top-4 left-4 text-white opacity-80">
        <h2 className="text-xl font-semibold">Boids Simulation</h2>
        <p className="text-sm opacity-70">Flocking behavior in Swift → displayed here in JS.</p>
      </div>
    </div>
  );
}