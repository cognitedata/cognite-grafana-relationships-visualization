import React from 'react';
import { ColorPicker } from '@grafana/ui';
import { CustomField } from './CustomField';

export const ColorField: React.FC<any> = ({ label, width, ...props }) =>
  CustomField(label, <ColorPicker {...{ ...props, enableNamedColors: true }} />, {
    alignItems: 'center',
    width,
  });
