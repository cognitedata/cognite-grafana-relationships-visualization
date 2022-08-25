import React from 'react';
import { getGroupsFromSeries } from '../utils';
import { CollapsableField } from './Fields';
import { Nodes } from './Nodes.component';
import { onChangeValue } from './utils';
import '../style.css';

export const GroupsEditor: React.FC<any> = ({ value, onChange, context: { data } }) => {
  const groupsData = getGroupsFromSeries(data);
  const prop = {
    onChange: (newValue: any, path: any) => onChange(onChangeValue(path, newValue, value)),
    value,
  };
  return (
    <div>
      {groupsData.map((label) => {
        const props = { ...prop, label };
        return (
          <CollapsableField key={label} {...props}>
            <Nodes {...props} />
          </CollapsableField>
        );
      })}
    </div>
  );
};
