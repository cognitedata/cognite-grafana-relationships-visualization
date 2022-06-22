import React from 'react';
import { Tab, TabContent, TabsBar } from '@grafana/ui';
import { AVOIDED_KEY, AVOIDED_TAB, getGroupsFromSeries, EDGES, tabLabel } from '../utils';
import { CollapsablePanelSection } from './CollapsablePanelSection';
import { Edges } from './Edges.component';
import { Nodes } from './Nodes.component';

export const ShapeAndColorEditor: React.FC<any> = ({ onChange, setPathValue, pathValue, data }) => {
  const groupsAvoidCollapsePath = ['groups', AVOIDED_KEY];
  const groupsAvoidTabPath = ['groups', AVOIDED_TAB];
  const groupsData = getGroupsFromSeries(data);
  const groupsAvoidCollapsePathValue = pathValue(groupsAvoidCollapsePath);
  const groupsAvoidTabPathValue = pathValue(groupsAvoidTabPath);

  return (
    <CollapsablePanelSection
      key={`groups.${AVOIDED_KEY}`}
      {...{
        isOpen: groupsAvoidCollapsePathValue,
        label: 'Colors and Shapes',
        onToggle: () => onChange(setPathValue(!groupsAvoidCollapsePathValue, groupsAvoidCollapsePath)),
      }}
    >
      <TabsBar key={'TabsBar'}>
        {groupsData.map((t: string) => (
          <Tab
            active={groupsAvoidTabPathValue === t}
            label={tabLabel(t)}
            key={t}
            onChangeTab={() => onChange(setPathValue(t, groupsAvoidTabPath))}
            id={t}
          />
        ))}
      </TabsBar>
      <TabContent key={`groups.${AVOIDED_TAB}`}>
        {groupsAvoidTabPathValue === EDGES ? (
          <Edges {...{ onChange, setPathValue, pathValue }} />
        ) : (
          <Nodes {...{ onChange, setPathValue, pathValue, groupsAvoidTabPathValue }} />
        )}
      </TabContent>
    </CollapsablePanelSection>
  );
};
