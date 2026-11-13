import React from 'react';
import { PROVINCES } from '../../data/provinces';
import { ProvinceId } from '../../types';

interface ProvinceFilterBarProps {
  selected: ProvinceId | 'all';
  onSelect: (provinceId: ProvinceId | 'all') => void;
}

export const ProvinceFilterBar: React.FC<ProvinceFilterBarProps> = ({
  selected,
  onSelect,
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onSelect('all')}
        className={`px-3.5 py-2 rounded-full text-xs sm:text-sm font-medium border transition-colors ${
          selected === 'all'
            ? 'bg-heritage-burgundy text-white border-heritage-burgundy shadow-sm'
            : 'bg-white text-heritage-ink border-heritage-gold/40 hover:bg-heritage-paper'
        }`}
      >
        Tất cả 5 tỉnh
      </button>
      {PROVINCES.map((p) => (
        <button
          key={p.id}
          type="button"
          onClick={() => onSelect(p.id)}
          className={`px-3.5 py-2 rounded-full text-xs sm:text-sm font-medium border transition-colors ${
            selected === p.id
              ? 'bg-heritage-burgundy text-white border-heritage-burgundy shadow-sm'
              : 'bg-white text-heritage-ink border-heritage-gold/40 hover:bg-heritage-paper'
          }`}
        >
          {p.name.replace('Thành phố ', 'TP. ').replace('Tỉnh ', '')}
        </button>
      ))}
    </div>
  );
};
