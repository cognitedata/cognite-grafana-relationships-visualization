import React, { useEffect } from 'react';
import { Select } from '@grafana/ui';

export const ShapeSelect: React.FC<any> = (props) => {
  const {
    value,
    onChange,
    item: {
      settings: { options },
      defaultValue,
    },
  } = props;
  useEffect(() => {
    if (!value) {
      onChange(defaultValue);
    }
  }, [value]);
  return <Select options={options} value={value} onChange={(selectableValue) => onChange(selectableValue)} />;
};
