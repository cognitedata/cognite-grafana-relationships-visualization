import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { SimplePanel } from './SimplePanel';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions((builder) => {
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
