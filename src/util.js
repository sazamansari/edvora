export function getRides(rides, state, city) {
  if (city !== "") {
    return getRidesByCity(rides, city);
  }
  if (state !== "") {
    return getRidesByState(rides, state);
  }
  return rides;
}

export function getStationPath(ride) {
  let response = "[";
  response += ride.station_path.toString();
  response += "]";
  return response;
}

export function getDistance(ride, userStationCode) {
  let distance = 1000;
  if (userStationCode <= ride.origin_station_code) {
    distance = ride.origin_station_code - userStationCode;
    return distance;
  }
  for (let i = 0; i < ride.station_path.length; i++) {
    if (userStationCode <= ride.station_path[i]) {
      distance = Math.min(distance, ride.station_path[i] - userStationCode);
      break;
    }
  }
  if (userStationCode <= ride.destination_station_code)
    distance = Math.min(
      distance,
      ride.destination_station_code - userStationCode
    );
  return distance;
}

export function getUpcomingRides(rides) {
  let upcoming = [];
  const currentDate = Date.now();
  rides.forEach((ride) => {
    if (new Date(ride.date) > currentDate) upcoming.push(ride);
  });
  upcoming.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });
  return upcoming;
}

export function getPastRides(rides) {
  let past = [];
  const currentDate = Date.now();
  rides.forEach((ride) => {
    if (new Date(ride.date) < currentDate) past.push(ride);
  });
  past.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });
  return past;
}

export function sortedRides(rides, userStationCode) {
  let sorted = [];
  rides.forEach((ride) => {
    const distance = getDistance(ride, userStationCode);
    sorted.push({ distance, ...ride });
  });
  sorted.sort((a, b) => {
    return a.distance - b.distance;
  });
  return sorted;
}

export function getStates(rides) {
  let states = [];
  rides.forEach((ride) => {
    if (!states.includes(ride.state)) states.push(ride.state);
  });
  states.sort();
  return states;
}

export function getCitiesByState(rides, state) {
  let cities = [];
  rides.forEach((ride) => {
    if (!cities.includes(ride.city) && ride.state === state) {
      cities.push(ride.city);
    }
  });
  cities.sort();
  return cities;
}

export function getRidesByState(rides, state) {
  let ridesByState = [];
  rides.forEach((ride) => {
    if (ride.state === state) ridesByState.push(ride);
  });
  return ridesByState;
}

export function getRidesByCity(rides, city) {
  let ridesByCity = [];
  rides.forEach((ride) => {
    if (ride.city === city) ridesByCity.push(ride);
  });
  return ridesByCity;
}
