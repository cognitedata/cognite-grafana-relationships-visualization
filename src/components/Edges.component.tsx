import React from 'react';
import { EDGES } from '../utils';
import { ColorField } from './ColorField';
import { ColorFields } from './ColorFields';
import { SliderField } from './SliderField';
import { SwitchField } from './SwitchField';

export const Edges: React.FC<any> = ({ onChange, setPathValue, pathValue }) => {
  const parent = EDGES;
  const edgesLengthPath = [parent, 'length'];
  const edgesColorColorPath = [parent, 'color', 'color'];
  const edgesFontColorPath = [parent, 'font', 'color'];
  const edgesDashesPath = [parent, 'dashes'];

  const edgesLengthPathValue = pathValue(edgesLengthPath);
  const edgesColorColorPathValue = pathValue(edgesColorColorPath);
  const edgesFontColorPathValue = pathValue(edgesFontColorPath);
  const edgesDashesPathValue = pathValue(edgesDashesPath);

  const style = { padding: 8 };
  return (
    <div style={style} key={parent}>
      {ColorFields(
        <div className="holder">
          <ColorField
            {...{
              label: 'Background',
              width: '50%',
              onChange: (colorValue: string) => onChange(setPathValue(colorValue, edgesColorColorPath)),
              color: edgesColorColorPathValue,
            }}
          />
          <ColorField
            key="edges.font.color"
            {...{
              label: 'Font',
              width: '50%',
              onChange: (colorValue: string) => onChange(setPathValue(colorValue, edgesFontColorPath)),
              color: edgesFontColorPathValue,
            }}
          />
        </div>
      )}
      <SliderField
        key="edges.length"
        {...{
          label: 'Length',
          value: edgesLengthPathValue,
          onChange: (selectedValue: number) => onChange(setPathValue(selectedValue, edgesLengthPath)),
          min: 10,
          max: 1000,
        }}
      />
      <SwitchField
        key="edges.dashes"
        {...{
          label: 'Dashes',
          onChange: () => onChange(setPathValue(!edgesDashesPathValue, edgesDashesPath)),
          value: edgesDashesPathValue,
        }}
      />
    </div>
  );
};
