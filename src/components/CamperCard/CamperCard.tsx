import Link from 'next/link';
import Image from 'next/image';
import { Camper } from '@/lib/types';
import { useCampersStore } from '@/store/useCampersStore';
import { AiFillStar } from 'react-icons/ai';
import css from './CamperCard.module.css';
import FeatureIcon from '../FeatureIcon/FeatureIcon';

export default function CamperCard({ camper }: { camper: Camper }) {
  const toggleFavorite = useCampersStore((s) => s.toggleFavorite);
  const favorites = useCampersStore((s) => s.favorites);
  const isFav = favorites.includes(camper.id);

  const formatParam = (value: string) =>
    value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

  const featuresMap: { key: keyof Camper; label: string; icon: string }[] = [
    { key: 'AC', label: 'AC', icon: 'ac' },
    { key: 'bathroom', label: 'Bathroom', icon: 'shower' },
    { key: 'kitchen', label: 'Kitchen', icon: 'kitchen' },
    { key: 'TV', label: 'TV', icon: 'icon-tv' },
    { key: 'engine', label: formatParam(camper.engine), icon: 'petrol' },
    { key: 'transmission', label: formatParam(camper.transmission), icon: 'transmission' },
  ];

  return (
    
    <div className={css.card}>
      <Image
        src={camper.gallery?.[0]?.thumb || '/placeholder.jpg'}
        alt={camper.name}
        width={292}
        height={320}
        className={css.thumb}
      />

      <div className={css.info}>
        <div className={css.infoWrapper}>
          <div className={css.titleContainer}>
            <h3 className={css.name}>{camper.name}</h3>

            <div className={css.priceAndFavContainer}>
              <p className={css.price}>€{camper.price.toFixed(2)}</p>

              <button
                onClick={() => toggleFavorite(camper.id)}
                className={`${css.favButton} ${isFav ? css.active : ''}`}
                aria-label="Add to favorites"
              >
                <svg width="26" height="24" className={css.favIcon}>
                  <use href="/symbol-defs.svg#favorites" />
                </svg>
              </button>
            </div>
          </div>

          <div className={css.rateAndLocationContainer}>
            <div className={css.rating}>
              <AiFillStar color="#ffc107" />
              <div className={css.spanRateContainer}>
                <span className={css.text}>{camper.rating.toFixed(1)}</span>
                <span className={css.text}>({camper.reviews?.length || 0} Reviews)</span>
              </div>
            </div>

            <p className={css.text}>{camper.location}</p>
          </div>
        </div>
        
        {camper.description && (
          <p className={css.description}>{camper.description}</p>
        )}

        <div className={css.details}>
          {featuresMap
            .filter(({ key }) => {
              const value = camper[key];
              return typeof value === 'boolean' ? value : Boolean(value);
            })
            .map(({ key, label, icon }) => (
              <span key={key} className={css.feature}>
                <FeatureIcon icon={icon} className={css.featureIcon} />
                {label}
              </span>
            ))}
        </div>

        <div className={css.actions}>
          <Link href={`/catalog/${camper.id}`}>
            <button className={css.button}>Show more</button>
          </Link>
        </div>
      </div>
    </div>
  
  );
}
