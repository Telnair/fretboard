import { describe, expect, it } from 'bun:test';
import {
  buildChromaticRange,
  buildScaleNotes,
  buildScaleSemitoneOffsets,
  hasValidScaleOffsets,
  Note,
  scaleToDefaultRoot,
  scaleToLabel,
  scales,
} from './utils';

describe('scale math helpers', () => {
  it('builds major scale notes without duplicate octave root', () => {
    expect(buildScaleNotes(Note.C, scales.major)).toEqual([
      Note.C,
      Note.D,
      Note.E,
      Note.F,
      Note.G,
      Note.A,
      Note.B,
    ]);
  });

  it('builds hirajoshi notes deterministically', () => {
    expect(buildScaleNotes(Note.A, scales.hirajoshi)).toEqual([
      Note.A,
      Note.B,
      Note.C,
      Note.Eb,
      Note.F,
    ]);
  });

  it('builds japanese in sen notes deterministically', () => {
    expect(buildScaleNotes(Note.E, scales.japaneseInSen)).toEqual([
      Note.E,
      Note.F,
      Note.Ab,
      Note.Bb,
      Note.D,
    ]);
  });

  it('builds chromatic note range by semitone count', () => {
    expect(buildChromaticRange(Note.E, 5)).toEqual([
      Note.F,
      Note.Gb,
      Note.G,
      Note.Ab,
      Note.A,
    ]);
  });

  it('produces stable semitone offsets for diminished whole-half', () => {
    expect(buildScaleSemitoneOffsets(scales.diminishedWholeHalf)).toEqual([
      0, 2, 3, 5, 6, 8, 9, 11,
    ]);
  });

  it('normalizes and deduplicates offsets by octave', () => {
    expect(buildScaleSemitoneOffsets([0, 12, 14, 2, 26])).toEqual([0, 2]);
  });
});

describe('scale configuration integrity', () => {
  it('has matching keys across scale maps', () => {
    const scaleKeys = Object.keys(scales).sort();
    expect(Object.keys(scaleToDefaultRoot).sort()).toEqual(scaleKeys);
    expect(Object.keys(scaleToLabel).sort()).toEqual(scaleKeys);
  });

  it('keeps all scale offsets as integers in 0..11 range', () => {
    Object.values(scales).forEach((offsets) => {
      expect(hasValidScaleOffsets(offsets)).toBe(true);
    });
  });
});
