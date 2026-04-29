import React from 'react';
import { Note, SelectedNote, Scale } from './types';

interface String {
  stringRoot: Note;
  string: Note[];
  scaleRoot: Note;
  selectedScaleNotes: Note[];
  stringNum: number;
}

export const String: React.FC<String> = ({ stringRoot, string, scaleRoot, selectedScaleNotes, stringNum }) => {
  return (
    <section className="string">
      <div className={`string-note ${selectedScaleNotes.indexOf(stringRoot) !== -1 ? 'selected' : ''}`}>{stringRoot}</div>
      <div className="frets">
        {string.map((fret, id) =>
          <div
            key={id}
            className={`fret ${selectedScaleNotes.indexOf(fret) !== -1 ? 'selected' : ''} ${fret === scaleRoot ? 'root' : ''}`}
          >
            {fret}
          </div>)}
      </div>
      <div className="string-number">{stringNum}</div>
    </section>
  );
}