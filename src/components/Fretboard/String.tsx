import React from 'react';
import { Note, SelectedNote, Scale } from './types';

interface String {
  stringRoot: Note;
  string: Note[];
  scaleRoot: Note;
  selectedScaleNotes: Note[];
}

export const String: React.FC<String> = ({ stringRoot, string, scaleRoot, selectedScaleNotes }) => {
  return (
    <section className="string">
      <div className={`string-number ${selectedScaleNotes.indexOf(stringRoot) !== -1 ? 'selected' : ''}`}>{stringRoot}</div>
      <div className="frets">
        {string.map((fret, id) =>
          <div
            key={id}
            className={`fret ${selectedScaleNotes.indexOf(fret) !== -1 ? 'selected' : ''} ${fret === scaleRoot ? 'root' : ''}`}
          >
            {fret}
          </div>)}
      </div>
    </section>
  );
}