import { PanelPlugin } from '@grafana/data';
import { customSettings } from './utils';
import { VisNodeGraphOptions } from './types';
import { VisNodeGraphPanel } from './VisNodeGraphPanel';

export const plugin = new PanelPlugin<VisNodeGraphOptions>(VisNodeGraphPanel).setPanelOptions((builder) => {
  return builder.addCustomEditor(customSettings);
});
