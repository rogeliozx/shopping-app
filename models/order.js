import moment from "moment";

class Order {
  constructor(id, items, totalAmout, date) {
    this.id = id;
    this.items = items;
    this.totalAmout = totalAmout;
    this.date = date;
  }
  get readableDate() {
    return moment(this.date).format('MMM Do YYYY, hh:mm');
  }
}

export default Order;
