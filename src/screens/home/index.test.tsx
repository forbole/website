import React from 'react';
import renderer from 'react-test-renderer';
import { wait } from '@tests/utils';
import Home from '.';

// ==================================
// mocks
// ==================================
jest.mock('@components', () => ({
  Layout: (props: any) => <div id="Layout" {...props} />,
}));

jest.mock('./components', () => ({
  HomeAnimation: (props: any) => <div id="HomeAnimation" {...props} />,
}));

// ==================================
// unit tests
// ==================================
describe('screen: Home', () => {
  it('matches snapshot', async () => {
    let component: any;
    renderer.act(() => {
      component = renderer.create(<Home />);
    });
    await wait();

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
