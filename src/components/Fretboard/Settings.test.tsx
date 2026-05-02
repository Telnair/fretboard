import { describe, expect, it, mock } from 'bun:test';
import { fireEvent, render, screen } from '@testing-library/react';
import { Settings } from './Settings';
import { Note, scaleToLabel, scales, type Scale } from './utils';

describe('Settings scale selection', () => {
  it('renders all configured scales with labels', () => {
    render(
      <Settings
        scaleRoot={Note.A}
        onSetScaleRoot={mock()}
        frets={12}
        onSetFrets={mock()}
        selectedScale={'pentatonicMinor'}
        onSetSelectedScale={mock()}
        isLeftHanded={false}
        onSetIsLeftHanded={mock()}
        roots={[Note.E, Note.A, Note.D, Note.G, Note.B, Note.E]}
        onSetRoots={mock()}
        onSetStrings={mock()}
        strings={6}
        popularChords={[]}
        selectedChordId={null}
        onSetSelectedChordId={mock()}
        chordMode={false}
      />,
    );

    const scaleSelect = screen.getByRole('combobox', { name: 'Scale type' });
    const options = scaleSelect.querySelectorAll('option');

    expect(options.length).toBe(Object.keys(scales).length);

    Object.entries(scaleToLabel).forEach(([scaleKey, label]) => {
      const option = scaleSelect.querySelector(`option[value="${scaleKey}"]`);
      expect(option?.textContent).toBe(label);
    });
  });

  it('calls onSetSelectedScale with selected value', () => {
    const onSetSelectedScale = mock<(scale: Scale) => void>();

    render(
      <Settings
        scaleRoot={Note.A}
        onSetScaleRoot={mock()}
        frets={12}
        onSetFrets={mock()}
        selectedScale={'pentatonicMinor'}
        onSetSelectedScale={onSetSelectedScale}
        isLeftHanded={false}
        onSetIsLeftHanded={mock()}
        roots={[Note.E, Note.A, Note.D, Note.G, Note.B, Note.E]}
        onSetRoots={mock()}
        onSetStrings={mock()}
        strings={6}
        popularChords={[]}
        selectedChordId={null}
        onSetSelectedChordId={mock()}
        chordMode={false}
      />,
    );

    fireEvent.change(screen.getByRole('combobox', { name: 'Scale type' }), {
      target: { value: 'hirajoshi' },
    });

    expect(onSetSelectedScale).toHaveBeenCalledWith('hirajoshi');
  });
});
