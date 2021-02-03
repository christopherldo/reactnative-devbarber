import AsyncStorage from '@react-native-community/async-storage';

const BASE_API = 'https://1213f5334237.ngrok.io';

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

  read: async (id = null) => {
    const token = await AsyncStorage.getItem('token');

    let link = `${BASE_API}/user/`;

    if (id) {
      link += id;
    }

    const req = await fetch(link, {
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

  update: async (name, email, phone, password, password_confirmation) => {
    const token = await AsyncStorage.getItem('token');

    const req = await fetch(`${BASE_API}/user`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        password,
        password_confirmation,
        token,
      }),
    });

    const json = await req.json();

    return json;
  },

  updateAvatar: async (file) => {
    const token = await AsyncStorage.getItem('token');

    let data = new FormData();
    data.append('avatar', file);

    const req = await fetch(`${BASE_API}/user/avatar?token=${token}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data; ',
      },
      body: data,
    });

    const json = await req.json();

    return json;
  },
};
