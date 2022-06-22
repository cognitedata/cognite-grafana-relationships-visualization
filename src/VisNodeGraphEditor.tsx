import React from 'react';
import { getValue, setValue, values } from './utils';
import { PhysicsEditor, LayoutEditor, ShapeAndColorEditor } from './components';
import { StandardEditorProps } from '@grafana/data';
import { DefaultOptions } from './types';
import './style.css';

export const VisNodeGraphEditor: React.FC<StandardEditorProps<DefaultOptions>> = ({
  value,
  onChange,
  context: { data },
}) => {
  const defaultValue = values(value);
  const pathValue = (path: string[]) => getValue(defaultValue, path);
  const setPathValue = (value: any, path: string[]) => setValue(defaultValue, path, value);
  const change = (value: any, path: string[]) => onChange(setPathValue(value, path));
  const props = { change, pathValue, data };
  return (
    <div>
      <LayoutEditor {...props} />
      <ShapeAndColorEditor {...props} />
      <PhysicsEditor {...props} />
    </div>
  );
};
