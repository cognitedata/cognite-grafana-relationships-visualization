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
  return (
    <div>
      <LayoutEditor {...{ onChange, setPathValue, pathValue }} />
      <ShapeAndColorEditor {...{ onChange, setPathValue, pathValue, data }} />
      <PhysicsEditor {...{ onChange, setPathValue, pathValue }} />
    </div>
  );
};
