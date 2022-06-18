import React from 'react';
import { PanelEditorProps } from '../types';
import { DirectionSelect } from './DirectionSelect';

export const LayoutEditor: React.FC<PanelEditorProps> = (props) => (
  <>
    <DirectionSelect {...props} />
  </>
);
