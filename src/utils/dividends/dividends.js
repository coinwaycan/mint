export default class Dividends {
  static BATCH_SIZE = 2500;

  static Status = {
    IN_PROGRESS: 0,
    PAUSED: 1,
    CANCELED: 2,
    CRASHED: 3
  };

  constructor({
    token,
    dividendQuantity,
    eligibleDividendReceivers,
    dividendQuantities,
    opReturn
  }) {
    this.progress = 0;
    this.status = Dividends.Status.IN_PROGRESS;
    this.token = token;
    this.startDate = Date.now();
    this.endDate = null;
    this.txs = [];
    this.receiverCount = eligibleDividendReceivers.length;
    this.remainingReceivers = eligibleDividendReceivers;
    this.remainingQuantities = dividendQuantities;
    this.opReturn = opReturn;
    this.dividendQuantity = dividendQuantity;
    this.error = "";
  }

  static getAll = () =>
    window.localStorage.getItem("dividends")
      ? JSON.parse(window.localStorage.getItem("dividends"))
      : {};

  static get = dividend => {
    const dividends = Dividends.getAll();
    return dividends[dividend.startDate];
  };

  static save = dividend => {
    try {
      const storedDividends = Dividends.getAll();
      window.localStorage.setItem(
        "dividends",
        JSON.stringify({
          ...storedDividends,
          [dividend.startDate]: {
            ...storedDividends[dividend.startDate],
            ...dividend
          }
        })
      );
    } catch (error) {
      console.log("Unable to save dividend due to: ", error.message);
    }
  };
}
