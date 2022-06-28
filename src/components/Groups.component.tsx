import React from 'react';
import { getGroupsFromSeries } from '../utils';
import { CollapsableField } from './Fields';
import { EDGES } from '../constants';
import { Edges } from './Edges.component';
import { Nodes } from './Nodes.component';
import '../style.css';

export const GroupsEditor: React.FC<any> = ({ value, onChange, context: { data }, id }) => {
  const groupsData = getGroupsFromSeries(data);
  return (
    <div>
      {groupsData.map((label) => {
        const props = { onChange, value: value && { [id]: value }, label, parent: [id] };
        return (
          <CollapsableField key={label} {...props}>
            {label === EDGES ? <Edges {...props} /> : <Nodes {...props} />}
          </CollapsableField>
        );
      })}
    </div>
  );
};
