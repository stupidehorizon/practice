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
  type: 'REWARD'
};

const itinerary2 = {
  from: 'xian',
  to: 'chengdu',
  date: '20160415FRI'
}

FlightBookService.setFlightInfo(FlightInfo);
const ticket1 = FlightBookService.getLowestPriceFlight(person1, itinerary1);
console.log(ticket1);
// { flight: 'GD8732', price: 400 }

const ticket2 = FlightBookService.getLowestPriceFlight(person2, itinerary2);
console.log(ticket2);
// { flight: 'GD2501', price: 800 }