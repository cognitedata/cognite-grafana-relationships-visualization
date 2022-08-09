import React from 'react';
import { CollapsableSection } from '@grafana/ui';
import { getDefaultValue, upperFirst } from '../utils';
import { AVOIDED_KEY } from '../../constants';

export const CollapsableField: React.FC<any> = ({ children, label, onChange, value }) => {
  const path = [label, AVOIDED_KEY];
  const isOpen = getDefaultValue(value, path);
  return (
    <CollapsableSection
      label={upperFirst(label)}
      isOpen={isOpen}
      onToggle={() => onChange(!isOpen, path)}
      className={isOpen ? 'selected-collapse collapse' : 'collapse'}
    >
      {children}
    </CollapsableSection>
  );
};
