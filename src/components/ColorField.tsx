import React from 'react';
import { ColorPicker } from '@grafana/ui';
import { CustomField } from './CustomField';

export const ColorField: React.FC<any> = ({ label, width, ...props }) =>
  CustomField(label, <ColorPicker {...props} />, {
    padding: 4,
    alignItems: 'center',
    width,
    marginBottom: 0,
  });
