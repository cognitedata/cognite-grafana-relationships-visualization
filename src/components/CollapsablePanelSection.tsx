import React from 'react';
import { CollapsableSection } from '@grafana/ui';
import { CustomField } from './CustomField';

export const CollapsablePanelSection: React.FC<any> = ({ isOpen, children, label, onToggle }) => (
  <CollapsableSection label={CustomField(label)} isOpen={isOpen} onToggle={onToggle}>
    {children}
  </CollapsableSection>
);
