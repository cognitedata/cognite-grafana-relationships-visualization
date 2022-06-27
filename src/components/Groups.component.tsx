import React from 'react';
import { getGroupsFromSeries, values, getValue, setValue, upperFirst } from '../utils';
import { Edges } from './Edges.component';
import { Nodes } from './Nodes.component';
import { CollapsablePanelSection } from './CollapsablePanelSection';
import { EDGES, NODES, AVOIDED_KEY } from '../constants';
import '../style.css';

export const GroupsEditor: React.FC<any> = ({ value, onChange, context: { data }, item: { defaultValue } }) => {
  const defaultValues = values(value, defaultValue);
  const pathValue = (path: string[]) => getValue(defaultValues, path);
  const setPathValue = (value: any, path: string[]) => setValue(defaultValues, path, value);
  const change = (value: any, path: string[]) => onChange(setPathValue(value, path));

  const groupsData = getGroupsFromSeries(data);
  const avoid = (selector: string) =>
    selector === EDGES
      ? [EDGES, AVOIDED_KEY]
      : selector === NODES
      ? [NODES, AVOIDED_KEY]
      : ['groups', selector, AVOIDED_KEY];
  return (
    <div>
      {groupsData.map((label) => {
        const collapsPath = avoid(label);
        const collapsPathValue = pathValue(collapsPath);
        return (
          <CollapsablePanelSection
            key={label}
            label={upperFirst(label)}
            isOpen={collapsPathValue}
            // @ts-ignore
            onToggle={() => change(!collapsPathValue, collapsPath)}
          >
            {label === EDGES ? (
              <Edges
                {...{
                  onChange,
                  value,
                  defaultValue,
                }}
              />
            ) : (
              <Nodes {...{ onChange, label, value, defaultValue }} />
            )}
          </CollapsablePanelSection>
        );
      })}
    </div>
  );
};
