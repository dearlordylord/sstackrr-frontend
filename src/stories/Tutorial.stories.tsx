import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Tutorial } from '../game/tutorial';

export default {
  title: 'Game/Tutorial',
  component: Tutorial,
} as ComponentMeta<typeof Tutorial>;

const Template: ComponentStory<typeof Tutorial> = (args) => <Tutorial {...args} />;

export const Default = Template.bind({});
Default.args = {
};
Default.parameters = {
};
