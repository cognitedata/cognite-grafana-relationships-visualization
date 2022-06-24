import React from 'react';
import { EDGES } from '../utils';
import { ColorField, CustomField, SliderField, SwitchField } from './Fields';

export const Edges: React.FC<any> = ({ onChange, value }) => {
  const parent = EDGES;
  const edgesLengthPath = [parent, 'length'];
  const edgesColorColorPath = [parent, 'color', 'color'];
  const edgesFontColorPath = [parent, 'font', 'color'];
  const edgesDashesPath = [parent, 'dashes'];

  return (
    <div key={parent}>
      {CustomField('Colors')}
      <div className="holder">
        <ColorField
          {...{
            value,
            label: 'Background',
            width: '50%',
            onChange,
            path: edgesColorColorPath,
          }}
        />
        <ColorField
          key="edges.font.color"
          {...{
            value,
            label: 'Font',
            width: '50%',
            onChange,
            path: edgesFontColorPath,
          }}
        />
      </div>
      <SliderField
        key="edges.length"
        {...{
          value,
          label: 'Length',
          onChange,
          path: edgesLengthPath,
          min: 10,
          max: 1000,
        }}
      />
      <SwitchField
        key="edges.dashes"
        {...{
          label: 'Dashes',
          value,
          onChange,
          path: edgesDashesPath,
        }}
      />
    </div>
  );
};
