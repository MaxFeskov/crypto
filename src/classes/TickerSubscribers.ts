type Ticker = string;

type TickerSubscriberCb = (price: number) => void;

type TickerSubscriber = {
  depends: Set<string>;
  price: number;
  cb?: TickerSubscriberCb;
};

const splitTicker = (ticker: Ticker) => `${ticker}`.split(':');

class TickerSubscribers {
  subscribers: Map<string, TickerSubscriber>;

  constructor() {
    this.subscribers = new Map();
  }

  getTickerSubscriber(ticker: Ticker) {
    return (
      this.subscribers.get(ticker) || {
        depends: new Set(),
        price: 0,
      }
    );
  }

  callTickerSubscriber(ticker: Ticker, price?: number) {
    if (ticker) {
      const subscriber = this.getTickerSubscriber(ticker);

      if (price) {
        subscriber.price = price;
        this.subscribers.set(ticker, subscriber);

        if (subscriber.cb) {
          subscriber.cb(price);
        }
      }

      this.callTickeDependsSubscriber(ticker, subscriber);
    }
  }

  callTickeDependsSubscriber(ticker: Ticker, subscriber: TickerSubscriber) {
    const [symbol, currency] = splitTicker(ticker);
    const { price } = subscriber;

    subscriber.depends.forEach((dependTicker) => {
      const { cb } = this.getTickerSubscriber(dependTicker);

      if (cb) {
        const [dSymbol, dCurrency] = splitTicker(dependTicker);

        if (symbol === dSymbol) {
          const dPrice = price * this.getTickerSubscriber(`${currency}:${dCurrency}`).price;

          if (dPrice) {
            cb(dPrice);
          }
        } else if (currency === dCurrency) {
          const dPrice = price * this.getTickerSubscriber(`${dSymbol}:${symbol}`).price;

          if (dPrice) {
            cb(dPrice);
          }
        }
      }
    });
  }

  setTickerSubscriber(ticker: Ticker, cb: TickerSubscriberCb) {
    const subscriber = this.getTickerSubscriber(ticker);
    subscriber.cb = cb;
    this.subscribers.set(ticker, subscriber);

    this.callTickerSubscriber(ticker);
  }

  setTickerDepends(ticker: Ticker, dependTicker: Ticker) {
    const subscriber = this.getTickerSubscriber(ticker);
    subscriber.depends.add(dependTicker);
    this.subscribers.set(ticker, subscriber);

    this.callTickerSubscriber(ticker);
  }

  deleteTicker(ticker: Ticker) {
    const subscriber = this.getTickerSubscriber(ticker);

    if (subscriber.depends.size) {
      delete subscriber.cb;
      this.subscribers.set(ticker, subscriber);
    } else {
      this.subscribers.delete(ticker);
    }

    this.deleteDepends(ticker);
  }

  deleteDepends(ticker: Ticker) {
    this.subscribers.forEach((sValue, sKey) => {
      if (sValue.depends) {
        if (sValue.depends.delete(ticker)) {
          if (!sValue.depends.size) {
            if (!sValue.cb) {
              this.subscribers.delete(sKey);
            }
          }
        }
      }
    });
  }

  hasTicker(ticker: Ticker) {
    return this.subscribers.has(ticker);
  }
}

export default TickerSubscribers;
