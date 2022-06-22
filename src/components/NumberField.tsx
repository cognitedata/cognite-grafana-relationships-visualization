import React from 'react';
import { Input } from '@grafana/ui';
import { CustomField } from './CustomField';

export const NumberField: React.FC<any> = ({ label, ...props }) =>
  CustomField(label, <Input {...props} type="number" />, {});
