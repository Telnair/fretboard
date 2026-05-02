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

export type IFretboard = Array<Note[]>;

export type SelectedNote = Note | null;

export const defaultStringsNumber = 6;

export const stringsNumberOptions = [4, 5, 6];

export const fretsOptions = [12, 15, 18, 22, 24];

export const accentedFrets = [3, 5, 7, 9, 12, 15, 17, 19, 21, 24];

export const notes: Note[] = Object.values(Note);

export const scales = {
  chromatic: [0, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
  pentatonicMinor: [0, 1.5, 1, 1, 1.5, 1],
  pentatonicMajor: [0, 1, 1, 1.5, 1, 1.5],
  major: [0, 1, 1, 0.5, 1, 1, 1, 0.5],
  natMinor: [0, 1, 0.5, 1, 1, 0.5, 1, 1],
  bluesMinor: [0, 1.5, 1, 0.5, 0.5, 1.5, 1],
  bluesMajor: [0, 1, 0.5, 0.5, 1.5, 1, 1.5],
  harmonicMinor: [0, 1, 0.5, 1, 1, 0.5, 1.5, 0.5],
  melodicMinor: [0, 1, 0.5, 1, 1, 1, 1, 0.5],
  dorian: [0, 1, 0.5, 1, 1, 1, 0.5, 1],
  phrygian: [0, 0.5, 1, 1, 1, 0.5, 1, 1],
  lydian: [0, 1, 1, 1, 0.5, 1, 1, 0.5],
  mixolydian: [0, 1, 1, 0.5, 1, 1, 0.5, 1],
  locrian: [0, 0.5, 1, 1, 0.5, 1, 1, 1],
  minorPentatonicAdd9: [0, 1, 0.5, 1, 1.5, 1, 1],
  japaneseInSen: [0, 0.5, 1.5, 1, 2],
  hirajoshi: [0, 1, 0.5, 1.5, 1],
  wholeTone: [0, 1, 1, 1, 1, 1, 1],
  diminishedWholeHalf: [0, 1, 0.5, 1, 0.5, 1, 0.5, 1, 0.5],
  diminishedHalfWhole: [0, 0.5, 1, 0.5, 1, 0.5, 1, 0.5, 1],
}

export type Scale = keyof typeof scales;

export const scaleToDefaultRoot: Record<Scale, Note> = {
  chromatic: Note.C,
  pentatonicMinor: Note.A,
  pentatonicMajor: Note.C,
  major: Note.C,
  natMinor: Note.A,
  bluesMinor: Note.A,
  bluesMajor: Note.C,
  harmonicMinor: Note.A,
  melodicMinor: Note.A,
  dorian: Note.D,
  phrygian: Note.E,
  lydian: Note.F,
  mixolydian: Note.G,
  locrian: Note.B,
  minorPentatonicAdd9: Note.A,
  japaneseInSen: Note.E,
  hirajoshi: Note.A,
  wholeTone: Note.C,
  diminishedWholeHalf: Note.C,
  diminishedHalfWhole: Note.C,
};

export const defaultGuitarRoots = [ Note.E, Note.A, Note.D, Note.G, Note.B, Note.E ].reverse();

export const scaleToLabel: Record<Scale, string> = {
  natMinor: 'Natural Minor',
  major: 'Major',
  pentatonicMajor: 'Pentatonic Major',
  pentatonicMinor: 'Pentatonic Minor',
  bluesMajor: 'Blues Major',
  bluesMinor: 'Blues Minor',
  chromatic: 'Chromatic',

  harmonicMinor: 'Harmonic Minor',
  melodicMinor: 'Melodic Minor',

  dorian: 'Dorian',
  phrygian: 'Phrygian',
  lydian: 'Lydian',
  mixolydian: 'Mixolydian',
  locrian: 'Locrian',

  minorPentatonicAdd9: 'Minor Pentatonic (Add 9)',

  japaneseInSen: 'Japanese (In Sen)',
  hirajoshi: 'Hirajoshi',

  wholeTone: 'Whole Tone',

  diminishedWholeHalf: 'Diminished (Whole–Half)',
  diminishedHalfWhole: 'Diminished (Half–Whole)',
};