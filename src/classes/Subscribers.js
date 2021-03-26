const splitKey = (key) => `${key}`.split(':');

class Subscribers {
  constructor() {
    this.subscribers = new Map();
  }

  getSubscriber(key) {
    return (
      this.subscribers.get(key) || {
        deps: new Set(),
      }
    );
  }

  call(key, price) {
    if (key) {
      const subscriber = this.getSubscriber(key);

      if (price) {
        subscriber.price = price;
        this.subscribers.set(key, subscriber);

        if (subscriber.cb) {
          subscriber.cb(price);
        }
      }

      const [symbol, currency] = splitKey(key);

      subscriber.deps.forEach((dep) => {
        const { cb } = this.getSubscriber(dep);

        if (cb) {
          const [dSymbol, dCurrency] = splitKey(dep);

          if (symbol === dSymbol) {
            const dPrice = price * this.getSubscriber(`${currency}:${dCurrency}`).price || 0;

            if (dPrice) {
              cb(dPrice);
            }
          } else if (currency === dCurrency) {
            const dPrice = price * this.getSubscriber(`${dSymbol}:${symbol}`).price || 0;

            if (dPrice) {
              cb(dPrice);
            }
          }
        }
      });
    }
  }

  set(key, value) {
    if (key) {
      switch (typeof value) {
        case 'function': {
          const subscriber = this.getSubscriber(key);
          subscriber.cb = value;
          this.subscribers.set(key, subscriber);
          this.call(key);
          break;
        }

        case 'string': {
          const subscriber = this.getSubscriber(key);
          if (!subscriber.deps) subscriber.deps = new Set();
          subscriber.deps.add(value);

          this.subscribers.set(key, subscriber);
          this.call(key);
          break;
        }

        default: // do nothing
      }
    }
  }

  delete(key) {
    const subscriber = this.getSubscriber(key);

    if (subscriber.deps.size) {
      subscriber.cb = undefined;
      this.subscribers.set(key, subscriber);
    } else {
      this.subscribers.delete(key);
    }

    this.subscribers.forEach((sValue, sKey) => {
      if (sValue.deps) {
        if (sValue.deps.delete(key)) {
          if (!sValue.deps.size) {
            if (!sValue.cb) {
              this.subscribers.delete(sKey);
            }
          }
        }
      }
    });
  }

  hasKey(key) {
    return this.subscribers.has(key);
  }
}

export default Subscribers;
