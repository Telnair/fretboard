import { describe, expect, it } from 'bun:test';
import {
  buildChromaticRange,
  buildScaleNotes,
  buildScaleSemitoneOffsets,
  chordFingeringMaskForString,
  defaultGuitarRoots,
  defaultStringsNumber,
  getPrimaryChordVoicing,
  hasValidScaleOffsets,
  isStandardTuning,
  Note,
  POPULAR_GUITAR_CHORDS,
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

describe('popular chord catalog', () => {
  it('orders expected chords first', () => {
    expect(POPULAR_GUITAR_CHORDS.slice(0, 5).map((c) => c.label)).toEqual([
      'G major',
      'C major',
      'D major',
      'E minor',
      'A minor',
    ]);
  });
});

describe('primary chord voicing', () => {
  it('detects standard EADGBE tuning correctly', () => {
    expect(isStandardTuning(defaultGuitarRoots)).toBe(true);
    expect(isStandardTuning([Note.D, Note.A, Note.D, Note.G, Note.A, Note.D])).toBe(false);
  });

  it('uses hardcoded Am fingering x02210', () => {
    const amChord = POPULAR_GUITAR_CHORDS.find((c) => c.id === 'A|minor')!;
    const v = getPrimaryChordVoicing(amChord);

    // x02210: highE=0, B=1, G=2, D=2, A=0, lowE=null
    expect(v.frets).toEqual([0, 1, 2, 2, 0, null]);
  });

  it('uses hardcoded D major fingering xx0232', () => {
    const dChord = POPULAR_GUITAR_CHORDS.find((c) => c.id === 'D|major')!;
    const v = getPrimaryChordVoicing(dChord);

    // xx0232: highE=2(F#), B=3(D), G=2(A), D=0, A=null, lowE=null
    expect(v.frets).toEqual([2, 3, 2, 0, null, null]);
  });

  it('returns a voicing for every chord regardless of tuning', () => {
    for (const chord of POPULAR_GUITAR_CHORDS) {
      const v = getPrimaryChordVoicing(chord);
      expect(v).not.toBeNull();
    }
  });

  it('always returns the standard voicing even for non-standard tuning', () => {
    const gChord = POPULAR_GUITAR_CHORDS.find((c) => c.id === 'G|major')!;
    const v = getPrimaryChordVoicing(gChord);

    expect(v).not.toBeNull();
    expect(v.frets).toEqual(gChord.standardTuningFrets);
  });

  it('maps fingering mask correctly for fretted and open positions', () => {
    const amChord = POPULAR_GUITAR_CHORDS.find((c) => c.id === 'A|minor')!;
    const v = getPrimaryChordVoicing(amChord);

    // String 4 (A string) is open (fret 0) → mask.open should be true
    const maskA = chordFingeringMaskForString(v, 4, 12);
    expect(maskA.open).toBe(true);

    // String 2 (G string) is fret 2 → mask.frets[1] should be true
    const maskG = chordFingeringMaskForString(v, 2, 12);
    expect(maskG.frets[1]).toBe(true);
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
