import { PanelOptionsEditorBuilder, PanelPlugin } from '@grafana/data';
import { VisNodeGraphOptions } from './types';
import { VisNodeGraphPanel } from './VisNodeGraphPanel';
import { SingleStatBaseOptions } from '@grafana/ui';
import { CustomEditor, GroupsEditor, LayoutEditor, PhysicsEditor } from './components';

const VisCustomEditorSettings = {
  id: 'visNodeGraph',
  path: 'visNodeGraph',
  name: '',
  editor: CustomEditor,
};

function addPhysicOption<T extends SingleStatBaseOptions>(builder: PanelOptionsEditorBuilder<T>) {
  builder.addCustomEditor({
    id: 'visPhysisc',
    path: 'physics',
    name: '',
    editor: PhysicsEditor,
    category: ['Physics'],
  });
}

function addLayoutOption<T extends SingleStatBaseOptions>(builder: PanelOptionsEditorBuilder<T>) {
  builder.addCustomEditor({
    id: 'visLayout',
    path: 'layout',
    name: 'Hierarchical View',
    editor: LayoutEditor,
    category: ['Layout'],
  });
}

function addGroupsOption<T extends SingleStatBaseOptions>(builder: PanelOptionsEditorBuilder<T>) {
  builder.addCustomEditor({
    id: 'visGroups',
    path: 'groups',
    name: '',
    editor: GroupsEditor,
    category: ['Colors and Shapes'],
  });
}

export const plugin = new PanelPlugin<VisNodeGraphOptions>(VisNodeGraphPanel).setPanelOptions((builder) => {
  builder.addCustomEditor(VisCustomEditorSettings);
  // @ts-ignore
  addLayoutOption(builder);
  // @ts-ignore
  addGroupsOption(builder);
  // @ts-ignore
  addPhysicOption(builder);
});
