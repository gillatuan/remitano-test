import { Col, Row } from "react-bootstrap"

export const ShareVideo = (props) => {
  const { item } = props

  return (
    <Row>
      <Col md={6}>
        <iframe
          width="100%"
          height="180"
          src={item.author_url}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      </Col>

      <Col md={6}>
        <p>{item.title}</p>
        <p>Share by: {item.username}</p>
      </Col>
    </Row>
  )
}
