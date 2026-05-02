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

/** Pitch class 0..11 */
export const pitchClass = (note: Note): number => noteToIndex[note];

export const transposeFromRoot = (rootNote: Note, semitoneOffset: number): Note => {
  const rootIndex = noteToIndex[rootNote];
  const targetIndex = normalizeSemitoneOffset(rootIndex + semitoneOffset);

  return notes[targetIndex];
};

export type ChordQuality =
  | 'major'
  | 'minor'
  | 'diminished'
  | 'dominant7'
  | 'major7'
  | 'minor7';

/** Dropdown entry; order ≈ frequency in guitar-oriented songs (campfire / rock / pop charts). */
export interface PopularChord {
  id: string;
  label: string;
  root: Note;
  quality: ChordQuality;
  /**
   * Fingering for standard EADGBE tuning.
   * Index 0 = high e, 1 = B, 2 = G, 3 = D, 4 = A, 5 = low E.
   * null = muted string, 0 = open string, n = fret n.
   */
  standardTuningFrets: (number | null)[];
}

export interface ChordVoicing {
  /** Per string index 0..5 (same order as `roots`); `null` = muted / not played */
  frets: (number | null)[];
}

/** Semitone intervals from root (including 0) for each chord type. */
const chordToneIntervals: Record<ChordQuality, number[]> = {
  major: [0, 4, 7],
  minor: [0, 3, 7],
  diminished: [0, 3, 6],
  dominant7: [0, 4, 7, 10],
  major7: [0, 4, 7, 11],
  minor7: [0, 3, 7, 10],
};

/**
 * Conventional guitar fingerings for standard EADGBE tuning.
 * Array index: 0=high-e, 1=B, 2=G, 3=D, 4=A, 5=low-E.
 * null=muted, 0=open, n=fret n.
 *
 * Verified pitch classes (A=0, Bb=1, B=2, C=3, Db=4, D=5, Eb=6, E=7, F=8, Gb=9, G=10, Ab=11):
 *   String open pitches: [E=7, B=2, G=10, D=5, A=0, E=7]
 */
