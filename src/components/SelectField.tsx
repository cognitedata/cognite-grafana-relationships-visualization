import React from 'react';
import { Select } from '@grafana/ui';
import { CustomField } from './CustomField';

export const SelectField: React.FC<any> = ({ label, ...props }) => CustomField(label, <Select {...props} />, {});
