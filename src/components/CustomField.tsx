import React from 'react';
import { Field } from '@grafana/ui';

export const CustomField = (label: string, children?: any, style?: any) => (
  <Field style={style} label={label}>
    {children ?? <></>}
  </Field>
);
