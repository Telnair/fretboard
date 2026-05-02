import React from 'react';
import {
  notes,
  scales,
  fretsOptions,
  stringsNumberOptions,
  defaultStringsNumber,
  Note,
  Scale,
  scaleToLabel,
  type PopularChord,
} from './utils';

interface SettingsProps {
  scaleRoot: Note;
  onSetScaleRoot: (nextRoot: Note) => void;
  frets: number;
  onSetFrets: (frets: number) => void;
  selectedScale: Scale;
  onSetSelectedScale: (nextScale: Scale) => void;
  isLeftHanded: boolean;
  onSetIsLeftHanded: () => void;
  roots: Note[];
  onSetRoots: (newRoots: Note[]) => void;
  onSetStrings: (strings: number) => void;
  strings: number;
  popularChords: PopularChord[];
  selectedChordId: string | null;
  onSetSelectedChordId: (id: string | null) => void;
  chordMode: boolean;
}

export const Settings: React.FC<SettingsProps> = ({
  scaleRoot,
  onSetFrets,
  onSetScaleRoot,
  frets,
  onSetIsLeftHanded,
  isLeftHanded,
  roots,
  onSetRoots,
  onSetSelectedScale,
  selectedScale,
  onSetStrings,
  strings,
  popularChords,
  selectedChordId,
  onSetSelectedChordId,
  chordMode,
}) => {
  return (
    <div className="settings">
      <div className="settings__chord">
        <div className="settings-field">Chord:</div>
        <select
          aria-label="Chord highlight"
          value={selectedChordId ?? ''}
          onChange={(e: React.SyntheticEvent<HTMLSelectElement>) => {
            const v = e.currentTarget.value;
            onSetSelectedChordId(v === '' ? null : v);
          }}
        >
          <option value="">None</option>
          {popularChords.map((c) => (
            <option key={c.id} value={c.id}>{c.label}</option>
          ))}
        </select>
      </div>
      <div className={`settings__scale ${chordMode ? 'settings--muted' : ''}`}>
        <div className="settings__scale-root">
          <div className="settings-field">Scale / Root:</div>
          <select aria-label="Scale type" disabled={chordMode} value={selectedScale} onChange={(e: React.SyntheticEvent<HTMLSelectElement>) => onSetSelectedScale(e.currentTarget.value as Scale)}>
            {Object.keys(scales).map(scale => (
              <option key={scale} value={scale}>{scaleToLabel[scale as Scale]}</option>
            ))}
          </select>
          <select aria-label="Scale root note" disabled={chordMode} value={scaleRoot} onChange={(e: React.SyntheticEvent<HTMLSelectElement>) => onSetScaleRoot(e.currentTarget.value as Note)}>
            {notes.map(note => (
              <option key={note} value={note}>{note}</option>
            ))}
          </select>
        </div>
      </div>
      <div className={`settings__tuning ${chordMode ? 'settings--muted' : ''}`}>
        <div className="settings-field">Tuning:</div>
        <div style={{ direction: 'rtl' }}>
          {roots.map((rootNote, id) => {
            const minId = defaultStringsNumber - strings;
            if (id < minId) return null;

            return (
              <select disabled={chordMode} value={rootNote} key={rootNote + id} onChange={(e: React.SyntheticEvent<HTMLSelectElement>) => onSetRoots(roots.map((r, idx) => idx === id ? e.currentTarget.value as Note : r))}>
                {notes.map((root, id) => (
                  <option key={root + id} value={root}>{root}</option>
                ))}
              </select>
            )
          })}
        </div>
      </div>
      <div className="settings__frets">
        <div className="settings-field">Frets / Strings:</div>
        <select value={frets} onChange={(e: React.SyntheticEvent<HTMLSelectElement>) => onSetFrets(+e.currentTarget.value)}>
          {fretsOptions.map((id) => (
            <option key={id} value={id}>{id}</option>
          ))}
        </select>
        <select value={strings} onChange={(e: React.SyntheticEvent<HTMLSelectElement>) => onSetStrings(+e.currentTarget.value)}>
          {stringsNumberOptions.map((id) => (
            <option key={id} value={id}>{id}</option>
          ))}
        </select>
      </div>
      <div className="settings__checkbox">
        <div className="settings-field">LH mode:</div>
        <input type="checkbox" style={{ width: 17, height: 17 }} checked={isLeftHanded} onChange={onSetIsLeftHanded} />
      </div>
    </div>
  );
}