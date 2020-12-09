import { Component, State, Listen, h } from "@stencil/core";

@Component({
  tag: "iws-events-places",
  styleUrl: "./events-places.css",
  shadow: true,
})
export class StockPrice {
  @State() eventSpaces: number = 0;
  @State() eventCode: string;
  @State() error: string;
  @State() loading = false;

  @Listen("ucSymbolSelected", { target: "body" })
  onStockSymbolSelected(event: CustomEvent) {
    console.log("Event heard: ", event);
    console.log("conference selected: " + event.detail);
    this.eventCode = event.detail;
    this.fetchEventSpaces();
  }

  componentWillLoad() {
    //console.log('componentWillLoad');
    //console.log(this.stockSymbol);
  }

  componentDidLoad() {}

  componentWillUpdate() {
    //console.log('componentWillUpdate');
  }

  componentDidUpdate() {
    //console.log('componentDidUpdate');
    // if (this.stockSymbol !== this.initialStockSymbol) {
    //   this.initialStockSymbol = this.stockSymbol;
    //   this.fetchStockPrice(this.stockSymbol);
    // }
  }

  disconnectedCallback() {
    console.log("disconnectedCallback");
  }

  fetchEventSpaces() {
    this.loading = true;
    fetch(`https://wpjs.co.uk/enterprise/wp-json/enterprise/v2/conferences`)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Invalid!");
        }
        console.log(res);
        return res.json();
      })
      .then((data) => {
        if (!data) {
          throw new Error("Invalid symbol!");
        }
        console.log(data);
        this.error = null;
        this.eventSpaces = data[1].event_spaces;
        console.log(this.eventSpaces);
        console.log("paces = ", this.eventSpaces);
        this.loading = false;
      })
      .catch((err) => {
        this.error = err.message;
        this.loading = false;
      });
  }

  hostData() {
    return { class: this.error ? "error" : "" };
  }

  render() {
    let dataContent = <p>Please enter a symbol!</p>;
    if (this.error) {
      dataContent = <p>{this.error}</p>;
    }
    if (this.eventSpaces) {
      dataContent = this.eventSpaces;
    }
    if (this.loading) {
      // dataContent = <uc-spinner></uc-spinner>;
    }
    return (
      <div>
        You are booked at <b>{this.eventCode}</b>: {dataContent}
      </div>
    );
  }
}
