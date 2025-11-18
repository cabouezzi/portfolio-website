import React, { useEffect, useState } from "react";

// === Default examples ===
const EXAMPLES = [
  {
    name: "None",
    code: "// Write Lira code here\n",
  },
  {
    name: "Scopes & Variables",
    code: `// Testing scopes
var a = "global a";
var b = "global b";
{
  var a = "outer a";
  var b = "outer b";
  {
    var a = "inner a";
    print a;
    print b;
  }
  print a;
  print b;
}
print a;
print b;`,
  },
  {
    name: "Fibonacci",
    code: `func fib(n) {
  if (n <= 1) return n;
  return fib(n - 2) + fib(n - 1);
}

var i = 0;
while (i < 10) {
    print fib(i);
    i = i + 1;
}`,
  },
  {
    name: "Functions & Closures",
    code: `func makeCounter() {
  var i = 0;
  func count() {
    i = i + 1;
    print i;
  }
  return count;
}

var counter = makeCounter();
counter();
counter();`,
  },
];

let dotnetRuntimePromise = null;

async function loadDotnet() {
  if (dotnetRuntimePromise) return dotnetRuntimePromise;

  dotnetRuntimePromise = new Promise(async (resolve, reject) => {
    try {
      console.log("[Lira] Loading dotnet runtime...");
      while (!window.DotNet) {
        await new Promise((r) => setTimeout(r, 100));
      }
      const runtime = await window.DotNet;
      const exports = await runtime.getAssemblyExports("lira.wasm.dll");

      window.DotNetRuntime = runtime;
      window.DotNetExports = exports;

      resolve({ runtime, exports });
    } catch (err) {
      console.error("[Lira] Failed to load dotnet:", err);
      reject(err);
    }
  });

  return dotnetRuntimePromise;
}

export default function Lira() {
  const [dotnetReady, setDotnetReady] = useState(false);
  const [currentExample, setCurrentExample] = useState(EXAMPLES[0].name);
  const [code, setCode] = useState(EXAMPLES[0].code);
  const [output, setOutput] = useState("");

  useEffect(() => {
    window.forwardToUIConsole = (msg) => {
      setOutput((prev) => prev + "\n" + msg);
    };

    (async () => {
      try {
        await loadDotnet();
        window.DotNetRuntime.setModuleImports("/lira-wasm/main.js", {
          log: (msg) => setOutput((prev) => prev + "\n[Lira] " + msg),
        });
        setDotnetReady(true);
        setOutput("✅ .NET runtime loaded and ready.");
      } catch (err) {
        setOutput(`❌ Failed to load runtime: ${err.message}`);
      }
      const intro = `
Welcome to Lira habibi!
We charge 10% interest in performance for each line of text.
------------------------------------------------------------`;
      setOutput((prev) => prev + intro + "\n");
    })();
  }, []);

  const loadExample = (example) => {
    setCurrentExample(example.name);
    setCode(example.code);
    const intro = `Welcome to Lira habibi!
We charge 10% interest in performance for each line of text.
------------------------------------------------------------`;
    setOutput(intro + "\n");
  };

  const runCode = async () => {
    if (!dotnetReady || !window.DotNetExports) {
      setOutput("Runtime not ready!");
      return;
    }

    try {
      setOutput(`▶️ Running code\n\n`);
      await window.DotNetExports.Lira.LiraWASM.Run(code);
      setOutput((prev) => prev + "\n✅ Finished running.");
    } catch (err) {
      console.error("[Lira] Error running code:", err);
      setOutput(`❌ Error: ${err.message}`);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-gray-100">
      {/* Editor */}
      <div className="flex-1 flex flex-col p-4 md:p-6 min-w-0">
        <select
          value={currentExample}
          onChange={(e) =>
            loadExample(EXAMPLES.find((ex) => ex.name === e.target.value))
          }
          className="mb-4 p-3 rounded-lg bg-slate-800 border border-slate-700 text-gray-100 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {EXAMPLES.map((ex) => (
            <option key={ex.name} value={ex.name}>
              {ex.name}
            </option>
          ))}
        </select>

        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="flex-1 w-full min-w-0 p-4 bg-slate-900 border border-slate-700 rounded-xl font-mono text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none shadow-lg whitespace-pre-wrap overflow-auto"
          style={{ wordWrap: 'break-word' }}
        />
      </div>

      {/* Console */}
      <div className="flex-1 flex flex-col p-4 md:p-6 min-w-0 bg-slate-800 border-l border-slate-700">
        <div className="flex justify-between items-center mb-3">
          <span className="font-bold text-gray-200 text-lg">Console</span>
          <button
            onClick={runCode}
            disabled={!dotnetReady}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition disabled:opacity-50"
          >
            Run
          </button>
        </div>
        <pre className="flex-1 w-full min-w-0 p-4 bg-black text-green-400 rounded-xl overflow-auto font-mono text-sm shadow-inner whitespace-pre-wrap break-words">
          {output}
        </pre>
      </div>
    </div>
  );
}
