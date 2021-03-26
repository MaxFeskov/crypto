class WS {
  constructor(url) {
    this.url = url;
    this.afterOpenCb = [];
    this.subscriberList = [];

    this.open();
  }

  open() {
    if (!this.ws) {
      this.ws = new WebSocket(this.url);

      this.ws.addEventListener('message', ({ data }) => {
        this.onGetMessage(data);
      });

      this.ws.addEventListener('open', () => {
        while (this.afterOpenCb.length) {
          const msg = this.afterOpenCb.shift();
          this.sendMessage(msg);
        }
      });
    }

    return this;
  }

  close() {
    this.ws.close();

    return this;
  }

  send(msg) {
    if (msg) {
      if (!this.ws) this.open();

      if (this.ws.readyState === WebSocket.OPEN) {
        this.sendMessage(msg);
      } else {
        this.afterOpenCb.push(msg);
        this.ws.open();
      }
    }

    return this;
  }

  subscribe(cb) {
    if (typeof cb === 'function') {
      this.subscriberList.push(cb);
    }

    return this;
  }

  unsubscribe(cb) {
    if (typeof cb === 'function') {
      this.subscriberList = this.subscriberList.filter((item) => item !== cb);
    }

    return this;
  }

  sendMessage(msg) {
    this.ws.send(JSON.stringify(msg));
  }

  onGetMessage(data) {
    const msg = JSON.parse(data);
    this.subscriberList.forEach((subscriber) => subscriber(msg));
  }
}

export default WS;
