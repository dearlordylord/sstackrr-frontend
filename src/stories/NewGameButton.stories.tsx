import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { NewGameButtonComponent } from '../game/newGameButton';

export default {
  title: 'Game/NewGameButton',
  component: NewGameButtonComponent,
  argTypes: {
    withBot: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
} as ComponentMeta<typeof NewGameButtonComponent>;

const Template: ComponentStory<typeof NewGameButtonComponent> = (args) => <NewGameButtonComponent {...args} />;

export const WithBot = Template.bind({});
WithBot.args = {
  withBot: true,
};
WithBot.parameters = {
  // apolloClient: {
  //   // do not put MockedProvider here, you can, but its preferred to do it in preview.js
  //   mocks: [
  //     {
  //       request: {
  //         query: INIT_GAME,
  //         variables: {
  //           botId: "SMART"
  //         }
  //       },
  //       result: {
  //         data: {
  //           initGame: {
  //             id: "testid",
  //             state: "no matter"
  //           },
  //         }
  //       },
  //     },
  //   ],
  // },
};

export const WithNoBot = Template.bind({});
WithNoBot.args = {
  withBot: false,
};
