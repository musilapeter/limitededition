export const AdminTable = ({ headers, rows }) => {
  return (
    <div className="glass-panel overflow-x-auto rounded-2xl p-4">
      <table className="min-w-full text-left text-sm">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header} className="py-2 text-pearl/70">
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
  );
};
