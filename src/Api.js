import AsyncStorage from '@react-native-community/async-storage';

const BASE_API = 'https://0ea7574c0a52.ngrok.io';

export default {
  checkToken: async () => {
    const token = await AsyncStorage.getItem('token');

    const req = await fetch(`${BASE_API}/auth/refresh`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({token}),
    });

    const json = await req.json();

    return json;
  },

  signIn: async (email, password) => {
    const req = await fetch(`${BASE_API}/auth/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password}),
    });

    const json = await req.json();

    return json;
  },

  signUp: async (name, email, password, password_confirmation) => {
    const req = await fetch(`${BASE_API}/user`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, email, password, password_confirmation}),
    });

    const json = await req.json();

    return json;
  },

  getBarbers: async (lat, lng, city, distance, offset) => {
    const token = await AsyncStorage.getItem('token');

    if (offset === undefined) {
      offset = 0;
    }

    let queryString = `offset=${offset}`;

    if (city) {
      queryString += `&city=${city}`;
    } else if (lat && lng) {
      queryString += `&lat=${lat}&lng=${lng}`;
    }

    if (distance) {
      queryString += `&distance=${distance}`;
    }

    const req = await fetch(`${BASE_API}/barbers?${queryString}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await req.json();

    return json;
  },

  logout: async () => {
    const token = await AsyncStorage.getItem('token');

    const req = await fetch(`${BASE_API}/auth/logout`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({token}),
    });

    const json = await req.json();

    return json;
  },

  getBarber: async (id) => {
    const token = await AsyncStorage.getItem('token');

    const req = await fetch(`${BASE_API}/barber/${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await req.json();

    return json;
  },

  toggleFavorite: async (barber) => {
    const token = await AsyncStorage.getItem('token');

    const req = await fetch(`${BASE_API}/user/favorite`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({token, barber}),
    });

    const json = await req.json();

    return json;
  },

  setAppointment: async (id, service, year, month, day, hour, minutes, now) => {
    const token = await AsyncStorage.getItem('token');

    month = month + 1;

    const req = await fetch(
      `${BASE_API}/barber/${id}/appointment?hour=${hour}&minutes=${minutes}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          service,
          year,
          month,
          day,
          now,
        }),
      },
    );

    const json = await req.json();

    return json;
  },

  search: async (query) => {
    const token = await AsyncStorage.getItem('token');

    const req = await fetch(`${BASE_API}/search?q=${query}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await req.json();

    return json;
  },

  getFavorites: async () => {
    const token = await AsyncStorage.getItem('token');

    const req = await fetch(`${BASE_API}/user/favorites`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await req.json();

    return json;
  },

  getAppointments: async (now) => {
    const token = await AsyncStorage.getItem('token');

    const req = await fetch(`${BASE_API}/user/appointments?now=${now}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await req.json();

    return json;
  },
};
