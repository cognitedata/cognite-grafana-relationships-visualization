import { PanelPlugin } from '@grafana/data';
import { VisNodeGraphOptions } from './types';
import { VisNodeGraphPanel } from './VisNodeGraphPanel';

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
    });
});
