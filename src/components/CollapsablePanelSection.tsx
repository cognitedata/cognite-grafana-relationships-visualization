import React from 'react';
import { CollapsableSection } from '@grafana/ui';
// import { CustomField } from './CustomField';

export const CollapsablePanelSection: React.FC<any> = ({ isOpen, children, label, onToggle }) => (
  <CollapsableSection
    label={label}
    isOpen={isOpen}
    onToggle={onToggle}
    className={isOpen ? 'selected-collapse collapse' : 'collapse'}
  >
    {children}
  </CollapsableSection>
);
