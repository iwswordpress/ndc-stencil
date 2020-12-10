import { Component, h } from "@stencil/core";

@Component({
  tag: "app-root",
  styleUrl: "app-root.css",
  shadow: true,
})
export class AppRoot {
  render() {
    return (
      <div class="container">
        <header>
          <stencil-route-link url="/ndc/conferences">
            <button>NDC page</button>
          </stencil-route-link>
          <h1>ONE STOP TECH CONFERENCES</h1>
          <stencil-route-link url="/stocks">
            <button>Stocks</button>
          </stencil-route-link>
        </header>
        <div>
          <main>
            <stencil-router>
              <stencil-route-switch scrollTopOffset={0}>
                <stencil-route
                  url="/stocks"
                  component="app-home"
                  exact={true}
                />
                <stencil-route url="/profile/:name" component="app-profile" />
                <stencil-route url="/" component="app-ndc" />
              </stencil-route-switch>
            </stencil-router>
          </main>
        </div>
      </div>
    );
  }
}
