import {
  Component,
  State,
  Event,
  EventEmitter,
  Listen,
  h,
} from "@stencil/core";

@Component({
  tag: "iws-event-flights",
  styleUrl: "./event-flights.css",
  shadow: true,
})
export class GetPosts {
  stockNameInput: HTMLInputElement;

  @State() searchResults: { id: string; title: string; content: string }[] = [];
  @State() loading = false;
  @State() id: string = "";
  @State() post = "Output goes here...";

  @Event({ bubbles: true, composed: true })
  iwsFlightSelected: EventEmitter<string>;

  @Listen("iwsConferenceSelected", { target: "body" })
  onEvent(event: CustomEvent) {
    console.log(
      "[FLIGHTS] Event heard: ",
      event.type,
      "payload: ",
      event.detail
    );

    this.id = event.detail;
    this.getFlights();
  }
  // handleGetFlights(event: Event) {
  //   event.preventDefault();
  //   this.loading = true;
  //   // const stockName = this.stockNameInput.value;
  //   //const url = `https://49plus.co.uk/udemy-rest/wp-json/wp/v2/posts`;
  //   const url = `https://wpjs.co.uk/enterprise/wp-json/wp/v2/posts?categories=73`;

  //   fetch(url)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       this.searchResults = data.map((post) => {
  //         return {
  //           id: post.id,
  //           title: post.title.rendered,
  //           content: post.content.rendered,
  //         };
  //       });
  //       console.log(this.searchResults);
  //       this.loading = false;
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       this.loading = false;
  //     });
  // }

  getFlights() {
    this.loading = true;
    // const stockName = this.stockNameInput.value;
    //const url = `https://49plus.co.uk/udemy-rest/wp-json/wp/v2/posts`;
    const url = `https://wpjs.co.uk/enterprise/wp-json/wp/v2/posts?categories=73`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        this.searchResults = data.map((post) => {
          return {
            id: post.id,
            title: post.title.rendered,
            content: post.content.rendered,
          };
        });
        //console.log(this.searchResults);
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
        this.loading = false;
      });
  }
  onSelectPost(data: string) {
    console.log("[FLIGHTS]");
    this.iwsFlightSelected.emit(data);
    const json = JSON.parse(data);
    this.post = `<h2 style='color:orange;font-style:italic'>${json.title}</h2><hr><p>${json.content}</p>`;
  }

  render() {
    let output = (
      <ul>
        {this.searchResults.map((result) => (
          <li
            onClick={this.onSelectPost.bind(
              this,
              JSON.stringify({
                id: result.id,
                title: result.title,
                content: result.content,
              })
            )}
          >
            <strong>
              {result.id}: {result.title}
            </strong>
            <br></br>
            The flight details are...
          </li>
        ))}
      </ul>
    );
    if (this.loading) {
      output = <uc-spinner />;
    }
    return [
      // <form onSubmit={this.handleGetFlights.bind(this)}>
      //   <button type="submit">Want a flight to {this.id}</button>
      // </form>,
      <h2>FLIGHTS COMPONENT</h2>,
      output,
      // <div class="output" innerHTML={this.post}></div>,
    ];
  }
}
