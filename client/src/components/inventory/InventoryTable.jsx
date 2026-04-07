export const InventoryTable = ({ logs }) => {
  return (
    <section className="py-2">
      <h3 className="mb-3 font-heading text-xl sm:text-2xl">Inventory Movement Log</h3>

      <div className="space-y-3 md:hidden">
        {logs?.map((log) => (
          <div key={log._id} className="border-t border-black/10 py-3 text-sm first:border-0">
            <div className="flex items-start justify-between py-1">
              <span className="text-ink/60">SKU</span>
              <span>{log.sku}</span>
            </div>
            <div className="flex items-start justify-between py-1">
              <span className="text-ink/60">Action</span>
              <span className="uppercase">{log.action}</span>
            </div>
            <div className="flex items-start justify-between py-1">
              <span className="text-ink/60">Previous</span>
              <span>{log.previousQuantity}</span>
            </div>
            <div className="flex items-start justify-between py-1">
              <span className="text-ink/60">Change</span>
              <span>{log.quantityChange}</span>
            </div>
            <div className="flex items-start justify-between py-1">
              <span className="text-ink/60">New</span>
              <span>{log.newQuantity}</span>
            </div>
            <div className="flex items-start justify-between py-1">
              <span className="text-ink/60">Reason</span>
              <span className="text-right">{log.reason || '-'}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="min-w-full text-left text-sm">
          <thead className="text-ink/70">
            <tr>
              <th className="py-2">SKU</th>
              <th className="py-2">Action</th>
              <th className="py-2">Previous</th>
              <th className="py-2">Change</th>
              <th className="py-2">New</th>
              <th className="py-2">Reason</th>
            </tr>
          </thead>
          <tbody>
            {logs?.map((log) => (
              <tr key={log._id} className="border-t border-black/10">
                <td className="py-2">{log.sku}</td>
                <td className="py-2 uppercase">{log.action}</td>
                <td className="py-2">{log.previousQuantity}</td>
                <td className="py-2">{log.quantityChange}</td>
                <td className="py-2">{log.newQuantity}</td>
                <td className="py-2">{log.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
