// @ts-ignore
export const defaultCollapse: any = {
  [LAYOUT]: {
    label: LAYOUT,
    selector: 'hierarchical',
    children: {
      rootId: {
        type: INPUT,
        path: [EXTRA_KEY, 'rootId'],
        label: 'Root ExternalId',
      },
      direction: {
        type: SELECT,
        label: 'Direction',
        options: directionsOptions,
      },
      [CONDITIONED_FIELDS]: [
        { [CONDITION_PATH]: 'direction' },
        {
          sortMethod: {
            type: SELECT,
            label: 'Sort Method',
            options: sortMethods,
          },
        },
        {
          levelSeparation: {
            type: NUMBER,
            label: 'Level Separation',
          },
        },
        {
          nodeSpacing: {
            type: NUMBER,
            label: 'Level Separation',
          },
        },
        {
          treeSpacing: {
            type: NUMBER,
            label: 'Tree Spacing',
          },
        },
        {
          parentCentralization: {
            type: SWITCH,
            label: 'Parent Centralization',
          },
        },
        {
          blockShifting: {
            type: SWITCH,
            label: 'Block Shifting',
          },
        },
        {
          edgeMinimization: {
            type: SWITCH,
            label: 'Edge Minimization',
          },
        },
      ],
    },
  },
  [GROUPS]: {
    label: 'Colors and Shapes',
    [AVOIDED_TAB]: true,
    style: { padding: 8 },
    children: {
      [EDGES]: {
        colors: [
          {
            path: ['color', 'color'],
            label: 'Background',
          },
          {
            path: ['font', 'color'],
            label: 'Font',
          },
        ],
        length: {
          type: SLIDER,
          path: ['length'],
          label: 'Length',
        },
        dashes: {
          type: SWITCH,
          path: ['dashes'],
          label: 'Dashes',
        },
      },
      [NODES]: {
        colors: [
          {
            path: ['color', 'background'],
            label: 'Background',
          },
          {
            path: ['color', 'border'],
            label: 'Border',
          },
          {
            path: ['font', 'color'],
            label: 'Font',
          },
        ],
        shape: {
          type: SELECT,
          path: ['shape'],
          label: 'Shape',
          options: shapeOptions,
        },
        [CONDITIONED_FIELDS]: [
          { [CONDITION_INCLUDES]: sizableList },
          {
            size: {
              type: SLIDER,
              path: ['size'],
              label: 'Size',
            },
          },
        ],
      },
    },
  },
  [PHYSICS]: {
    label: PHYSICS,
    children: {
      enabled: {
        type: SWITCH,
        label: 'Enabled',
      },
      [CONDITIONED_FIELDS]: [
        { [CONDITION_PATH]: 'enabled' },
        {
          minVelocity: {
            type: NUMBER,
            label: 'Min Velocity',
          },
        },
        {
          maxVelocity: {
            type: NUMBER,
            label: 'Max Velocity',
          },
        },
      ],
    },
  },
};


export const getChildrens = (
  object: { [x: string]: { type: any; label: any; options: any; path: any } },
  selector: any,
  key: any,
  childKey: any,
  pathValue: (arg0: any) => any,
  setPathValue: (arg0: any, arg1: any) => any,
  onChange: (arg0: any) => any
) =>
  Object.keys(object).map((objKey) => {
    const { type, label, options, path } = object[objKey];
    const fieldPath = path ? path : selector ? [key, selector, childKey] : [key, childKey];
    const value = pathValue(fieldPath);
    return getField(type, {
      label,
      options,
      value,
      onChange: (changed: any) => {
        const selectedValue = getSeletedValue(type, changed);
        return onChange(setPathValue(selectedValue, fieldPath));
      },
    });
  });

  export const getSeletedValue = (type: string, value: any) => {
    switch (type) {
      case SWITCH:
        return !value;
      case SELECT:
        return value.id;
      case SLIDER:
      case NUMBER:
        return parseFloat(value);
      default:
      case INPUT:
        return value;
    }
  };
  export const checkCondition = (value: any, type: string) => {
    switch (type) {
      case 'direction':
        return value === 'NO';
      default:
        return value;
    }
  };
  

  export const getField = (selector: string, props: any) => {
    switch (selector) {
      case SWITCH:
        return <SwitchField {...props} />;
      case NUMBER:
        return <NumberField {...props} />;
      case INPUT:
        return <InputField {...props} />;
      case SLIDER:
        return <SliderField {...props} />;
      case SELECT:
        return <SelectField {...props} />;
      default:
        return <></>;
    }
  };