export const POPULAR_GUITAR_CHORDS: PopularChord[] = [
  // G 320003: E=3(G✓) B=0(B✓) G=0(G✓) D=0(D✓) A=2(B✓) lowE=3(G✓)
  { id: 'G|major', label: 'G', root: Note.G, quality: 'major', standardTuningFrets: [3, 0, 0, 0, 2, 3] },
  // C x32010: E=0(E✓) B=1(C✓) G=0(G✓) D=2(E✓) A=3(C✓) lowE=null
  { id: 'C|major', label: 'C', root: Note.C, quality: 'major', standardTuningFrets: [0, 1, 0, 2, 3, null] },
  // D xx0232: E=2(F#✓) B=3(D✓) G=2(A✓) D=0(D✓) A=null lowE=null
  { id: 'D|major', label: 'D', root: Note.D, quality: 'major', standardTuningFrets: [2, 3, 2, 0, null, null] },
  // Em 022000: E=0(E✓) B=0(B✓) G=0(G✓) D=2(E✓) A=2(B✓) lowE=0(E✓)
  { id: 'E|minor', label: 'Em', root: Note.E, quality: 'minor', standardTuningFrets: [0, 0, 0, 2, 2, 0] },
  // Am x02210: E=0(E✓) B=1(C✓) G=2(A✓) D=2(E✓) A=0(A✓) lowE=null
  { id: 'A|minor', label: 'Am', root: Note.A, quality: 'minor', standardTuningFrets: [0, 1, 2, 2, 0, null] },
  // A x02220: E=0(E✓) B=2(C#✓) G=2(A✓) D=2(E✓) A=0(A✓) lowE=null
  { id: 'A|major', label: 'A', root: Note.A, quality: 'major', standardTuningFrets: [0, 2, 2, 2, 0, null] },
  // E 022100: E=0(E✓) B=0(B✓) G=1(Ab✓) D=2(E✓) A=2(B✓) lowE=0(E✓)
  { id: 'E|major', label: 'E', root: Note.E, quality: 'major', standardTuningFrets: [0, 0, 1, 2, 2, 0] },
  // Dm xx0231: E=1(F✓) B=3(D✓) G=2(A✓) D=0(D✓) A=null lowE=null
  { id: 'D|minor', label: 'Dm', root: Note.D, quality: 'minor', standardTuningFrets: [1, 3, 2, 0, null, null] },
  // F 133211: barre — E=1(F✓) B=1(C✓) G=2(A✓) D=3(F✓) A=3(C✓) lowE=1(F✓)
  { id: 'F|major', label: 'F', root: Note.F, quality: 'major', standardTuningFrets: [1, 1, 2, 3, 3, 1] },
  // B x24442: E=2(F#✓) B=4(Eb/D#✓) G=4(B✓) D=4(F#✓) A=2(B✓) lowE=null
  { id: 'B|major', label: 'B', root: Note.B, quality: 'major', standardTuningFrets: [2, 4, 4, 4, 2, null] },
  // G7 320001: E=1(F✓) B=0(B✓) G=0(G✓) D=0(D✓) A=2(B✓) lowE=3(G✓)
  { id: 'G|dominant7', label: 'G7', root: Note.G, quality: 'dominant7', standardTuningFrets: [1, 0, 0, 0, 2, 3] },
  // C7 x32310: E=0(E✓) B=1(C✓) G=3(Bb✓) D=2(E✓) A=3(C✓) lowE=null
  { id: 'C|dominant7', label: 'C7', root: Note.C, quality: 'dominant7', standardTuningFrets: [0, 1, 3, 2, 3, null] },
  // D7 xx0212: E=2(F#✓) B=1(C✓) G=2(A✓) D=0(D✓) A=null lowE=null
  { id: 'D|dominant7', label: 'D7', root: Note.D, quality: 'dominant7', standardTuningFrets: [2, 1, 2, 0, null, null] },
  // E7 020100: E=0(E✓) B=0(B✓) G=1(Ab✓) D=0(D✓) A=2(B✓) lowE=0(E✓)
  { id: 'E|dominant7', label: 'E7', root: Note.E, quality: 'dominant7', standardTuningFrets: [0, 0, 1, 0, 2, 0] },
  // A7 x02020: E=0(E✓) B=2(C#✓) G=0(G✓) D=2(E✓) A=0(A✓) lowE=null
  { id: 'A|dominant7', label: 'A7', root: Note.A, quality: 'dominant7', standardTuningFrets: [0, 2, 0, 2, 0, null] },
  // B7 x21202: E=2(F#✓) B=0(B✓) G=2(A✓) D=1(Eb✓) A=2(B✓) lowE=null
  { id: 'B|dominant7', label: 'B7', root: Note.B, quality: 'dominant7', standardTuningFrets: [2, 0, 2, 1, 2, null] },
  // F7 131211: barre — E=1(F✓) B=1(C✓) G=2(A✓) D=1(Eb✓) A=3(C✓) lowE=1(F✓)
  { id: 'F|dominant7', label: 'F7', root: Note.F, quality: 'dominant7', standardTuningFrets: [1, 1, 2, 1, 3, 1] },
  // Am7 x02010: E=0(E✓) B=1(C✓) G=0(G✓) D=2(E✓) A=0(A✓) lowE=null
  { id: 'A|minor7', label: 'Am7', root: Note.A, quality: 'minor7', standardTuningFrets: [0, 1, 0, 2, 0, null] },
  // Em7 020000: E=0(E✓) B=0(B✓) G=0(G✓) D=0(D✓) A=2(B✓) lowE=0(E✓)
  { id: 'E|minor7', label: 'Em7', root: Note.E, quality: 'minor7', standardTuningFrets: [0, 0, 0, 0, 2, 0] },
  // Dm7 xx0211: E=1(F✓) B=1(C✓) G=2(A✓) D=0(D✓) A=null lowE=null
  { id: 'D|minor7', label: 'Dm7', root: Note.D, quality: 'minor7', standardTuningFrets: [1, 1, 2, 0, null, null] },
  // Cmaj7 x32000: E=0(E✓) B=0(B✓) G=0(G✓) D=2(E✓) A=3(C✓) lowE=null
  { id: 'C|major7', label: 'Cmaj7', root: Note.C, quality: 'major7', standardTuningFrets: [0, 0, 0, 2, 3, null] },
  // Fmaj7 xx3210: E=0(E✓) B=1(C✓) G=2(A✓) D=3(F✓) A=null lowE=null
  { id: 'F|major7', label: 'Fmaj7', root: Note.F, quality: 'major7', standardTuningFrets: [0, 1, 2, 3, null, null] },
  // Gmaj7 320002: E=2(F#✓) B=0(B✓) G=0(G✓) D=0(D✓) A=2(B✓) lowE=3(G✓)
  { id: 'G|major7', label: 'Gmaj7', root: Note.G, quality: 'major7', standardTuningFrets: [2, 0, 0, 0, 2, 3] },
  // Bm x24432: E=2(F#✓) B=3(D✓) G=4(B✓) D=4(F#✓) A=2(B✓) lowE=null
  { id: 'B|minor', label: 'Bm', root: Note.B, quality: 'minor', standardTuningFrets: [2, 3, 4, 4, 2, null] },
  // F#m 244222: E=2(F#✓) B=2(C#✓) G=2(A✓) D=4(F#✓) A=4(C#✓) lowE=2(F#✓)
  { id: 'Gb|minor', label: 'F#m', root: Note.Gb, quality: 'minor', standardTuningFrets: [2, 2, 2, 4, 4, 2] },
  // Db/C# x46664: E=4(Ab✓) B=6(F✓) G=6(Db✓) D=6(Ab✓) A=4(Db✓) lowE=null
  { id: 'Db|major', label: 'C#', root: Note.Db, quality: 'major', standardTuningFrets: [4, 6, 6, 6, 4, null] },
  // Eb x68886: E=6(Bb✓) B=8(G✓) G=8(Eb✓) D=8(Bb✓) A=6(Eb✓) lowE=null
  { id: 'Eb|major', label: 'Eb', root: Note.Eb, quality: 'major', standardTuningFrets: [6, 8, 8, 8, 6, null] },
  // Ab 466544: barre — E=4(Ab✓) B=4(Eb✓) G=5(C✓) D=6(Ab✓) A=6(Eb✓) lowE=4(Ab✓)
  { id: 'Ab|major', label: 'Ab', root: Note.Ab, quality: 'major', standardTuningFrets: [4, 4, 5, 6, 6, 4] },
  // Bb x13331: E=1(F✓) B=3(D✓) G=3(Bb✓) D=3(F✓) A=1(Bb✓) lowE=null
  { id: 'Bb|major', label: 'Bb', root: Note.Bb, quality: 'major', standardTuningFrets: [1, 3, 3, 3, 1, null] },
  // Fm 133111: barre — E=1(F✓) B=1(C✓) G=1(Ab✓) D=3(F✓) A=3(C✓) lowE=1(F✓)
  { id: 'F|minor', label: 'Fm', root: Note.F, quality: 'minor', standardTuningFrets: [1, 1, 1, 3, 3, 1] },
  // Cm x35543: E=3(G✓) B=4(Eb✓) G=5(C✓) D=5(G✓) A=3(C✓) lowE=null
  { id: 'C|minor', label: 'Cm', root: Note.C, quality: 'minor', standardTuningFrets: [3, 4, 5, 5, 3, null] },
  // Gm 355333: E=3(G✓) B=3(D✓) G=3(Bb✓) D=5(G✓) A=5(D✓) lowE=3(G✓)
  { id: 'G|minor', label: 'Gm', root: Note.G, quality: 'minor', standardTuningFrets: [3, 3, 3, 5, 5, 3] },
  // Edim — 3-string practical voicing: A=1(Bb✓) D=2(E✓) G=0(G✓)
  { id: 'E|diminished', label: 'Edim', root: Note.E, quality: 'diminished', standardTuningFrets: [null, null, 0, 2, 1, null] },
  // Adim — 4-string practical voicing: A=0(A✓) D=1(Eb✓) G=2(A✓) B=1(C✓)
  { id: 'A|diminished', label: 'Adim', root: Note.A, quality: 'diminished', standardTuningFrets: [null, 1, 2, 1, 0, null] },
];

