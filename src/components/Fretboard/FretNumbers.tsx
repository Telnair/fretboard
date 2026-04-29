import React from 'react';
import { accented_frets } from './consts';

export const FretNumbers: React.FC<{ frets: number }> = ({ frets }) => {
  return (
    <div className="fret-numbers">
      {Array(frets).fill(null).map((_, id) => (
        <div className={`fret-number ${accented_frets.includes(id + 1) ? 'fret-number-accented' : ''}`} key={id}>{id + 1}</div>
      ))}
    </div>
  );
}