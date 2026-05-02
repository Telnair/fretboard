import React, { useState } from 'react';
import './styles.css';
import { String } from './String';
import { FretNumbers } from './FretNumbers';
import { notes, defaultGuitarRoots, scales, defaultStringsNumber, IFretboard, Note, Scale, scaleToDefaultRoot } from './utils';
import { Settings } from './Settings';



export const Fretboard: React.FC = () => {
  const getNoteByInterval = (note: Note, interval: number): Note => {
    const dir = interval < 0 ? 'desc' : 'asc';
    const noteReducer = (fn: (note: Note) => Note) => Array(Math.abs(interval * 2)).fill(null).reduce(fn, note);
    return dir === 'asc' ? noteReducer(getNextNote) : noteReducer(getPrevNote);
  };

  const getNextNote = (note: Note): Note => {
    const noteIdx = notes.indexOf(note);
    return notes[noteIdx >= notes.length - 1 ? 0 : noteIdx + 1];
  };

  const getPrevNote = (note: Note): Note => {
    const noteIdx = notes.indexOf(note);
    return notes[noteIdx === 0 ? notes.length - 1 : noteIdx - 1];
  };

  const createNoteRange = (rootNote: Note, range: number[]): Note[] => {
    let currentRoot = rootNote;
    return range.map((interval) => {
      const note = getNoteByInterval(currentRoot, interval)
      currentRoot = note;
      return note;
    });
  };

  const createFretboard = (strings: Note[], frets: number): IFretboard => {
    return strings.map(rootNote => createNoteRange(rootNote, Array(frets).fill(0.5)));
  };

  const [ scaleRoot, setScaleRoot ] = useState<Note>(Note.A);
  const [ frets, setFrets ] = useState<number>(12);
  const [ selectedScale, setSelectedScale ] = useState<Scale>('pentatonicMinor');
  const [ roots, setRoots ] = useState<Note[]>(defaultGuitarRoots);
  const [ isLeftHanded, setIsLeftHanded ] = useState<boolean>(false);
  const [ strings, setStrings ] = useState(defaultStringsNumber);

  const handleSetLeftHanded = () => setIsLeftHanded(prev => !prev);

  const fretboard = createFretboard(roots, frets);

  const handleSetSelectedScale = (scale: Scale) => {
    setSelectedScale(scale);
    setScaleRoot(scaleToDefaultRoot[scale]);
  };

  return (
    <div className="root" style={{ height: window?.innerHeight }}>
      <div className={`fretboard ${isLeftHanded ? 'left-handed' : ''}`}>
        <div className="frets-label">{isLeftHanded ? 'Frets ←' : 'Frets →'}</div>
        <FretNumbers frets={frets} />
        {roots.map((root, id) => {
          const minId = defaultStringsNumber - strings;
          if (id < minId) return null;
 
          return (
            <String
              stringNum={id + 1}
              stringRoot={root}
              selectedScaleNotes={createNoteRange(scaleRoot, scales[selectedScale])}
              scaleRoot={scaleRoot}
              key={id}
              string={fretboard[id]}
            />
          );
        })}
          <FretNumbers frets={frets} />
          <div className="open-strings-label">↑ <br /> Open Strings</div>
      </div>
      <Settings
        scaleRoot={scaleRoot}
        onSetScaleRoot={setScaleRoot}
        frets={frets}
        onSetFrets={setFrets}
        onSetSelectedScale={handleSetSelectedScale}
        selectedScale={selectedScale}
        isLeftHanded={isLeftHanded}
        onSetIsLeftHanded={handleSetLeftHanded}
        roots={roots}
        onSetRoots={setRoots}
        strings={strings}
        onSetStrings={setStrings}
      />
    </div>
  );
}