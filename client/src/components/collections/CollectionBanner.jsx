import { Link } from 'react-router-dom';

export const CollectionBanner = ({ collection }) => {
  const seasonLabel = collection.season && collection.year ? `${collection.season} ${collection.year}` : null;

  return (
    <Link
      to={`/collections/${collection.slug}`}
      className="fade-in relative block overflow-hidden p-6 sm:p-8"
      style={{
        backgroundImage: `linear-gradient(160deg, rgba(255,255,255,.86), rgba(245,245,245,.9)), url(${collection.heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <p className="text-xs uppercase tracking-[0.25em] text-electricLime">Collection Drop</p>
      <h2 className="mt-2 max-w-xl font-heading text-3xl text-hotPink md:text-5xl">{collection.name}</h2>
      <p className="mt-3 max-w-2xl text-sm text-ink/85 sm:text-base">{collection.description}</p>

      <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-ink/80">
        {seasonLabel && <span className="rounded-full bg-white/85 px-3 py-1">{seasonLabel}</span>}
        {collection.pieces ? <span className="rounded-full bg-white/85 px-3 py-1">{collection.pieces} pieces</span> : null}
        <span className="rounded-full bg-white/85 px-3 py-1">{collection.isActive ? 'Live now' : 'Coming soon'}</span>
      </div>
      <p className="mt-4 text-sm font-semibold text-vividViolet underline underline-offset-4">Open collection</p>
    </Link>
  );
};
