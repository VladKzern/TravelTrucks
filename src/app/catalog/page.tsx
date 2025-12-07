'use client';
import { useEffect } from 'react';
import { useCampersStore } from '@/store/useCampersStore';
import CamperCard from "@/components/CamperCard/CamperCard";
import Filters from "@/components/Filters/Filters";
import css from './Catalog.module.css';

export default function CatalogPage() {
  const { campers, loadCampers, isLoading, hasMore, resetResults } = useCampersStore();

  useEffect(() => {
    // initial load
    resetResults();
    loadCampers(false);
  }, [loadCampers, resetResults]);
  console.log('campers:', campers);

  return (
    <section className="container">
      <div className={css.container}>
        <Filters />
        <div className={css.grid}>
          {campers?.map?.(c => (
            <CamperCard key={c.id} camper={c} />
          )) || <p>Немає доступних кемперів</p>}

          {hasMore && !isLoading && (
            <button className={css.loadMore} onClick={() => loadCampers(true)}>Load More</button>
          )}
        </div>

        {isLoading && <p>Завантаження...</p>} 
      </div>
    </section>
  );
}
