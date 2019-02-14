const FLIGHT_INFO = [
  {
    flight: 'GD2501',
    weekdaysRegular: 1100,
    weekdaysReward: 800,
    weekendsRegular: 900,
    weekendsReward: 500,
    time: '08:00',
    from: 'xian',
    to: 'chengdu'
  },
  {
    flight: 'GD2606',
    weekdaysRegular: 1600,
    weekdaysReward: 1100,
    weekendsRegular: 600,
    weekendsReward: 500,
    time: '12:25',
    from: 'xian',
    to: 'chengdu'
  },
  {
    flight: 'GD8732',
    weekdaysRegular: 2200,
    weekdaysReward: 1000,
    weekendsRegular: 1500,
    weekendsReward: 400,
    time: '19:30',
    from: 'xian',
    to: 'chengdu'
  },
  {
    flight: 'GD2502',
    weekdaysRegular: 1700,
    weekdaysReward: 800,
    weekendsRegular: 900,
    weekendsReward: 800,
    time: '12:00',
    from: 'chengdu',
    to: 'xian'
  },
  {
    flight: 'GD2607',
    weekdaysRegular: 1600,
    weekdaysReward: 1100,
    weekendsRegular: 600,
    weekendsReward: 500,
    time: '16:25',
    from: 'chengdu',
    to: 'xian'
  },
  {
    flight: 'GD8733',
    weekdaysRegular: 1600,
    weekdaysReward: 1500,
    weekendsRegular: 1000,
    weekendsReward: 400,
    time: '23:30',
    from: 'chengdu',
    to: 'xian'
  }
]

class FlightTicketBooking {
  /**
   * 构造函数
   * @param {string} type 乘客类型 Regular / Reward
   * @param {string} weekdaysType 是否是周内 weekDays / weekEnds
   * @param {string} time 乘机时间  hh:mm
   */
  constructor(type, weekdaysType, time, from, to) {
    this.type = type;
    this.weekdaysType = weekdaysType;
    this.time = time;
    this.from = from;
    this.to = to;
  }

  getLowestPriceFlight() {
    const condition = this.weekdaysType + this.type;
    const fliterFlight = FLIGHT_INFO.filter(flight => (
      flight.from === this.from && flight.to === this.to && flight.time === this.time
    ));
    const lowPriceFlight = fliterFlight.reduce((pre, cur) => (
      pre.price < cur[condition] ? pre : {price: cur[condition], flight: cur.flight }
    ), {});
    return lowPriceFlight;
  }
}

// test

const a = new FlightTicketBooking('Regular', 'weekdays', '08:00', 'xian', 'chengdu');
console.log(a.getLowestPriceFlight()); // {price: 1100, flight: "GD2501"}

const b = new FlightTicketBooking('Reward', 'weekdays', '08:00', 'xian', 'chengdu');
console.log(b.getLowestPriceFlight()); // {price: 800, flight: "GD2501"}