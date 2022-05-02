import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { GameCell } from '../game/cell';
import { cellSideArgControl, playerColorControl } from './args';

export default {
  title: 'Game/Cell',
  component: GameCell,
  argTypes: {
    cellSide: cellSideArgControl,
    cell: playerColorControl,
  },
} as ComponentMeta<typeof GameCell>;

const Template: ComponentStory<typeof GameCell> = ({ cellSide, ...args }) => <GameCell cellSide={cellSide ?? 20} {...args} />;

export const Default = Template.bind({});
Default.args = {
  cell: null,
};
Default.parameters = {
};

export const RedCell = Template.bind({});
RedCell.args = {
  cell: 'RED',
};
RedCell.parameters = {
};

export const BlueCell = Template.bind({});
BlueCell.args = {
  cell: 'BLUE',
};
BlueCell.parameters = {
};
