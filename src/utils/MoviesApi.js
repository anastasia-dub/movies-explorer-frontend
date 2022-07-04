import { MOVIEAPI_URL } from './constants';

const checkResponse = (res) => (res.ok
  ? res.json()
  : res.json()
    .then((err) => Promise.reject(new Error(`${err.message} (${res.status} ${res.statusText})`))));

export const getAllMovies = () => fetch(`${MOVIEAPI_URL}`, {
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((res) => checkResponse(res));

export default getAllMovies;
