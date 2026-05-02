import React, { useMemo, useState } from 'react';
import './styles.css';
import { String } from './String';
import { FretNumbers } from './FretNumbers';
import {
  buildChromaticRange,
  buildScaleNotes,
  chordFingeringMaskForString,
  defaultGuitarRoots,
  defaultStringsNumber,
  getPrimaryChordVoicing,
  Note,
  POPULAR_GUITAR_CHORDS,
  Scale,
  scales,
  scaleToDefaultRoot,
} from './utils';
import { Settings } from './Settings';



export const Fretboard: React.FC = () => {
  const [ scaleRoot, setScaleRoot ] = useState<Note>(Note.A);
  const [ frets, setFrets ] = useState<number>(12);
  const [ selectedScale, setSelectedScale ] = useState<Scale>('pentatonicMinor');
  const [ roots, setRoots ] = useState<Note[]>(defaultGuitarRoots);
  const [ isLeftHanded, setIsLeftHanded ] = useState<boolean>(false);
  const [ strings, setStrings ] = useState(defaultStringsNumber);
  const [ selectedChordId, setSelectedChordId ] = useState<string | null>(null);

  const handleSetLeftHanded = () => setIsLeftHanded(prev => !prev);

  const selectedScaleNotes = useMemo(
    () => buildScaleNotes(scaleRoot, scales[selectedScale]),
    [scaleRoot, selectedScale],
  );

  const selectedChord = useMemo(
    () => POPULAR_GUITAR_CHORDS.find((c) => c.id === selectedChordId) ?? null,
    [selectedChordId],
  );

  const primaryChordVoicing = useMemo(
    () => (selectedChord ? getPrimaryChordVoicing(selectedChord) : null),
    [selectedChord],
  );

  // When a chord is selected the fretboard renders as standard EADGBE regardless of tuning.
  const chordMode = primaryChordVoicing !== null;
  const effectiveRoots = chordMode ? defaultGuitarRoots : roots;
  const effectiveFretboard = useMemo(
    () => effectiveRoots.map((r) => buildChromaticRange(r, frets)),
    [effectiveRoots, frets],
  );

  const handleSetSelectedScale = (scale: Scale) => {
    setSelectedScale(scale);
    setScaleRoot(scaleToDefaultRoot[scale]);
    setSelectedChordId(null);
  };

  return (
    <div className="root" style={{ height: window?.innerHeight }}>
      <div className={`fretboard ${isLeftHanded ? 'left-handed' : ''}`}>
        <div className="frets-label">{isLeftHanded ? 'Frets ←' : 'Frets →'}</div>
        <FretNumbers frets={frets} />
        {effectiveRoots.map((root, id) => {
          const minId = defaultStringsNumber - strings;
          if (id < minId) return null;
 
          return (
            <String
              stringNum={id + 1}
              stringRoot={root}
              selectedScaleNotes={selectedScaleNotes}
              scaleRoot={scaleRoot}
              key={id}
              string={effectiveFretboard[id]}
              chordMode={chordMode}
              chordMask={
                chordMode && primaryChordVoicing
                  ? chordFingeringMaskForString(primaryChordVoicing, id, frets)
                  : null
              }
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
        popularChords={POPULAR_GUITAR_CHORDS}
        selectedChordId={selectedChordId}
        onSetSelectedChordId={setSelectedChordId}
        chordMode={chordMode}
      />
    </div>
  );
}