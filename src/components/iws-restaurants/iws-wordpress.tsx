import { Component, State, Listen, h } from "@stencil/core";

@Component({
  tag: "iws-wordpress",
  styleUrl: "./iws-wordpress.css",
  shadow: true,
})
export class GetPosts {
  btnPlaces: HTMLInputElement;

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
      "[RESTAURANTS] Event heard: ",
      event.type,
      "payload: ",
      event.detail
    );
    console.log(">>>>>>>>>>>>>");
    this.payload = JSON.parse(event.detail);
    this.city = this.payload.city;
    this.code = this.payload.symbol.substring(0, 3);

    this.btnPlaces.style.display = "block";
  }
  onFindStocks(event: Event) {
    event.preventDefault();
    this.loading = true;

    fetch(
      `https://wpjs.co.uk/enterprise/wp-json/enterprise/v2/places-by-code?code=${this.code}`
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
      <h4>PLACES COMPONENT</h4>,
      <form onSubmit={this.onFindStocks.bind(this)}>
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
