import React, { useEffect } from 'react';
import {
  Route, Switch, useHistory, useLocation,
} from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Footer from '../Footer/Footer';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import mainApi from '../../utils/MainApi';
import { getAllMovies } from '../../utils/MoviesApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import './App.css';

const SHORT_MOVIE_DURATION = 40;

const searchFilter = (data, searchQuery, params) => {
  console.log('searchQuery', searchQuery);
  let filteredData = data;

  if (params.isShowOnlyShortMovies) {
    filteredData = filteredData.filter((item) => item.duration <= SHORT_MOVIE_DURATION);
  }

  if (searchQuery) {
    const regex = new RegExp(searchQuery, 'gi');
    return filteredData.filter((item) => regex.test(item.nameRU) || regex.test(item.nameEN));
  }
  return params && params.noFilterEmpty ? filteredData : [];
};

function App() {
  const [isSignUpError, setIsSignUpError] = React.useState(false);
  const [signInErrorMessage, setSignInErrorMessage] = React.useState(false);
  const [isSearchEmptyError, setIsSearchEmptyError] = React.useState(false);
  const [editIsSuccess, setEditIsSuccess] = React.useState(false);
  const [editIsFailed, setEditIsFailed] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);
  const [loadingError, setLoadingError] = React.useState('');

  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);

  const [allMovies, setAllMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [prevAllMovies, setPrevAllMovies] = React.useState([allMovies]);
  const [prevSavedMovies, setPrevSavedMovies] = React.useState(savedMovies);
  const [filterMovies, setFilterMovies] = React.useState([]);
  const [filterSavedMovies, setFilterSavedMovies] = React.useState([]);
  const [query, setQuery] = React.useState('');
  const [isShowOnlyShortMovies, setIsShowOnlyShortMovies] = React.useState(false);

  useEffect(() => {
    const isAllMoviesLoaded = prevAllMovies.length === 0 && allMovies.length > 0;
    const isSavedMoviesChanded = savedMovies !== prevSavedMovies;
    if (isAllMoviesLoaded || isSavedMoviesChanded) {
      setAllMovies(allMovies.map(movie => {
        const isMovieSaved = savedMovies.some(savedMovie => savedMovie.id === movie.id);
        if (isMovieSaved) {
          return ({ ...movie, saved: true });
        }

        if (movie.saved) {
          const newMovie = { ...movie };
          delete newMovie.saved;
          return newMovie;
        }

        return movie;
      }));

      setPrevSavedMovies(savedMovies);
    }
  }, [allMovies, prevSavedMovies, prevAllMovies, savedMovies]);

  useEffect(() => {
    if (allMovies !== prevAllMovies) {
      setPrevAllMovies(allMovies);
    }
  }, [allMovies, prevAllMovies]);

  useEffect(() => {
    const filterData = searchFilter(allMovies, query, { isShowOnlyShortMovies });
    setFilterMovies(filterData);
  }, [allMovies, query, isShowOnlyShortMovies]);

  const history = useHistory();
  const { pathname } = useLocation();

  useEffect(() => {
    setQuery('');
  }, [pathname]);

  const getCurrentUser = () => {
    const token = localStorage.getItem('token');
    mainApi
      .getUserInfo(token)
      .then((userData) => {
        if (userData) {
          setCurrentUser(userData);
          localStorage.setItem('currentUser', JSON.stringify(userData));
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    const path = { pathname };
    const token = localStorage.getItem('token');
    if (token) {
      mainApi
        .checkToken(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            getCurrentUser();
            history.push(path);
          }
        })
        .catch((err) => {
          console.error(err);
          localStorage.removeItem('token');
          history.push('/');
        });
    }
  }, []);

  const signInHandler = (email, password) => {
    mainApi
      .signIn(email, password)
      .then((data) => {
        if (data) {
          localStorage.setItem('token', data.token);
          setLoggedIn(true);
          getCurrentUser();
          history.push('/movies');
        }
      })
      .catch((err) => {
        setSignInErrorMessage(err.message);
      });
  };

  const signUpHandler = (name, email, password) => {
    mainApi
      .signUp(name, email, password)
      .then((data) => {
        if (data) {
          signInHandler(email, password);
        }
      })
      .catch((err) => {
        setIsSignUpError(true);
        console.error(err);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    setLoggedIn(false);
    setCurrentUser({});

    setAllMovies([]);
    setSavedMovies([]);
    setFilterMovies([]);
    setFilterSavedMovies([]);

    history.push('/');
  };

  const changeProfileData = (newUserData) => {
    const { name, email } = newUserData;
    mainApi.saveUserInfo(name, email)
      .then((data) => {
        setCurrentUser(data);
        setEditIsSuccess(true);
        setEditIsFailed(false);
        setTimeout(() => {
          setEditIsSuccess(false);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setEditIsFailed(true);
        setTimeout(() => {
          setEditIsFailed(false);
        }, 3000);
      });
  };

  const getAllMoviesData = () => {
    getAllMovies()
      .then((data) => {
        const allMoviesData = data.map((item) => {
          const imageURL = item.image ? item.image.url : '';
          return {
            ...item,
            image: `https://api.nomoreparties.co${imageURL}`,
          };
        });

        setAllMovies(allMoviesData);
      })
      .catch(() => {
        setLoadingError('Во время запроса произошла ошибка. '
          + 'Возможно, проблема с соединением или сервер недоступен. '
          + 'Подождите немного и попробуйте ещё раз');
      });
  };

  const getSavedMovies = () => {
    mainApi
      .getSavedMovies()
      .then((data) => {
        const savedArray = data.map((item) => ({ ...item, id: item.movieId }));
        setSavedMovies(savedArray);
      })
      .catch((err) => {
        console.log(err);
        setLoadingError('Во время запроса произошла ошибка. '
          + 'Возможно, проблема с соединением или сервер недоступен. '
          + 'Подождите немного и попробуйте ещё раз');
      });
  };

  const handleShortMoviesCheckboxClick = React.useCallback(e => {
    setIsShowOnlyShortMovies(e.target.checked);
  }, [setIsShowOnlyShortMovies]);

  useEffect(() => {
    if (loggedIn) {
      getAllMoviesData();
      getSavedMovies();
    }
  }, [loggedIn]);

  const isMovieAdded = (movie) => savedMovies.some((item) => item.id === movie.id);

  const searchHandler = ({ search }) => {
    if (typeof search === 'undefined' || search.length === 0) {
      setIsSearchEmptyError(true);
      return;
    }

    setIsSearchEmptyError(false);

    setIsLoading(true);
    setTimeout(() => {
      setQuery(search);
      setIsLoading(false);
    }, 600);
  };

  const addToBookmarks = (movie) => {
    mainApi
      .addBookmark(movie)
      .then((res) => {
        setSavedMovies([...savedMovies, { ...res.data, id: res.data.movieId }]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const removeFromBookmark = (movie) => {
    const movieId = savedMovies.find((item) => item.id === movie.movieId)._id;
    mainApi
      .removeBookmark(movieId)
      .then((res) => {
        if (res) {
          const newArray = savedMovies.filter((item) => item.id !== res.data.movieId);
          setSavedMovies(newArray);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    setFilterSavedMovies(searchFilter(
      savedMovies,
      query,
      { noFilterEmpty: true, isShowOnlyShortMovies },
    ));
  }, [savedMovies, query, isShowOnlyShortMovies]);

  return (
    <div className="App">
      <div className="page-container">
        <CurrentUserContext.Provider value={currentUser}>

          <Route exact path={['/', '/movies', '/saved-movies', '/profile']}>
            <Header
            loggedIn={loggedIn}
            absolute={pathname === '/'}
            />
          </Route>

          <Switch>
            <Route exact path="/">
              <Main />
            </Route>

            <ProtectedRoute
              exact
              path="/movies"
              loggedIn={loggedIn}
              isLoading={isLoading}
              loadingError={loadingError}
              component={Movies}
              savedMovies={savedMovies}
              moviesData={filterMovies}
              onSubmit={searchHandler}
              onSaveMovie={addToBookmarks}
              onDeleteSavedMovie={removeFromBookmark}
              isMovieAdded={isMovieAdded}
              isSearchEmptyError={isSearchEmptyError}
              onShortMoviesCheckboxClick={handleShortMoviesCheckboxClick}
            />

            <ProtectedRoute
              exact
              path="/saved-movies"
              loggedIn={loggedIn}
              isLoading={isLoading}
              loadingError={loadingError}
              component={SavedMovies}
              savedMovies={filterSavedMovies}
              movies={savedMovies}
              onSubmit={searchHandler}
              onDeleteSavedMovie={removeFromBookmark}
              isMovieAdded={isMovieAdded}
              onShortMoviesCheckboxClick={handleShortMoviesCheckboxClick}
              getSavedMoviesResStatus={true}
            />

            <ProtectedRoute
              exact
              path="/profile"
              loggedIn={loggedIn}
              component={Profile}
              onUpdateCurrentUser={changeProfileData}
              onSignOut={handleLogout}
              editIsSuccess={editIsSuccess}
              editIsFailed={editIsFailed}
              currentUser={currentUser}
            />

            <Route path="/signup">
              <Register signUpHandler={signUpHandler} isSignUpError={isSignUpError} />
            </Route>

            <Route path="/signin">
              <Login signInHandler={signInHandler} error={signInErrorMessage} />
            </Route>

            <Route component={NotFound} />
          </Switch>

          <Route exact path={['/', '/movies', '/saved-movies']}>
            <Footer />
          </Route>
        </CurrentUserContext.Provider>

      </div>

    </div>
  );
}

export default App;
