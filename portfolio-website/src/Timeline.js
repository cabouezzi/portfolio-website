import React from "react";
import ReactMarkdown from "react-markdown";

export default function Timeline({ timelineData = [] }) {
  return (
    <div className="ml-8 flex flex-col gap-6">
      {timelineData.map((entry, idx) => (
        <TimelineEntry key={idx} entry={entry} />
      ))}
    </div>
  );
}

function TimelineEntry({ entry }) {
  return (
    <div className="grid grid-cols-[32ch_1rem_1fr] gap-x-4 relative">
      {/* Column 1: Dates */}
      {entry.roles?.map((role, idx) => (
        <div
          key={`date-${idx}`}
          className={`w-32 text-right text-sm text-slate-400 shrink-0 whitespace-nowrap`}
          style={{ gridColumn: 1, gridRow: idx + 2 }}
        >
          {role.end ? `${role.start} – ${role.end}` : role.start}
        </div>
      ))}

      {/* Column 2: Timeline dots */}
      {entry.roles?.map((role, idx) => (
        <div
          key={`dot-${idx}`}
          className="flex justify-center"
          style={{ gridColumn: 2, gridRow: idx + 2 }}
        >
          <div className="w-3 h-3 bg-slate-400 rounded-full mt-1 z-10" />
        </div>
      ))}

      {/* Column 3: Image + Title */}
      <div className="flex items-center gap-3" style={{ gridColumn: 3, gridRow: 1 }}>
        {entry.logo && (
          <img
            src={entry.logo}
            alt={entry.title}
            className="w-6 h-6 object-contain rounded-sm flex-shrink-0"
          />
        )}
        <h3 className="text-lg md:text-xl font-bold text-slate-200">{entry.title}</h3>
      </div>

      {/* Column 3: Roles */}
      {entry.roles?.map((role, idx) => (
        <div key={`role-${idx}`} style={{ gridColumn: 3, gridRow: idx + 2 }}>
          {/* Bigger role header */}
          <div className="text-base md:text-lg font-semibold text-slate-300">{role.header}</div>
          <div className="prose prose-invert prose-sm max-w-none text-slate-400">
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="text-slate-300 text-sm leading-relaxed mb-1">{children}</p>,
                li: ({ children }) => <li className="ml-4 list-disc text-slate-300 text-sm leading-relaxed">{children}</li>,
                ul: ({ children }) => <ul className="mb-1">{children}</ul>,
              }}
            >
              {role.description}
            </ReactMarkdown>
          </div>
        </div>
      ))}
    </div>
  );
}