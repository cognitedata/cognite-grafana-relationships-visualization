import React from 'react';
import { CollapsableSection } from '@grafana/ui';
import { getValue, setValue, upperFirst } from '../utils';
import { AVOIDED_KEY } from '../../constants';

export const CollapsableField: React.FC<any> = ({ children, label, onChange, value, parent }) => {
  const path = [AVOIDED_KEY];
  const isOpen = getValue(value, [...parent, label, ...path]);
  return (
    <CollapsableSection
      label={upperFirst(label)}
      isOpen={isOpen}
      onToggle={() => onChange(setValue(path, !isOpen, parent, label, value))}
      className={isOpen ? 'selected-collapse collapse' : 'collapse'}
    >
      {children}
    </CollapsableSection>
  );
};
