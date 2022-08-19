import { createContext, useContext, useState } from "react"

const MoviesContext = createContext()
export const MoviesProvider = (props) => {
  const { children } = props

  let movies = []
  if (localStorage.getItem('sharedMovies')) {
    // get user from localStorage
    movies = JSON.parse(localStorage.getItem('sharedMovies'))
  }
  const [sharedMovies, setSharedMovies] = useState(movies)

  const value = { sharedMovies, setSharedMovies}

  return <MoviesContext.Provider value={value}>{children}</MoviesContext.Provider>
}

export const useMovies = () => {
  return useContext(MoviesContext)
}
