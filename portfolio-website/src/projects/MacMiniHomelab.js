export default function MacMiniHomelab() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-neutral-900 rounded-xl border border-neutral-700 p-6">
      <div className="text-center max-w-2xl">
        <h2 className="text-3xl font-bold mb-4">This website itself is a demo!</h2>
        <p className="text-neutral-300 leading-relaxed mb-6">
          The actual system is private home infrastructure, so I do not expose a public live endpoint.
          Instead, this project page demonstrates the architecture and security model used on my
          personal Mac Mini M2 server.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {[
            "Headless Ubuntu Asahi",
            "Firewall Hardening",
            "Reverse Proxy",
            "DuckDNS",
            "VPN Access",
            "Least-Privilege OpenClaw",
          ].map((item) => (
            <span
              key={item}
              className="text-xs bg-neutral-800 border border-neutral-600 px-3 py-1.5 rounded-full text-neutral-200"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
