import { PanelPlugin } from '@grafana/data';
import { VisNodeGraphOptions } from './types';
import { VisNodeGraphPanel } from './VisNodeGraphPanel';
import { VisNodeGraphEditor } from './VisNodeGraphEditor';

const VisNodeGraphSettings = {
  id: 'visNodeGraph',
  path: 'visNodeGraph',
  name: '',
  editor: VisNodeGraphEditor,
};

export const plugin = new PanelPlugin<VisNodeGraphOptions>(VisNodeGraphPanel).setPanelOptions((builder) => {
  return builder.addCustomEditor(VisNodeGraphSettings);
});
