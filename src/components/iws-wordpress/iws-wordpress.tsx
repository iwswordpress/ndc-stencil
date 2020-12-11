import { Component, State, Event, EventEmitter, Listen, h } from '@stencil/core';

// import { AV_API_KEY } from "../../global/global";

@Component({
  tag: 'iws-wordpress',
  styleUrl: './iws-wordpress.css',
  shadow: true,
})
export class GetPosts {
  stockNameInput: HTMLInputElement;

  @State() searchResults: { id: string; title: string; content: string }[] = [];
  @State() loading = false;
  @State() id: string = '';
  @State() post = 'Output goes here...';

  @Event({ bubbles: true, composed: true })
  iwsPostSelected: EventEmitter<string>;

  @Listen('iwsSymbolSelected', { target: 'body' })
  onEvent(event: CustomEvent) {
    console.log('[IWS-WORDPRESS] Event heard: ', event.type, 'payload: ', event.detail);

    this.id = event.detail;
  }
  onFindStocks(event: Event) {
    event.preventDefault();
    this.loading = true;
    // const stockName = this.stockNameInput.value;
    fetch(`https://49plus.co.uk/udemy-rest/wp-json/wp/v2/posts`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.searchResults = data.map(post => {
          return {
            id: post.id,
            title: post.title.rendered,
            content: post.content.rendered,
          };
        });
        console.log(this.searchResults);
        this.loading = false;
      })
      .catch(err => {
        console.log(err);
        this.loading = false;
      });
  }

  onSelectPost(data: string) {
    console.log('[FLIGHTS]');
    this.iwsPostSelected.emit(data);
    const json = JSON.parse(data);
    this.post = `<h2 style='color:orange;font-style:italic'>${json.title}</h2><hr><p>${json.content}</p>`;
  }

  render() {
    let output = (
      <ul>
        {this.searchResults.map(result => (
          <li
            onClick={this.onSelectPost.bind(
              this,
              JSON.stringify({
                id: result.id,
                title: result.title,
                content: result.content,
              }),
            )}
          >
            <strong>{result.id}</strong> - {result.title}
          </li>
        ))}
      </ul>
    );
    if (this.loading) {
      output = <uc-spinner />;
    }
    return [
      <form onSubmit={this.onFindStocks.bind(this)}>
        <button type="submit">Want a flight to {this.id}</button>
      </form>,
      output,
      <div class="output" innerHTML={this.post}></div>,
    ];
  }
}
