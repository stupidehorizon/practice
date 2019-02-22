/**
 * 订票平台
 */
class FlightBookService {

  /**
   * @params {object} person 乘客
   * @params {object} itinerary 行程单
   * return {obejct} fligh 航班信息
   */
  static getLowestPriceFlight(person, itinerary) {
    const personType = person.type; // 'REWARD‘ / 'REGULAR'
    const date = itinerary.date; // '20160410SUM'
    const weekDays = moment(parseInt(date)).days() + 1; // 星期几
    const personTypeCondition = personType === 'REWARD' ? 'Reward' : 'Regular';
    const weekdaysCondition = weekDays > 5 ? 'weekends' : 'weekdays';
    const condition = weekdaysCondition + personTypeCondition;

    // 筛选出出发地与目的地符合的航班
    const fliterFlight = FLIGHT_INFO.filter(flight => (
      flight.from === itinerary.from && flight.to === itinerary.to
    ));
    // 根据乘客身份与日期选择最低机票条件数组
    const lowestPriceFlightArr = fliterFlight.map(item => (
      {flight: item.flight, price: item[condition]}
    ))
    if(lowestPriceFlightArr.length < 1) {
      return '没有符合条件的航班';
    }
    if(lowestPriceFlightArr.length = 1) {
      return lowestPriceFlightArr[0];
    }
    // 寻找最靠近12点的航班
    const lowestPriceFlight = lowestPriceFlightArr.reduce((pre, cur) => (
      pre.time  && Math.abs(parseInt(pre.time.split(':').join('')) - 1200) <  Math.abs(parseInt(cur.time.split(':').join('')) - 1200) ? pre : {price: cur[condition], flight: cur.flight }
    ), {});
    return lowPriceFlight;
  }
}

// test
const person1 = {
  type: 'REWARD'
};

const itinerary1 = {
  from: 'xian',
  to: 'chengdu',
  time: '08:00',
  date: '20160410SUM'
}

const ticket = FlightBookService.getLowestPriceFlight(person1, itinerary1)

