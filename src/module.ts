import { PanelPlugin } from '@grafana/data';
import { VisNodeGraphOptions } from './types';
import { VisNodeGraphPanel } from './VisNodeGraphPanel';
import { addGroupsOption, addLayoutOption, addPhysicOption } from './utils';
import { CustomPanel } from './components/CustomPanel';

const VisNodeGraphSettings = {
  id: 'visNodeGraph',
  path: 'visNodeGraph',
  name: '',
  editor: CustomPanel,
};
export const plugin = new PanelPlugin<VisNodeGraphOptions>(VisNodeGraphPanel)
  .setPanelOptions((builder) => {
    builder.addCustomEditor(VisNodeGraphSettings);
    // @ts-ignore
    addLayoutOption(builder);
    // @ts-ignore    
    addGroupsOption(builder);
    // @ts-ignore    
    addPhysicOption(builder);
  });
