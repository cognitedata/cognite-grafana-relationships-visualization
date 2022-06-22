import React from 'react';
import { INPUT, NUMBER, SELECT, SLIDER, SWITCH } from '../utils';

import { SelectField } from './SelectField';
import { SliderField } from './SliderField';
import { SwitchField } from './SwitchField';
import { NumberField } from './NumberField';
import { InputField } from './InputField';
// import { ColorField } from './ColorField';

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