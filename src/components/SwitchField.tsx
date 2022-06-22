import React from 'react';
import { Switch } from '@grafana/ui';
import { CustomField } from './CustomField';

export const SwitchField: React.FC<any> = ({ label, ...props }) => CustomField(label, <Switch {...props} />, {});
