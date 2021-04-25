import { Component, State, Listen, h, Prop } from "@stencil/core";

@Component({
  tag: "iws-wordpress",
  styleUrl: "./iws-wordpress.css",
  shadow: true,
})
export class GetPosts {
  btnPlaces: HTMLInputElement;
  @Prop({ mutable: true, reflect: true }) config: string;
  @State() searchResults: {
    id: string;
    city: string;
    place: string;
    website: string;
  }[] = [];
  @State() loading = false;
  @State() payload: {
    id: string;
    city: string;
    symbol: string;
  };
  @State() city: string = "";
  @State() code: string = "";

  @State() post = "";

  @Listen("iwsConferenceSelected", { target: "body" })
  getRestaurants(event: CustomEvent) {
    console.log(">>>>>>>>>>>>>");
    console.log(
      "%c[WORDPRESS] Event heard: ",
      "color:purple;font-size:24px",
      event.type,
      "payload: ",
      event.detail
    );
    console.log(">>>>>>>>>>>>>");
    this.payload = JSON.parse(event.detail);
    this.city = this.payload.city;
    this.code = this.payload.symbol.substring(0, 3);
    // rerun list now that code has changed
    this.doFetch(this.code);
    this.btnPlaces.style.display = "block";
  }

  // this runs when button cleikded to show places
  onFindPlaces(event: Event) {
    event.preventDefault();
    this.loading = true;
    this.doFetch(this.code);
  }
  doFetch(code: string) {
    console.log(
      "https://wp-html.co.uk/api/wp-json/enterprise/v2/places-by-code?code=${code}"
    );
    fetch(
      `https://wp-html.co.uk/api/wp-json/enterprise/v2/places-by-code?code=${code}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.searchResults = data.map((post) => {
          return {
            id: post.id,
            city: post.city_code,
            place: post.place,
            website: post.website,
          };
        });
        console.log(this.searchResults);
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
        this.loading = false;
      });
  }
  render() {
    let output = (
      <ul>
        {this.searchResults.map((result) => (
          <li key={result.id}>
            <strong>{result.city}</strong> - {result.place} - {result.website}
          </li>
        ))}
      </ul>
    );
    if (this.loading) {
      output = <uc-spinner />;
    }
    return [
      <div>
        <h1>WORPRESS</h1>
      </div>,
      <h4>PLACES COMPONENT</h4>,
      <form onSubmit={this.onFindPlaces.bind(this)}>
        <button
          id="placesBtn"
          type="submit"
          class="show-places"
          ref={(el) => (this.btnPlaces = el as HTMLInputElement)}
        >
          Places in {this.city}
        </button>
      </form>,
      output,
    ];
  }
}
