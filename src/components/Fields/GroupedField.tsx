import React from 'react';
import { SelectField } from './SelectField';
import { SwitchField } from './SwitchField';
import { typeOptins, upperFirst } from '../utils';

export const GroupedField: React.FC<any> = ({ fixedProps, isEnabled, placeSelector }) => {
  return (
    <div className="grouped-row">
      <SwitchField
        key={`edges.arrows.${placeSelector}.enabled`}
        {...{
          label: upperFirst(placeSelector),
          path: ['arrows', placeSelector, 'enabled'],
          ...fixedProps,
        }}
      />
      {isEnabled && (
        <SelectField
          key={`edges.arrows.${placeSelector}.type`}
          {...{
            options: typeOptins,
            label: 'Type',
            path: ['arrows', placeSelector, 'type'],
            ...fixedProps,
          }}
        />
      )}
    </div>
  );
};
