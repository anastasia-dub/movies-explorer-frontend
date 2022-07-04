import isValidUrl from './isValidUrl';

const getTrailerUrl = (data) => {
  if (isValidUrl(data.trailerLink)) {
    return data.trailerLink;
  }
  return 'https://www.youtube.com';
};

export default getTrailerUrl;
