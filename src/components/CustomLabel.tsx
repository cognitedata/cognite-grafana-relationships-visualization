import React from 'react';
import { Field } from '@grafana/ui';

export const CustomLabel = (text: string, children = <></>) => <Field label={text}>{children}</Field>;
