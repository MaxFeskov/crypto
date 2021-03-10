class WS {
  constructor(url, cb) {
    this.url = url;
    this.cb = cb;
    this.afterOpenCb = [];

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
  }

  close() {
    this.ws.close();
  }

  send(msg) {
    if (!msg) return;

    if (!this.ws) this.open();

    if (this.ws.readyState === WebSocket.OPEN) {
      this.sendMessage(msg);
    } else {
      this.afterOpenCb.push(msg);
      this.ws.open();
    }
  }

  sendMessage(msg) {
    this.ws.send(JSON.stringify(msg));
  }

  onGetMessage(data) {
    if (typeof this.cb === 'function') {
      this.cb(JSON.parse(data));
    }
  }
}

export default WS;
