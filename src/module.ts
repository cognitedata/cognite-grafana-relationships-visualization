import { PanelOptionsEditorBuilder, PanelPlugin } from '@grafana/data';
import { SingleStatBaseOptions } from '@grafana/ui';
import { CustomEditor, GroupsEditor, LayoutEditor, PhysicsEditor } from './components';
import { VisNodeGraphPanel } from './VisNodeGraphPanel';
import { EXTRA_KEY, GROUPS, LAYOUT, PHYSICS } from './constants';

const VisCustomEditorSettings = {
  id: EXTRA_KEY,
  path: EXTRA_KEY,
  name: '',
  editor: CustomEditor,
};

function addLayoutOption<T extends SingleStatBaseOptions>(builder: PanelOptionsEditorBuilder<T>) {
  builder.addCustomEditor({
    id: LAYOUT,
    path: LAYOUT,
    name: '',
    editor: LayoutEditor,
    category: ['Layout Hierarchical View'],
  });
}
function addGroupsOption<T extends SingleStatBaseOptions>(builder: PanelOptionsEditorBuilder<T>) {
  builder.addCustomEditor({
    id: GROUPS,
    path: GROUPS,
    name: '',
    editor: GroupsEditor,
    category: ['Colors and Shapes'],
  });
}
function addPhysicOption<T extends SingleStatBaseOptions>(builder: PanelOptionsEditorBuilder<T>) {
  builder.addCustomEditor({
    id: PHYSICS,
    path: PHYSICS,
    name: '',
    editor: PhysicsEditor,
    category: ['Physics'],
  });
}
export const plugin = new PanelPlugin<SingleStatBaseOptions>(VisNodeGraphPanel).setPanelOptions((builder) => {
  builder.addCustomEditor(VisCustomEditorSettings);
  addLayoutOption(builder);
  addGroupsOption(builder);
  addPhysicOption(builder);
});
