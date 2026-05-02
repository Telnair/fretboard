import React from 'react';
import { accentedFrets } from './utils';

export const FretNumbers: React.FC<{ frets: number }> = ({ frets }) => {
  return (
    <div className="fret-numbers">
      {Array(frets).fill(null).map((_, id) => (
        <div className={`fret-number ${accentedFrets.includes(id + 1) ? 'fret-number-accented' : ''}`} key={id}>{id + 1}</div>
      ))}
    </div>
  );
}