/** Standard EADGBE tuning, index 0=high-e matching `defaultGuitarRoots` order. */
const STANDARD_TUNING: Note[] = [Note.E, Note.B, Note.G, Note.D, Note.A, Note.E];

export const isStandardTuning = (roots: Note[]): boolean =>
  roots.length === STANDARD_TUNING.length &&
  STANDARD_TUNING.every((note, i) => roots[i] === note);

/**
 * Returns the hardcoded conventional fingering for standard EADGBE tuning.
 * Always uses the standard tuning shape regardless of the current tuning setting —
 * the fretboard is expected to render in standard tuning while chord mode is active.
 */
export const getPrimaryChordVoicing = (chord: PopularChord): ChordVoicing => ({
  frets: chord.standardTuningFrets,
});

/** Which cells on one string belong to the chosen fingering (for highlight vs fade). */
export const chordFingeringMaskForString = (
  voicing: ChordVoicing,
  stringIndex: number,
  fretCount: number,
): { open: boolean; frets: boolean[] } => {
  const frets = Array.from({ length: fretCount }, () => false);
  const f = voicing.frets[stringIndex];

  if (f === null) {
    return { open: false, frets };
  }

  if (f === 0) {
    return { open: true, frets };
  }

  if (f >= 1 && f <= fretCount) {
    frets[f - 1] = true;
  }

  return { open: false, frets };
};

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

const getNoteAtOffset = transposeFromRoot;

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