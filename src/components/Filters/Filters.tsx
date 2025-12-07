'use client';

import { useEffect, useState } from 'react';
import { useCampersStore } from '@/store/useCampersStore';
import type { CamperFilters } from '@/lib/types';
import css from './Filters.module.css';
import { fetchCampers } from '@/lib/api';

const FORM_MAP: Record<string, string> = {
  van: 'panelTruck',
  fully_integrated: 'fullyIntegrated',
  alcove: 'alcove',
};

export default function Filters() {
  const setFilters = useCampersStore(s => s.setFilters);
  const campers = useCampersStore(s => s.campers);

  const [filters, setLocalFilters] = useState<CamperFilters>({});

  const locations = Array.from(
    new Set(campers.map(c => c.location))
  );

  const toggleBoolean = (key: keyof CamperFilters) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const setValue = (key: keyof CamperFilters, value: string) => {
    setLocalFilters(prev => {
      if (!value) {
        const copy = { ...prev };
        delete copy[key];
        return copy;
      }
      return { ...prev, [key]: value };
    });
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    const filtersToSend = {
      ...filters,
      form: filters.form ? FORM_MAP[filters.form] : undefined,
    };

    await setFilters(filtersToSend);

    setLocalFilters({
      ...filters,
    });
  };

  return (
    <form className={css.filters} onSubmit={handleSearch}>

      {/* LOCATION */}
      <div className={css.blockLocation}>
        <label htmlFor="location" className={css.blockName}>
          Location
        </label>

        <div className={css.selectWrapper}>
          {/* Немає відповідного енд-поінту для відображення усього списку міст відразу. 
          У майбутньому буде створен статичний масив з усіх унікальних міст */}
          <select
            id="location"
            value={filters.location || ''}
            onChange={e => setValue('location', e.target.value)}
            className={css.select}
          >
            <option value="">City</option>
            {locations.map(loc => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>

          <span className={css.selectArrow} />
        </div>
      </div>

      {/* VEHICLE EQUIPMENT */}
      
      <p className={css.blockName}>Filters</p>

      <div className={css.blockVehicleEquipment}>
        <legend className={css.blockTitle}>Vehicle equipment</legend>
        <hr className={css.stroke} />
        <div className={css.row}>
          {(['AC', 'kitchen', 'TV', 'bathroom'] as const).map(key => (
            <button
              type="button"
              key={key}
              className={`${css.filterBtn} ${filters[key] ? css.active : ''}`}
              onClick={() => toggleBoolean(key)}
            >
              {key}
            </button>
          ))}

          <button
            type="button"
            className={`${css.filterBtn} ${
              filters.transmission === 'automatic' ? css.active : ''
            }`}
            onClick={() =>
              setValue(
                'transmission',
                filters.transmission === 'automatic' ? '' : 'automatic'
              )
            }
          >
            Automatic
          </button>
        </div>
      </div>

      {/* FORM */}
      <div className={css.blockVehicleEquipment}>
        <legend className={css.blockTitle}>Vehicle type</legend>
        <hr className={css.stroke} />
        <div className={css.row}>
          <button
            type="button"
            className={`${css.filterBtn} ${filters.form === 'van' ? css.active : ''}`}
            onClick={() => setValue('form', filters.form === 'van' ? '' : 'van')}
          >
            Van
          </button>

          <button
            type="button"
            className={`${css.filterBtn} ${filters.form === 'fully_integrated' ? css.active : ''}`}
            onClick={() =>
              setValue(
                'form',
                filters.form === 'fully_integrated' ? '' : 'fully_integrated'
              )
            }
          >
            Fully Integrated
          </button>

          <button
            type="button"
            className={`${css.filterBtn} ${filters.form === 'alcove' ? css.active : ''}`}
            onClick={() =>
              setValue(
                'form',
                filters.form === 'alcove' ? '' : 'alcove'
              )
            }
          >
            Alcove
          </button>
        </div>
      </div>

      <button type="submit" className={css.searchBtn}>
        Search
      </button>
    </form>
  );
}