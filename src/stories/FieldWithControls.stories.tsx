import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { FieldWithControls } from '../game/component';
import { GameStateResponse } from '../game/api/types';
import { PlayerColor } from '../player/types';

export default {
  title: 'Game/FieldWithControls',
  component: FieldWithControls,
  argTypes: {
    cellSide: {
      control: {
        type: 'range',
        min: 1,
        max: 100,
        step: 1,
      },
    },
    // canControl, playerToken, playerColor
    canControl: {
      control: {
        type: 'boolean',
      },
    },
    playerToken: {
      control: {
        type: 'string',
      },
    },
    playerColor: {
      control: {
        type: 'select',
        options: ['RED', 'BLUE'] as PlayerColor[],
      },
    },
  },
} as ComponentMeta<typeof FieldWithControls>;

const Template: ComponentStory<typeof FieldWithControls> = (args) => <FieldWithControls {...args} />;

export const Empty = Template.bind({});
Empty.args = {
  field: Array.from({ length: 7 }, () => Array.from({ length: 7 }, () => null)) as GameStateResponse['state'],
  canControl: true,
  playerColor: 'RED',
  cellSide: 50,
};
Empty.parameters = {
};
