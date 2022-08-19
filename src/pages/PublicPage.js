import { ShareVideo } from "components/ShareVideo"

export const PublicPage = () => {
  let items = []
  if (localStorage.getItem("sharedMovies")) {
    items = JSON.parse(localStorage.getItem("sharedMovies"))
  }

  return (
    <>
      {items.map((item) => (
        <ShareVideo key={`PublicPage-${item.author_url}`} item={item} />
      ))}
    </>
  )
}
