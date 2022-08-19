import { ShareVideo } from "components/ShareVideo"
import { useAuth } from "context/AuthContext"

export const ProtectedPage = () => {
  const auth = useAuth()

  let items = []
  if (localStorage.getItem("sharedMovies")) {
    const sharedMovies = JSON.parse(localStorage.getItem("sharedMovies"))
    items = sharedMovies.filter((item) => item.username === auth.user.username)
  }

  return (
    <>
      {items.map((item) => (
        <ShareVideo key={`ProtectedPage-${item.author_url}`} item={item} />
      ))}
    </>
  )
}
