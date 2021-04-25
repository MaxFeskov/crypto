const NORMAL_CLOSE_CODE = 1000;

type Message = object;
type MessageCallback = (msg: any) => void;

type WebSocketOpentCallback = (event: Event) => void;
type WebSocketMessageCallback = (event: MessageEvent) => void;
type WebSocketErrorCallback = (event: Event, reconnect: () => void) => void;
type WebSocketClosetCallback = (event: CloseEvent, reconnect: () => void) => void;

type WebSocketCallbacks = {
  onOpen?: WebSocketOpentCallback;
  onMessage?: WebSocketMessageCallback;
  onError?: WebSocketErrorCallback;
  onClose?: WebSocketClosetCallback;
};

class WS {
  url: string;

  subscriberList: Array<MessageCallback>;

  afterOpenCbList: Array<Message>;

  ws: WebSocket;

  onOpen: WebSocketOpentCallback | undefined;

  onMessage: WebSocketMessageCallback | undefined;

  onError: WebSocketErrorCallback | undefined;

  onClose: WebSocketClosetCallback | undefined;

  constructor(url: string, callbacks?: WebSocketCallbacks) {
    this.url = url;
    this.afterOpenCbList = [];
    this.subscriberList = [];
    this.ws = this.connect();

    this.onOpen = callbacks?.onOpen;
    this.onMessage = callbacks?.onMessage;
    this.onError = callbacks?.onError;
    this.onClose = callbacks?.onClose;
  }

  handlerOpen = (event: Event) => {
    if (this.onOpen) this.onOpen(event);

    while (this.afterOpenCbList.length) {
      const msg = this.afterOpenCbList.shift();
      this.sendMessage(msg);
    }
  };

  handlerMessage = (event: MessageEvent) => {
    if (this.onMessage) this.onMessage(event);

    this.subscriberList.forEach((subscriber) => subscriber(JSON.parse(event.data)));
  };

  handlerError = (event: Event) => {
    if (this.onError) this.onError(event, this.connect);
  };

  handlerClose = (event: CloseEvent) => {
    if (this.onClose) this.onClose(event, this.connect);
  };

  connect() {
    if (this.ws) {
      this.ws.removeEventListener('open', this.handlerOpen);
      this.ws.removeEventListener('message', this.handlerMessage);
      this.ws.removeEventListener('error', this.handlerError);
      this.ws.removeEventListener('close', this.handlerClose);
    }

    const socket = new WebSocket(this.url);

    socket.addEventListener('open', this.handlerOpen);
    socket.addEventListener('message', this.handlerMessage);
    socket.addEventListener('error', this.handlerError);
    socket.addEventListener('close', this.handlerClose);

    return socket;
  }

  close() {
    this.ws.close(NORMAL_CLOSE_CODE);

    return this;
  }

  send(msg: Message) {
    if (msg) {
      if (!this.ws) this.ws = this.connect();

      if (this.ws.readyState === WebSocket.OPEN) {
        this.sendMessage(msg);
      } else {
        this.afterOpenCbList.push(msg);
      }
    }

    return this;
  }

  subscribe(cb: MessageCallback) {
    if (typeof cb === 'function') {
      this.subscriberList.push(cb);
    }

    return this;
  }

  unsubscribe(cb: MessageCallback) {
    if (typeof cb === 'function') {
      this.subscriberList = this.subscriberList.filter((item) => item !== cb);
    }

    return this;
  }

  sendMessage(msg?: Message) {
    if (msg) {
      this.ws.send(JSON.stringify(msg));
    }
  }
}

export default WS;
