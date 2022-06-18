import React from 'react';
import { PanelEditorProps } from '../types';
import { ShapeSelect } from './ShapeSelect';

export const NodesEditor: React.FC<PanelEditorProps> = (props) => (
  <>
    <ShapeSelect {...props} />
  </>
);
