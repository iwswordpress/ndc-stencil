import { Component, State, Event, EventEmitter, h, Prop } from "@stencil/core";

@Component({
  tag: "iws-events-finder",
  styleUrl: "./events-finder.css",
  shadow: true,
})
export class EventsFinder {
  stockNameInput: HTMLInputElement;
  @Prop({ mutable: true, reflect: true }) config: string;
  @State() searchResults: {
    symbol: string;
    city: string;
    spaces: string;
    id: string;
  }[] = [];
  @State() loading = false;

  @Event({ bubbles: true, composed: true })
  iwsConferenceSelected: EventEmitter<string>;

  onFindStocks(event: Event) {
    event.preventDefault();
    this.loading = true;
    // const stockcity = this.stockcityInput.value;
    fetch(`https://wpjs.co.uk/enterprise/wp-json/enterprise/v2/conferences`)
      .then((res) => res.json())
      .then((data) => {
        this.searchResults = data.map((match) => {
          return {
            city: match.event_city,
            symbol: match.event_code,
            attendees: match.event_spaces,
            id: match.id,
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

  onSelectSymbol(payload: string) {
    console.log(
      "%cConference Selected: ",
      "color:green;font-size:18px",
      payload
    );
    this.iwsConferenceSelected.emit(payload);
  }

  render() {
    let content = (
      <ul>
        {this.searchResults.map((result) => (
          <li onClick={this.onSelectSymbol.bind(this, JSON.stringify(result))}>
            <strong>
              {result.id}: {result.symbol}
            </strong>{" "}
            - {result.city}: {result.spaces}
          </li>
        ))}
      </ul>
    );
    if (this.loading) {
      content = <uc-spinner />;
    }
    return [
      <form onSubmit={this.onFindStocks.bind(this)}>
        <div>
          <div>Vue</div>
          <h4>CONFERENCE COMPONENT</h4>
        </div>
        {/* <p>config: {this.config}</p> */}

        <input
          id="stock-symbol"
          ref={(el) => (this.stockNameInput = el)}
          placeholder="NDC"
        />
        <button type="submit">Show conferences</button>
      </form>,
      content,
    ];
  }
}
