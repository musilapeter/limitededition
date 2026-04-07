import { Card } from '../common/Card';

export const InventoryTable = ({ logs }) => {
  return (
    <Card>
      <h3 className="mb-3 font-heading text-2xl">Inventory Movement Log</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="text-pearl/70">
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
              <tr key={log._id} className="border-t border-white/10">
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
    </Card>
  );
};
