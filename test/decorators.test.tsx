import { render } from '@testing-library/react';
import React, { Component } from 'react';
import { keyCap } from '../src/decorators';

describe(keyCap, () => {
  class TestClass extends Component<{ testString?: string }> {
    @keyCap([])
    testMethod(event: KeyboardEvent): void {}
  }

  it.skip('todo', () => {
    render(<TestClass />);
  });
});
