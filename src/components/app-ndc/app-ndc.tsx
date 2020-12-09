import { Component, Prop, h } from "@stencil/core";
import { MatchResults } from "@stencil/router";

@Component({
  tag: "app-ndc",
  styleUrl: "app-ndc.css",
  shadow: true,
})
export class AppNdc {
  @Prop() match: MatchResults;

  normalize(name: string): string {
    if (name) {
      return name.substr(0, 1).toUpperCase() + name.substr(1).toLowerCase();
    }
    return "";
  }

  render() {
    // let content = "";
    // if (this.match && this.match.params.name) {
    //   content = this.normalize(this.match.params.name);
    // }

    return (
      <div class="two-card">
        <div>
          <iws-events-finder />
        </div>{" "}
        <div>
          <iws-events-places></iws-events-places>
        </div>
      </div>
    );
  }
}
