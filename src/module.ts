import { PanelOptionsEditorBuilder, PanelPlugin } from '@grafana/data';
import { SingleStatBaseOptions } from '@grafana/ui';
import { EdgesEditor, GroupsEditor, LayoutEditor, PhysicsEditor } from './components';
import { VisNodeGraphPanel } from './VisNodeGraphPanel';
import { defaultGraphValue, EDGES, GROUPS, LAYOUT, PHYSICS } from './constants';
import { getDefaultValue } from './components/utils';

function addLayoutOption<T extends SingleStatBaseOptions>(builder: PanelOptionsEditorBuilder<T>) {
  builder.addCustomEditor({
    id: LAYOUT,
    path: LAYOUT,
    name: '',
    editor: LayoutEditor,
    category: ['Layout Hierarchical View'],
    defaultValue: getDefaultValue(defaultGraphValue, [LAYOUT]),
  });
}
function addEdgesOption<T extends SingleStatBaseOptions>(builder: PanelOptionsEditorBuilder<T>) {
  builder.addCustomEditor({
    id: EDGES,
    path: EDGES,
    name: '',
    editor: EdgesEditor,
    category: ['Edges'],
    defaultValue: getDefaultValue(defaultGraphValue, [EDGES]),
  });
}
function addGroupsOption<T extends SingleStatBaseOptions>(builder: PanelOptionsEditorBuilder<T>) {
  builder.addCustomEditor({
    id: GROUPS,
    path: GROUPS,
    name: '',
    editor: GroupsEditor,
    category: ['Nodes'],
    defaultValue: getDefaultValue(defaultGraphValue, [GROUPS]),
  });
}
function addPhysicOption<T extends SingleStatBaseOptions>(builder: PanelOptionsEditorBuilder<T>) {
  builder.addCustomEditor({
    id: PHYSICS,
    path: PHYSICS,
    name: '',
    editor: PhysicsEditor,
    category: ['Physics'],
    defaultValue: getDefaultValue(defaultGraphValue, [PHYSICS]),
  });
}
export const plugin = new PanelPlugin<SingleStatBaseOptions>(VisNodeGraphPanel).setPanelOptions((builder) => {
  addLayoutOption(builder);
  addEdgesOption(builder);
  addGroupsOption(builder);
  addPhysicOption(builder);
});
