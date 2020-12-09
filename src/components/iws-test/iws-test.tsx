import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'iws-test',
  styleUrl: 'iws-test.css',
  shadow: true,
})
export class MyComponent {
  /**
   * The first name
   */
  @Prop() app: string;

  render() {
    return <div>This is NPM app-home component {this.app}</div>;
  }
}
