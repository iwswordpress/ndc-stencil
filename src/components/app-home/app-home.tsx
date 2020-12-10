import { Component, h } from "@stencil/core";

@Component({
  tag: "app-home",
  styleUrl: "app-home.css",
  shadow: true,
})
export class AppHome {
  render() {
    return (
      <div>
        <div class="app-home">
          <iws-stock-finder />
          <iws-stock-price stock-symbol="ORCL"></iws-stock-price>
        </div>
      </div>
    );
  }
}
