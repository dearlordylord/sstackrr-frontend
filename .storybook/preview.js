import { addDecorator } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import { MockedProvider } from '@apollo/client/testing';
import '../src/globals.css';

export const parameters = {
  apolloClient: {
    MockedProvider,
    // any props you want to pass to MockedProvider on every story
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

addDecorator(story => <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>);