import React, { useMemo } from 'react';
import { CollapsableSection } from '@grafana/ui';
import _ from 'lodash';
import { LayoutEditor } from './layout';
import { EdgesEditor } from './edges';
import { NodesEditor } from './nodes';
import { CustomLabel } from './CustomLabel';
import { defaultValues } from './constants';

export const CustomEditor: React.FC<any> = ({ value, onChange }) => {
  const settings = useMemo(() => _.defaults(value, defaultValues), [value]);
  const newProps = { onChange, settings };
  const onToggle = (selector: string) =>
    onChange({
      ...settings,
      [selector]: {
        ...settings[selector],
        isOpen: !settings[selector].isOpen,
      },
    });
  const { nodes, edges } = settings;
  return (
    <div>
      <LayoutEditor {...newProps} />
      <CollapsableSection label={CustomLabel('Nodes')} isOpen={nodes.isOpen} onToggle={() => onToggle('nodes')}>
        <NodesEditor {...newProps} />
      </CollapsableSection>
      <CollapsableSection label={CustomLabel('Edges')} isOpen={edges.isOpen} onToggle={() => onToggle('edges')}>
        <EdgesEditor {...newProps} />
      </CollapsableSection>
    </div>
  );
};
