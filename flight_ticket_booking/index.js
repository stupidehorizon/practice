const FLIGHT_INFO = [
  {
    flight: 'GD2501',
    weekdaysRegular: 1100,
    weekDaysReward: 800,
    weekendsRegular: 900,
    weekendsReward: 500,
  },
  {
    flight: 'GD2606',
    weekdaysRegular: 1600,
    weekDaysReward: 1100,
    weekendsRegular: 600,
    weekendsReward: 500,
  }
]

class FlightTicketBooking {
  /**
   * 构造函数
   * @param {string} type 乘客类型 Regular / Reward
   * @param {string} weekdaysType 是否是周内 weekDays / weekEnds
   * @param {string} time 乘机时间  hh:mm
   */
  constructor(type, weekdaysType, time) {
    this.type = type;
    this.weekdaysType = weekdaysType;
    this.time = time;

  }

  getLowestPriceFlight() {
    const condition = this.weekdaysType + this.type;
    const lowPriceFlight = FLIGHT_INFO.reduce((pre, cur) => (
      pre.price < cur[condition] ? pre : {price: cur[condition], flight: cur.flight }
    ), {});
    return lowPriceFlight;
  }
}