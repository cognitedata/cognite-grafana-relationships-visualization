/* import { CollapsableSection } from "@grafana/ui";
import React from "react";
import { PanelEditorProps } from "../../types";

export const GroupEditor: React.FC<PanelEditorProps> = ({ onChange, settings }) => (
  <CollapsableSection
        label={CustomLabel('Hierarchical View')}
        isOpen={layout.isOpen}
        onToggle={() => onToggle('layout')}
      >
        <EnableHierarchicalSwitch {...newProps} />
        {layout.hierarchical.enabled && <DirectionSelect {...{ onChange, settings }} />}
      </CollapsableSection>
); */