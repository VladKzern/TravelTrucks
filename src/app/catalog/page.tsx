'use client';
import { useEffect } from 'react';
import { useCampersStore } from '@/store/useCampersStore';
import CamperCard from "@/components/CamperCard/CamperCard";
import Filters from "@/components/Filters/Filters";
import styles from './Catalog.module.css';

export default function CatalogPage() {
  const { campers, loadCampers, isLoading, hasMore, resetResults } = useCampersStore();

  useEffect(() => {
    // initial load
    resetResults();
    loadCampers(false);
  }, [loadCampers, resetResults]);
  console.log('campers:', campers);

  return (
    <div className={styles.container}>
      <h2>Каталог кемперів</h2>
      <Filters />
      <div className={styles.grid}>
        {campers?.map?.(c => (
          <CamperCard key={c.id} camper={c} />
        )) || <p>Немає доступних кемперів</p>}
      </div>

      {isLoading && <p>Завантаження...</p>}
      {hasMore && !isLoading && (
        <button className={styles.loadMore} onClick={() => loadCampers(true)}>Load More</button>
      )}
      {!hasMore && <p>Більше оголошень немає</p>}
    </div>
  );
}
