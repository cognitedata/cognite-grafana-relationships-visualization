import React from 'react';
import { Slider } from '@grafana/ui';
import { CustomField } from './CustomField';

export const SliderField: React.FC<any> = ({ label, ...props }) => CustomField(label, <Slider {...props} />, {});
