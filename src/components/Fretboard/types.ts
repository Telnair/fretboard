export enum Note {
  A = 'A',
  Bb = 'A#',
  B = 'B',
  C = 'C',
  Db = 'C#',
  D = 'D',
  Eb = 'D#',
  E = 'E',
  F = 'F',
  Gb = 'F#',
  G = 'G',
  Ab = 'G#',
}

export type Scale = 'natMinor' | 'major' | 'pentatonicMinor' | 'pentatonicMajor' | 'bluesMinor' | 'bluesMajor';

export type IFretboard = Array<Note[]>;

export type SelectedNote = Note | null;