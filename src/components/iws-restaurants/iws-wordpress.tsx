import {
  Component,
  State,
  Event,
  EventEmitter,
  Listen,
  h,
} from "@stencil/core";

@Component({
  tag: "iws-wordpress",
  styleUrl: "./iws-wordpress.css",
  shadow: true,
})
export class GetPosts {
  stockNameInput: HTMLInputElement;

  @State() searchResults: { id: string; city: string; place: string }[] = [];
  @State() loading = false;
  @State() id: string = "";
  @State() city: string = "";
  @State() post = "Output goes here...";

  @Event({ bubbles: true, composed: true })
  iwsPostSelected: EventEmitter<string>;

  @Listen("iwsSymbolSelected", { target: "body" })
  onEvent(event: CustomEvent) {
    console.log(
      "[IWS-WORDPRESS] Event heard: ",
      event.type,
      "payload: ",
      event.detail
    );

    this.id = event.detail;
  }

  @Listen("iwsConferenceSelected", { target: "body" })
  getRestaurants(event: CustomEvent) {
    console.log(
      "[RESTAURANTS] Event heard: ",
      event.type,
      "payload: ",
      event.detail
    );

    this.id = event.detail;
  }
  onFindStocks(event: Event) {
    event.preventDefault();
    this.loading = true;
    // const stockName = this.stockNameInput.value;
    fetch(`https://wpjs.co.uk/enterprise/wp-json/enterprise/v2/restaurants`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.searchResults = data.map((post) => {
          return {
            id: post.id,
            city: post.city_code,
            place: post.place,
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
          <li
            key={result.id}
            // onClick={this.onSelectPost.bind(
            //   this,
            //   JSON.stringify({
            //     id: result.id,
            //     city: result.city_code,
            //     place: result.content,
            //   })
            // )}
          >
            <strong>{result.city}</strong> - {result.place}
          </li>
        ))}
      </ul>
    );
    if (this.loading) {
      output = <uc-spinner />;
    }
    return [
      <form onSubmit={this.onFindStocks.bind(this)}>
        <button type="submit">Restaurants in {this.id}</button>
      </form>,
      output,
      <div class="output" innerHTML={this.post}></div>,
    ];
  }
}
