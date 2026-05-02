import React, { useMemo, useState } from 'react';
import './styles.css';
import { String } from './String';
import { FretNumbers } from './FretNumbers';
import {
  buildChromaticRange,
  buildScaleNotes,
  defaultGuitarRoots,
  defaultStringsNumber,
  IFretboard,
  Note,
  Scale,
  scales,
  scaleToDefaultRoot,
} from './utils';
import { Settings } from './Settings';



export const Fretboard: React.FC = () => {
  const createFretboard = (strings: Note[], frets: number): IFretboard => {
    return strings.map((rootNote) => buildChromaticRange(rootNote, frets));
  };

  const [ scaleRoot, setScaleRoot ] = useState<Note>(Note.A);
  const [ frets, setFrets ] = useState<number>(12);
  const [ selectedScale, setSelectedScale ] = useState<Scale>('pentatonicMinor');
  const [ roots, setRoots ] = useState<Note[]>(defaultGuitarRoots);
  const [ isLeftHanded, setIsLeftHanded ] = useState<boolean>(false);
  const [ strings, setStrings ] = useState(defaultStringsNumber);

  const handleSetLeftHanded = () => setIsLeftHanded(prev => !prev);

  const fretboard = createFretboard(roots, frets);
  const selectedScaleNotes = useMemo(
    () => buildScaleNotes(scaleRoot, scales[selectedScale]),
    [scaleRoot, selectedScale],
  );

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
              selectedScaleNotes={selectedScaleNotes}
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