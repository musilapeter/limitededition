export const ErrorState = ({ message = 'Something went wrong' }) => {
  return (
    <div className="rounded-xl border border-hotPink/50 bg-hotPink/10 p-4 text-sm text-hotPink">
      {message}
    </div>
  );
};
