import { Component, State, Listen, h, Prop } from "@stencil/core";

@Component({
  tag: "iws-events-booking",
  styleUrl: "./events-booking.css",
  shadow: true,
})
export class EventsBooking {
  @Prop() config: string;
  @State() eventSpaces: number = 0;
  @State() eventCode: string;
  @State() eventId: string;

  @State() error: string;
  @State() loading = false;

  @Listen("iwsConferenceSelected", { target: "body" })
  onStockSymbolSelected(event: CustomEvent) {
    console.log(
      "%c[BOOKING] Event heard: ",
      "color:blue;font-size:18px",
      event.type,
      "payload: ",
      event.detail
    );
    const json = JSON.parse(event.detail);
    this.eventId = json.id;
    this.fetchEventSpaces();
  }

  fetchEventSpaces() {
    this.loading = true;
    //console.log("fetch id: ", this.eventId);
    const api = `https://wp-html.co.uk/api/wp-json/enterprise/v2/get-event?id=${this.eventId}`;
    //console.log("api: ", api);
    fetch(api)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Invalid!");
        }
        //console.log(res);
        return res.json();
      })
      .then((data) => {
        if (!data) {
          throw new Error("Invalid symbol!");
        }
        // console.log("data ", data);
        this.error = null;
        this.eventSpaces = data[0].event_spaces;
        this.eventCode = data[0].event_code;
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
    let dataContent = [
      <div>
        <div>React</div>
        <h4>BOOKING COMPONENT</h4>
      </div>,
    ];
    if (this.error) {
      dataContent = <p>{this.error}</p>;
    }
    if (this.eventSpaces) {
      dataContent = (
        <div>
          <div>React</div>
          <h4>BOOKING COMPONENT</h4>
          {/* <p>Config: {this.config}</p> */}
          <p>
            You are booked at:
            <br></br>
            <br>
              {this.eventCode} (ID: {this.eventId})
            </br>
            which has {this.eventSpaces} attendees already!
          </p>
        </div>
      );
    }
    if (this.loading) {
      // dataContent = <uc-spinner></uc-spinner>;
    }
    return <div>{dataContent}</div>;
  }
}
