import React from 'react';
import { Select } from '@grafana/ui';

export const EdgesEditor: React.FC<any> = (props) => {
  const { value, onChange } = props;
  // console.log(props);
  return <Select options={[]} value={value} onChange={(selectableValue) => onChange(selectableValue)} />;
};
