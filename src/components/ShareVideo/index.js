export const ShareVideo = (props) => {
  const { item } = props

  return (
    <>
      <p>{item.title}</p>
      <p>Share by: {item.username}</p>
    </>
  )
}
