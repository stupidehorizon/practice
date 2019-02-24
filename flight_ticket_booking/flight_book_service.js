const moment = require('moment');
/**
 * 订票平台
 */
class FlightBookService {

  constructor() {
    this.flighInfo = {}
  }

  setFlightInfo(flighInfo) {
    this.flighInfo = flighInfo;
  }

  /**
   * @params {object} person 乘客
   * @params {object} itinerary 行程单
   * return {obejct} fligh 航班信息
   */
  getLowestPriceFlight(person, itinerary) {
    const personType = person.type; // 'REWARD‘ / 'REGULAR'
    const date = itinerary.date; // '20160410SUM'
    const weekDays = moment(parseInt(date).toString()).days(); // 星期几
    const personTypeCondition = personType === 'REWARD' ? 'Reward' : 'Regular';
    const weekdaysCondition = weekDays > 0 && weekDays < 6 ? 'weekdays' : 'weekends';
    const condition = weekdaysCondition + personTypeCondition;

    // 筛选出出发地与目的地符合的航班
    const fliterFlight = this.flighInfo.filter(flight => (
      flight.from === itinerary.from && flight.to === itinerary.to
    ));
    // 根据乘客身份与日期选择最低机票条件数组
    const lowestPriceFlightArr = fliterFlight.map(item => (
      {flight: item.flight, price: item[condition], time: item.time }
    ))

    // 找到最低票价航班
    let lowestPrice = Number.MAX_SAFE_INTEGER;
    let lowestPriceFlishts = [];
    for(let flight of lowestPriceFlightArr) {
      if(flight.price < lowestPrice) {
        lowestPrice = flight.price;
        lowestPriceFlishts = [flight];
      } else if(flight.price === lowestPrice) {
        lowestPriceFlishts.push(flight);
      }
    };

    if(lowestPriceFlishts.length < 1) {
      return '没有符合条件的航班';
    }
    if(lowestPriceFlishts.length === 1) {
      return lowestPriceFlishts[0];
    }
    // 寻找最靠近12点的航班
    const lowestPriceAndClose12Flight = lowestPriceFlishts.reduce((pre, cur) => (
      pre.time  && Math.abs(Number(pre.time.split(':').join('')) - 1200) <  Math.abs(Number(cur.time.split(':').join('')) - 1200) ? pre : cur
    ), {});
    return lowestPriceAndClose12Flight;
  }

  getRoundtripTicket(person, itinerary1, itinerary2) {
    return [this.getLowestPriceFlight(person, itinerary1), this.getLowestPriceFlight(person, itinerary2)];
  }

}

const fliterBookService = new FlightBookService();

module.exports = fliterBookService;
