export const ErrorState = ({ message = 'Something went wrong' }) => {
  return (
    <div className="py-3 text-sm text-hotPink">
      {message}
    </div>
  );
};
