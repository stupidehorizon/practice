const FlightInfo = require('./flight_info.js');
const FlightBookService = require('./flight_book_service.js');

// test1
const person1 = {
  type: 'REWARD'
};

const itinerary1 = {
  from: 'xian',
  to: 'chengdu',
  date: '20160410SUM'
};

// test2
const person2 = {
  type: 'REGULAR'
};

const itinerary2 = {
  from: 'chengdu',
  to: 'xian',
  date: '20160411MON'
}

FlightBookService.setFlightInfo(FlightInfo);


const ticket1 = FlightBookService.getLowestPriceFlight(person1, itinerary1);
console.log(ticket1);
// { flight: 'GD8732', price: 400 };

const ticket2 = FlightBookService.getLowestPriceFlight(person2, itinerary2);
console.log(ticket2);
// { flight: 'GD2607', price: 1600, time: '16:25' };

const ticket3 = FlightBookService.getRoundtripTicket(person1, itinerary1, itinerary2);
console.log(ticket3);
// [ { flight: 'GD8732', price: 400 }, { flight: 'GD2501', price: 800 } ];

const ticket4 = FlightBookService.getRoundtripTicket(person2, itinerary1, itinerary2);
console.log(ticket4);
// [ { flight: 'GD2606', price: 600, time: '12:25' }, { flight: 'GD2607', price: 1600, time: '16:25' } ]
