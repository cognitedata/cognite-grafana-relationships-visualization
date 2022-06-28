import React from 'react';
import { InputField } from './Fields';

export const CustomEditor: React.FC<any> = ({ value, onChange, id }) => {
  return (
    <InputField
      key={`${id}.externalId`}
      {...{
        value: value && { [id]: value },
        onChange,
        parent: [id],
        label: 'Root ExternalId',
        path: ['externalId'],
      }}
    />
  );
};
