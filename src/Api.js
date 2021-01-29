import AsyncStorage from '@react-native-community/async-storage';

const BASE_API = 'https://ced015b7c677.ngrok.io';

export default {
  checkToken: async (token) => {
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
    // lat=${lat}&lng=${lng}&distance=${distance}&offset=${offset}

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
};
