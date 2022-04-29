import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Field } from '../game/component';
import { GameStateResponse } from '../game/api/types';

export default {
  title: 'Game/Field',
  component: Field,
  argTypes: {
    cellSide: {
      control: {
        type: 'range',
        min: 1,
        max: 100,
        step: 1,
      },
    },
  },
} as ComponentMeta<typeof Field>;

const Template: ComponentStory<typeof Field> = (args) => <Field {...args} />;

export const Empty = Template.bind({});
Empty.args = {
  field: Array.from({ length: 7 }, () => Array.from({ length: 7 }, () => null)) as GameStateResponse['state'],
  cellSide: 50,
};
Empty.parameters = {
};

export const Checkers = Template.bind({});
Checkers.args = {
  field: Array.from({ length: 7 }, (_, i) => Array.from({ length: 7 }, (__, j) => (((i + j) % 2) === 0 ? 'BLUE' : 'RED'))) as GameStateResponse['state'],
  cellSide: 50,
};
Checkers.parameters = {
};
