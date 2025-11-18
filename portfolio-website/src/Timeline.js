import React from "react";
import ReactMarkdown from "react-markdown";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export default function Timeline({ timelineData = [] }) {
  // Flatten roles with parent entry
  const flattenedRoles = [];
  timelineData.forEach((entry) => {
    if (entry.roles?.length) {
      entry.roles.forEach((role) => {
        flattenedRoles.push({ ...role, parentEntry: entry });
      });
    } else {
      flattenedRoles.push({ parentEntry: entry });
    }
  });

  // Sort by end date descending (treat "Present" as future)
  flattenedRoles.sort((a, b) => {
    const parseDate = (d) =>
      d === "Present" ? dayjs("2100-01-01") : dayjs(d, "MMM YYYY");

    const dateA = parseDate(a.end || a.start);
    const dateB = parseDate(b.end || b.start);

    return dateB.isBefore(dateA) ? -1 : dateB.isAfter(dateA) ? 1 : 0; // reverse
  });

  // Split same organization if interrupted
  const splitEntries = [];
  let lastOrg = null;
  let currentEntry = null;

  flattenedRoles.forEach((role) => {
    const org = role.parentEntry.title;
    if (org !== lastOrg) {
      currentEntry = { title: org, logo: role.parentEntry.logo, roles: [] };
      splitEntries.push(currentEntry);
    }
    if (role.header || role.description || role.start) {
      currentEntry.roles.push(role);
    }
    lastOrg = org;
  });

  return (
    <div className="relative flex flex-col gap-6">
      {splitEntries.map((entry, idx) => (
        <TimelineEntry key={idx} entry={entry} />
      ))}
    </div>
  );
}

function TimelineEntry({ entry }) {
  return (
    <div className="grid grid-cols-[140px_1rem_1fr] gap-x-2 relative max-w-4xl">
      {/* Column 1: Dates */}
      {entry.roles?.map((role, idx) => (
        <div
          key={`date-${idx}`}
          className={`text-right text-sm text-slate-400 shrink-0 whitespace-nowrap pr-2`}
          style={{ gridColumn: 1, gridRow: idx + 2 }}
        >
          {role.end ? `${role.start} – ${role.end}` : role.start}
        </div>
      ))}

      {/* Column 2: Timeline dots */}
      {entry.roles?.map((role, idx) => (
        <div
          key={`dot-${idx}`}
          className="flex justify-center relative"
          style={{ gridColumn: 2, gridRow: idx + 2 }}
        >
          <div className="w-3 h-3 bg-slate-400 rounded-full mt-1 z-10 relative" />
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
          {role.header && (
            <div className="text-base md:text-lg font-semibold text-slate-300">
              {role.header}
            </div>
          )}
          {role.description && (
            <div className="prose prose-invert prose-sm max-w-none text-slate-400">
              <ReactMarkdown
                components={{
                  p: ({ children }) => (
                    <p className="text-slate-300 text-sm leading-relaxed mb-1">
                      {children}
                    </p>
                  ),
                  li: ({ children }) => (
                    <li className="ml-4 list-disc text-slate-300 text-sm leading-relaxed">
                      {children}
                    </li>
                  ),
                  ul: ({ children }) => <ul className="mb-1">{children}</ul>,
                }}
              >
                {role.description}
              </ReactMarkdown>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}