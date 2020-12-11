import { Component, State, Listen, h } from '@stencil/core';

@Component({
  tag: 'iws-events-places',
  styleUrl: './events-places.css',
  shadow: true,
})
export class StockPrice {
  @State() eventSpaces: number = 0;
  @State() eventCode: string;
  @State() eventId: string;

  @State() error: string;
  @State() loading = false;

  @Listen('iwsSymbolSelected', { target: 'body' })
  onStockSymbolSelected(event: CustomEvent) {
    console.log('[EVENTS PLACES] Event heard: ', event.type, 'payload: ',event.detail);

    this.eventId = event.detail;

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
    console.log('disconnectedCallback');
  }

  fetchEventSpaces() {
    this.loading = true;
    //console.log("fetch id: ", this.eventId);
    const api = `https://wpjs.co.uk/enterprise/wp-json/enterprise/v2/get-event?id=${this.eventId}`;
    //console.log("api: ", api);
    fetch(api)
      .then(res => {
        if (res.status !== 200) {
          throw new Error('Invalid!');
        }
        //console.log(res);
        return res.json();
      })
      .then(data => {
        if (!data) {
          throw new Error('Invalid symbol!');
        }
        console.log('data ', data);
        this.error = null;
        this.eventSpaces = data[0].event_spaces;
        this.eventCode = data[0].event_code;
        this.loading = false;
      })
      .catch(err => {
        this.error = err.message;
        this.loading = false;
      });
  }

  hostData() {
    return { class: this.error ? 'error' : '' };
  }

  render() {
    let dataContent = <h2>TICKETS</h2>;
    if (this.error) {
      dataContent = <p>{this.error}</p>;
    }
    if (this.eventSpaces) {
      dataContent = (
        <div>
          <h2>TICKETS</h2>
          <p>
            You are booked at{' '}
            <b>
              {this.eventCode} (ID: {this.eventId})
            </b>{' '}
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
