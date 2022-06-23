import React from 'react';
import { getGroupsFromSeries, EDGES, values, getValue, setValue, NODES, AVOIDED_KEY, tabLabel } from '../utils';
import { Edges } from './Edges.component';
import { Nodes } from './Nodes.component';
import { CollapsablePanelSection } from './CollapsablePanelSection';
import { StandardEditorProps } from '@grafana/data';
import '../style.css';

export const GroupsEditor: React.FC<StandardEditorProps> = ({ value, onChange, context: { data } }) => {
  const defaultValue = values(value);
  const pathValue = (path: string[]) => getValue(defaultValue, path);
  const setPathValue = (value: any, path: string[]) => setValue(defaultValue, path, value);
  const change = (value: any, path: string[]) => onChange(setPathValue(value, path));

  const groupsData = getGroupsFromSeries(data);

  return (
    <div>
      {groupsData.map((label) => {
        const collapsPath =
          label === EDGES
            ? [EDGES, AVOIDED_KEY]
            : label === NODES
            ? [NODES, AVOIDED_KEY]
            : ['groups', label, , AVOIDED_KEY];
        // @ts-ignore
        const collapsPathValue = pathValue(collapsPath);
        return (
          <CollapsablePanelSection
            key={label}
            label={tabLabel(label)}
            isOpen={collapsPathValue}
            // @ts-ignore
            onToggle={() => change(!collapsPathValue, collapsPath)}
          >
            {label === EDGES ? <Edges {...{ change, pathValue }} /> : <Nodes {...{ change, pathValue, label }} />}
          </CollapsablePanelSection>
        );
      })}
    </div>
  );
};
