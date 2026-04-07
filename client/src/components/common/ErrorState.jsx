export const ErrorState = ({ message = 'Something went wrong' }) => {
  return (
    <div className="rounded-xl border border-rust/40 bg-rust/10 p-4 text-sm text-rust">
      {message}
    </div>
  );
};
