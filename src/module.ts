import { PanelOptionsEditorBuilder, PanelPlugin } from '@grafana/data';
import { VisNodeGraphOptions } from './types';
import { VisNodeGraphPanel } from './VisNodeGraphPanel';
import { SingleStatBaseOptions } from '@grafana/ui';
import { CustomEditor, GroupsEditor, LayoutEditor, PhysicsEditor } from './components';
import {
  EXTRA_KEY,
  GROUPS,
  groupsDefaultValue,
  LAYOUT,
  layoutDefaultValue,
  PHYSICS,
  physicsDefaultValue,
} from './constants';

const VisCustomEditorSettings = {
  id: EXTRA_KEY,
  path: EXTRA_KEY,
  name: '',
  editor: CustomEditor,
};

function addPhysicOption<T extends SingleStatBaseOptions>(builder: PanelOptionsEditorBuilder<T>) {
  builder.addCustomEditor({
    id: PHYSICS,
    path: PHYSICS,
    name: '',
    editor: PhysicsEditor,
    category: ['Physics'],
    defaultValue: physicsDefaultValue,
  });
}

function addLayoutOption<T extends SingleStatBaseOptions>(builder: PanelOptionsEditorBuilder<T>) {
  builder.addCustomEditor({
    id: LAYOUT,
    path: LAYOUT,
    name: '',
    editor: LayoutEditor,
    category: ['Layout Hierarchical View'],
    defaultValue: layoutDefaultValue,
  });
}

function addGroupsOption<T extends SingleStatBaseOptions>(builder: PanelOptionsEditorBuilder<T>) {
  builder.addCustomEditor({
    id: GROUPS,
    path: GROUPS,
    name: '',
    editor: GroupsEditor,
    category: ['Colors and Shapes'],
    defaultValue: groupsDefaultValue,
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
