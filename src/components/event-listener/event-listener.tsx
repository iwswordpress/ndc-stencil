import { Component, State, Listen, h } from "@stencil/core";

@Component({
  tag: "iws-event-listener",
  styleUrl: "./event-listener.css",
  shadow: true,
})
export class EventListener {
  stockInput: HTMLInputElement;
  // initialStockSymbol: string;
  @State() listOfEvents: string[] = [];
  @State() anEvent: string = "default";
  @State() id: number = 0;

  @Listen("iwsSymbolSelected", { target: "body" })
  onEventSymbolSelected(event: CustomEvent) {
    console.log("[EVENT LISTENER] IWS: " + event.detail);
    this.id++;
    const logOutput = `${this.id}: IWS - ${event.detail}`;
    this.anEvent = logOutput;
    console.log("this.anEvent: ", this.anEvent);
    this.listOfEvents.push(this.anEvent);
  }

  @Listen("iwsPostSelected", { target: "body" })
  iwsFlightsSelected(event: CustomEvent) {
    const flight = JSON.parse(event.detail);
    console.log("[EVENT LISTENER] FL: " + flight.id);
    this.id++;
    const logOutput = `${this.id}: FL - ${flight.id}`;
    this.anEvent = logOutput;
    console.log("this.anEvent: ", this.anEvent);
    this.listOfEvents.push(this.anEvent);
  }
  @Listen("ucSymbolSelected", { target: "body" })
  onStockSymbolSelected(event: CustomEvent) {
    console.log("[EVENT LISTENER] UC: " + event.detail);
    this.id++;
    const logOutput = `${this.id}: UC - ${event.detail}`;
    this.anEvent = logOutput;
    console.log("this.anEvent: ", this.anEvent);
    this.listOfEvents.push(this.anEvent);
  }
  render() {
    // let dataContent = <p>Please enter a symbol!</p>;
    let content = (
      <ul>
        {this.listOfEvents.map((item) => (
          <li key={Math.random()}>{item}</li>
        ))}
      </ul>
    );
    return (
      <div class="log">
        <h2>EVENT LOG</h2>

        <div>{content}</div>
      </div>
    );
  }
}
