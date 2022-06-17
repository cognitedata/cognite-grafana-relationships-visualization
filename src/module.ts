import { PanelPlugin } from '@grafana/data';
import { VisNodeGraphOptions } from './types';
import { VisNodeGraphPanel } from './VisNodeGraphPanel';
import { ShapeSelect } from './ShapeSelect';

export const plugin = new PanelPlugin<VisNodeGraphOptions>(VisNodeGraphPanel).setPanelOptions((builder) => {
  return builder
    .addBooleanSwitch({
      path: 'hierarchical',
      name: 'Hierarchical View',
      defaultValue: false,
    })
    .addColorPicker({
      path: 'nodesColor',
      name: 'Nodes color',
    })
    .addColorPicker({
      path: 'edgesColor',
      name: 'Edges color',
    })
    .addCustomEditor({
      id: 'shape',
      path: 'shape',
      name: 'Shape',
      defaultValue: {
        id: 'ellipse',
        label: 'Ellipse',
      },
      settings: {
        options: [
          { label: 'Ellipse', id: 'ellipse' },
          { label: 'Circle', id: 'circle' },
          { label: 'Database', id: 'database' },
          { label: 'Box', id: 'box' },
          { label: 'Text', id: 'text' },
        ],
      },
      editor: ShapeSelect,
    })
    .addSliderInput({
      path: 'length',
      name: 'Edges length',
      defaultValue: 100,
      settings: {
        min: 10,
        max: 1000,
      },
    });
});
