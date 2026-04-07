export const AdminTable = ({ headers, rows }) => {
  return (
    <div className="py-2">
      <div className="space-y-3 md:hidden">
        {rows.map((row, idx) => (
          <div key={idx} className="border-t border-black/10 py-3 first:border-0">
            {row.map((cell, index) => (
              <div key={index} className="flex items-start justify-between gap-3 py-1.5 text-sm">
                <span className="text-ink/60">{headers[index]}</span>
                <span className="text-right">{cell}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header} className="py-2 text-ink/70">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx} className="border-t border-white/10">
                {row.map((cell, index) => (
                  <td key={index} className="py-2">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
