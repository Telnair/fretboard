import { Note, Scale } from './types';

export const accented_frets = [3, 5, 7, 9, 12, 15, 17, 19, 21, 24];
export const notes: Note[] = Object.values(Note);
export const scales: Record<Scale, number[]> = {
  pentatonicMinor: [0, 1.5, 1, 1, 1.5, 1],
  pentatonicMajor: [0, 1, 1, 1.5, 1, 1.5],
  major: [0, 1, 1, 0.5, 1, 1, 1, 0.5],
  natMinor: [0, 1, 0.5, 1, 1, 0.5, 1, 1],
  bluesMinor: [0, 1.5, 1, 0.5, 0.5, 1.5, 1],
  bluesMajor: [0, 1, 0.5, 0.5, 1.5, 1, 1.5],
  // chromatic: [0, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
}
export const defaultGuitarRoots = [ Note.E, Note.A, Note.D, Note.G, Note.B, Note.E ].reverse();