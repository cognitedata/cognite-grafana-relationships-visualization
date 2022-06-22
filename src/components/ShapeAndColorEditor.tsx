import React from 'react';
import { Tab, TabContent, TabsBar } from '@grafana/ui';
import { AVOIDED_KEY, AVOIDED_TAB, getGroupsFromSeries, EDGES, tabLabel } from '../utils';
import { CollapsablePanelSection } from './CollapsablePanelSection';
import { Edges } from './Edges.component';
import { Nodes } from './Nodes.component';

export const ShapeAndColorEditor: React.FC<any> = ({ change, pathValue, data }) => {
  const groupsAvoidCollapsePath = ['groups', AVOIDED_KEY];
  const groupsAvoidTabPath = ['groups', AVOIDED_TAB];
  const groupsAvoidCollapsePathValue = pathValue(groupsAvoidCollapsePath);
  const groupsAvoidTabPathValue = pathValue(groupsAvoidTabPath);

  const groupsData = getGroupsFromSeries(data);

  return (
    <CollapsablePanelSection
      key={`groups.${AVOIDED_KEY}`}
      {...{
        isOpen: groupsAvoidCollapsePathValue,
        label: 'Colors and Shapes',
        onToggle: () => change(!groupsAvoidCollapsePathValue, groupsAvoidCollapsePath),
      }}
    >
      <TabsBar key={'TabsBar'}>
        {groupsData.map((t: string) => (
          <Tab
            active={groupsAvoidTabPathValue === t}
            label={tabLabel(t)}
            key={t}
            onChangeTab={() => change(t, groupsAvoidTabPath)}
            id={t}
          />
        ))}
      </TabsBar>
      <TabContent key={`groups.${AVOIDED_TAB}`}>
        {groupsAvoidTabPathValue === EDGES ? (
          <Edges {...{ change, pathValue }} />
        ) : (
          <Nodes {...{ change, pathValue, groupsAvoidTabPathValue }} />
        )}
      </TabContent>
    </CollapsablePanelSection>
  );
};
