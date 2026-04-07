export const CollectionBanner = ({ collection }) => {
  return (
    <div
      className="fade-in relative overflow-hidden rounded-3xl border border-white/10 p-8"
      style={{
        backgroundImage: `linear-gradient(160deg, rgba(10,11,15,.55), rgba(10,11,15,.82)), url(${collection.heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <p className="text-xs uppercase tracking-[0.25em] text-sand">Collection</p>
      <h2 className="mt-2 max-w-xl font-heading text-3xl md:text-5xl">{collection.name}</h2>
      <p className="mt-3 max-w-lg text-sm text-pearl/85">{collection.description}</p>
    </div>
  );
};
