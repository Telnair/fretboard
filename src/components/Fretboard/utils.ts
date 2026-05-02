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

const SEMITONES_IN_OCTAVE = 12;

const noteToIndex = notes.reduce<Record<Note, number>>((acc, note, index) => {
  acc[note] = index;
  return acc;
}, {} as Record<Note, number>);

export const scales = {
  chromatic: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  pentatonicMinor: [0, 3, 5, 7, 10],
  pentatonicMajor: [0, 2, 4, 7, 9],
  major: [0, 2, 4, 5, 7, 9, 11],
  natMinor: [0, 2, 3, 5, 7, 8, 10],
  bluesMinor: [0, 3, 5, 6, 7, 10],
  bluesMajor: [0, 2, 3, 4, 7, 9],
  harmonicMinor: [0, 2, 3, 5, 7, 8, 11],
  melodicMinor: [0, 2, 3, 5, 7, 9, 11],
  dorian: [0, 2, 3, 5, 7, 9, 10],
  phrygian: [0, 1, 3, 5, 7, 8, 10],
  lydian: [0, 2, 4, 6, 7, 9, 11],
  mixolydian: [0, 2, 4, 5, 7, 9, 10],
  locrian: [0, 1, 3, 5, 6, 8, 10],
  minorPentatonicAdd9: [0, 2, 3, 5, 8, 10],
  japaneseInSen: [0, 1, 4, 6, 10],
  hirajoshi: [0, 2, 3, 6, 8],
  wholeTone: [0, 2, 4, 6, 8, 10],
  diminishedWholeHalf: [0, 2, 3, 5, 6, 8, 9, 11],
  diminishedHalfWhole: [0, 1, 3, 4, 6, 7, 9, 10],
}

export type Scale = keyof typeof scales;

const normalizeSemitoneOffset = (offset: number): number =>
  ((offset % SEMITONES_IN_OCTAVE) + SEMITONES_IN_OCTAVE) % SEMITONES_IN_OCTAVE;

const getNoteAtOffset = (rootNote: Note, semitoneOffset: number): Note => {
  const rootIndex = noteToIndex[rootNote];
  const targetIndex = normalizeSemitoneOffset(rootIndex + semitoneOffset);

  return notes[targetIndex];
};

export const buildScaleSemitoneOffsets = (offsets: number[]): number[] => {
  const normalizedOffsets = offsets.map((offset) => normalizeSemitoneOffset(offset));
  const seen = new Set<number>();

  return normalizedOffsets.filter((offset) => {
    if (seen.has(offset)) {
      return false;
    }

    seen.add(offset);
    return true;
  });
};

export const buildScaleNotes = (rootNote: Note, offsets: number[]): Note[] =>
  buildScaleSemitoneOffsets(offsets).map((offset) => getNoteAtOffset(rootNote, offset));

export const buildChromaticRange = (rootNote: Note, semitoneCount: number): Note[] =>
  Array.from({ length: semitoneCount }, (_, index) => getNoteAtOffset(rootNote, index + 1));

export const hasValidScaleOffsets = (offsets: number[]): boolean =>
  offsets.every((offset) => Number.isInteger(offset) && offset >= 0 && offset < SEMITONES_IN_OCTAVE);

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