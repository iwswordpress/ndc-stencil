import { Component, h } from "@stencil/core";

@Component({
  tag: "app-home",
  styleUrl: "app-home.css",
  shadow: true,
})
export class AppHome {
  render() {
    return (
      <div class="app-home">
        <h3>SUNDAY EVENING:TEST WITH WEB COMPONENTS</h3>
        <iws-wordpress></iws-wordpress>
        <iws-stock-price stock-symbol="ORCL"></iws-stock-price>
        <iws-stock-finder />
        <stencil-route-link url="/profile/stencil">
          <button>Profile page</button>
        </stencil-route-link>
        <stencil-route-link url="/ndc/conferences">
          <button>NDC page</button>
        </stencil-route-link>
      </div>
    );
  }
}
