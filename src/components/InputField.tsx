import React from 'react';
import { Input } from '@grafana/ui';
import { CustomField } from './CustomField';

export const InputField: React.FC<any> = ({ label, ...props }) => CustomField(label, <Input {...props} />, {});
