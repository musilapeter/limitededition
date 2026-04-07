import { Button } from './Button';

export const Modal = ({ title, open, onClose, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="glass-panel w-full max-w-xl rounded-2xl p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-heading text-xl text-pearl">{title}</h3>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
};
