import { Component, State, Event, EventEmitter, h } from "@stencil/core";

@Component({
  tag: "iws-events-finder",
  styleUrl: "./events-finder.css",
  shadow: true,
})
export class EventsFinder {
  stockNameInput: HTMLInputElement;

  @State() searchResults: {
    symbol: string;
    name: string;
    spaces: string;
  }[] = [];
  @State() loading = false;
  @Event({ bubbles: true, composed: true })
  ucSymbolSelected: EventEmitter<string>;

  onFindStocks(event: Event) {
    event.preventDefault();
    this.loading = true;
    // const stockName = this.stockNameInput.value;
    fetch(`https://wpjs.co.uk/enterprise/wp-json/enterprise/v2/conferences`)
      .then((res) => res.json())
      .then((data) => {
        this.searchResults = data.map((match) => {
          return {
            name: match.event_city,
            symbol: match.event_code,
            spaces: match.event_spaces,
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

  onSelectSymbol(symbol: string) {
    this.ucSymbolSelected.emit(symbol);
  }

  render() {
    let content = (
      <ul>
        {this.searchResults.map((result) => (
          <li onClick={this.onSelectSymbol.bind(this, result.symbol)}>
            <strong>{result.symbol}</strong> - {result.name}: {result.spaces}
          </li>
        ))}
      </ul>
    );
    if (this.loading) {
      content = <uc-spinner />;
    }
    return [
      <form onSubmit={this.onFindStocks.bind(this)}>
        <h3>0.1.6</h3>
        <p>iwswordpress-ionic npm </p>
        <input id="stock-symbol" ref={(el) => (this.stockNameInput = el)} />
        <button type="submit">Find!</button>
      </form>,
      content,
    ];
  }
}
