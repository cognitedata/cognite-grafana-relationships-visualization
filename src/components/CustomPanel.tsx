import React from 'react';
import { StandardEditorProps } from "@grafana/data";
import { EXTRA_KEY, getValue, setValue, values } from '../utils';
import { DefaultOptions } from "../types";
import { InputField } from './InputField';

export const CustomPanel: React.FC<StandardEditorProps<DefaultOptions>> = ({
  value,
  onChange,
}) => {
  const defaultValue = values(value);
  const pathValue = (path: string[]) => getValue(defaultValue, path);
  const setPathValue = (value: any, path: string[]) => setValue(defaultValue, path, value);
  const change = (value: any, path: string[]) => onChange(setPathValue(value, path));
  
  const rootExternalIdPath = [EXTRA_KEY, 'rootId'];
  const rootExternalIdPathValue = pathValue(rootExternalIdPath);
  return (
    <div>
      <InputField
        key={`${EXTRA_KEY}.externalId`}
        {...{
          onChange: ({ target: { value } }: any) => change(value, rootExternalIdPath),
          label: 'Root ExternalId',
          value: rootExternalIdPathValue,
        }}
      />
    </div>
  );
};
