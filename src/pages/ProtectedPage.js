import { ShareVideo } from 'components/ShareVideo';
import { useAuth } from 'context/AuthContext';
import { useMovies } from 'context/MoviesContext';
import { useEffect, useState } from 'react';

export const ProtectedPage = () => {
  const auth = useAuth();
  const movies = useMovies();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (movies.sharedMovies.length > 0) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const filterItems = movies.sharedMovies.filter(
        (item) => item.username === auth.user.username
      );
      setItems(filterItems);
    }
  }, [auth.user.username, movies.sharedMovies]);

  return (
    <>
      {items.map((item) => (
        <ShareVideo key={`ProtectedPage-${item.author_url}`} item={item} />
      ))}
    </>
  );
};
