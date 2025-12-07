'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { fetchCamperById } from '@/lib/api';
import { Camper } from '@/lib/types';
import Gallery from '@/components/Gallery/Gallery';
import ReviewsList from '@/components/ReviewsList/ReviewsList';
import BookingForm from '@/components/BookingForm/BookingForm';
import css from './CatalogId.module.css';
import { AiFillStar } from 'react-icons/ai';
import FeatureIcon from '@/components/FeatureIcon/FeatureIcon';

export default function CamperPage() {
  const params = useParams();

  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [camper, setCamper] = useState<Camper | null>(null);
  const [active, setActive] = useState<'features' | 'reviews'>('features');

  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        const data = await fetchCamperById(id);
        setCamper(data);
      } catch (err) {
        console.error('Failed to fetch camper:', err);
      }
    })();
  }, [id]);

  if (!camper) return <p>Loading...</p>;

  const formatParam = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

  const featuresMap: { key: keyof Camper; label: string; icon: string }[] = [
    { key: 'AC', label: 'AC', icon: 'ac' },
    { key: 'bathroom', label: 'Bathroom', icon: 'shower' },
    { key: 'kitchen', label: 'Kitchen', icon: 'kitchen' },
    { key: 'TV', label: 'TV', icon: 'icon-tv' },
    { key: 'radio', label: 'Radio', icon: 'radio' },
    { key: 'refrigerator', label: 'Refrigerator', icon: 'refrigerator' },
    { key: 'microwave', label: 'Microwave', icon: 'microwave' },
    { key: 'gas', label: 'Gas', icon: 'gas' },
    { key: 'water', label: 'Water', icon: 'water' },
    { key: 'engine', label: formatParam(camper.engine), icon: 'petrol' },
    { key: 'transmission', label: formatParam(camper.transmission), icon: 'transmission' },
  ];

  return (
    <div className="container">
      <h2 className={css.title}>{camper.name}</h2>
      <div className={css.rateAndLocContainer}>
        <div className={css.rating}>
          <AiFillStar color="#ffc107" />
          <div className={css.spanRateContainer}>
            <span className={css.text}>{camper.rating.toFixed(1)}</span>
            <span className={css.text}>({camper.reviews?.length || 0} Reviews)</span>
          </div>
        </div>
        <p>{camper.location}</p>
      </div>
      
      <p className={css.price}>€{camper.price.toFixed(2)}</p>

      <div className={css.galleryContainer}>
        <Gallery images={camper.gallery ?? []} />
      </div>

      <p className={css.description}>{camper.description}</p>

      <div className={css.tabs}>
        <button
          type="button"
          onClick={() => setActive('features')}
          className={`${css.tabBtn} ${active === 'features' ? css.active : ''}`}
        >
          Features
        </button>

        <button
          type="button"
          onClick={() => setActive('reviews')}
          className={`${css.tabBtn} ${active === 'reviews' ? css.active : ''}`}
        >
          Reviews
        </button>
      </div>

      <hr className={css.stroke} />

      <div className={css.modalAndDetailsContainer}>
        {active === 'features' ? (
          <div className={css.features}>
            <div className={css.featuresList}>
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

            <h3 className={css.subTitle}>Vehicle details</h3>
            <hr className={css.subStroke} />
            <ul className={css.detailsList}>
              {camper.form && <li>Form: <span className={css.upperCase}>{camper.form}</span></li>}
              {camper.length && <li>Length: <span>{camper.length}</span></li>}
              {camper.width && <li>Width: <span>{camper.width}</span></li>}
              {camper.height && <li>Height: <span>{camper.height}</span></li>}
              {camper.tank && <li>Tank: <span>{camper.tank}</span></li>}
              {camper.consumption && <li>Consumption: <span>{camper.consumption}</span></li>}
            </ul>
          </div>
        ) : (
          <ReviewsList reviews={camper.reviews ?? []} />
        )}

        <BookingForm camperId={camper.id} camperName={camper.name} />
      </div>
    </div>
  );
}
