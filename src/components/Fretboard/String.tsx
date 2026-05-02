import React from 'react';
import { Note } from './utils';

interface StringProps {
  stringRoot: Note;
  string: Note[];
  scaleRoot: Note;
  selectedScaleNotes: Note[];
  stringNum: number;
  chordMode: boolean;
  chordMask: { open: boolean; frets: boolean[] } | null;
}

export const String: React.FC<StringProps> = ({
  stringRoot,
  string,
  scaleRoot,
  selectedScaleNotes,
  stringNum,
  chordMode,
  chordMask,
}) => {
  const selectedOpen =
    chordMode && chordMask ? chordMask.open : selectedScaleNotes.indexOf(stringRoot) !== -1;

  const showRootOpen = !chordMode && scaleRoot === stringRoot;

  return (
    <section className="string">
      <div
        className={`string-note ${selectedOpen ? 'selected' : ''} ${showRootOpen ? 'root' : ''}`}
      >
        {stringRoot}
      </div>
      <div className="frets">
        {string.map((fret, id) => {
          const selectedFret =
            chordMode && chordMask
              ? chordMask.frets[id] ?? false
              : selectedScaleNotes.indexOf(fret) !== -1;

          const showRootFret = !chordMode && fret === scaleRoot;

          return (
            <div
              key={id}
              className={`fret ${selectedFret ? 'selected' : ''} ${showRootFret ? 'root' : ''}`}
            >
              {fret}
            </div>
          );
        })}
      </div>
      <div className="string-number">{stringNum}</div>
    </section>
  );
}