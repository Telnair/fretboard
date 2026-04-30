import React from 'react';
import { Note, SelectedNote, Scale } from './types';
import { notes, scales, defaultGuitarRoots, frets_options, strings_options, default_strings_number } from './consts';
import { scaleToLabel } from './helpers';

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
}) => {
  return (
    <div className="settings">
      <div className="settings__tuning">
        <div className="settings-field">Tuning:</div>
        <div style={{ direction: 'rtl' }}>
          {roots.slice(default_strings_number - strings).map((rootNote, id) => (
            <select value={rootNote} key={rootNote + id} onChange={(e: React.SyntheticEvent<HTMLSelectElement>) => onSetRoots(roots.map((r, idx) => idx === id ? e.currentTarget.value as Note : r))}>
              {notes.map((root, id) => (
                <option key={root + id} value={root}>{root}</option>
              ))}
            </select>
          ))}
        </div>
      </div>
      <div className="settings__scale">
        <div className="settings__scale-root">
          <div className="settings-field">Scale / Root:</div>
          <select value={selectedScale} onChange={(e: React.SyntheticEvent<HTMLSelectElement>) => onSetSelectedScale(e.currentTarget.value as Scale)}>
            {Object.keys(scales).map(scale => (
              <option key={scale} value={scale}>{scaleToLabel[scale as Scale]}</option>
            ))}
          </select>
          <select value={scaleRoot} onChange={(e: React.SyntheticEvent<HTMLSelectElement>) => onSetScaleRoot(e.currentTarget.value as Note)}>
            {notes.map(note => (
              <option key={note} value={note}>{note}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="settings__frets">
        <div className="settings-field">Frets / Strings:</div>
        <select value={frets} onChange={(e: React.SyntheticEvent<HTMLSelectElement>) => onSetFrets(+e.currentTarget.value)}>
          {frets_options.map((id) => (
            <option key={id} value={id}>{id}</option>
          ))}
        </select>
        <select value={strings} onChange={(e: React.SyntheticEvent<HTMLSelectElement>) => onSetStrings(+e.currentTarget.value)}>
          {strings_options.map((id) => (
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