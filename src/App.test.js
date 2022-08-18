import { render, screen } from "@testing-library/react"
import { FormCreator } from "./containers/FormCreator"

test("renders learn react link", () => {
  render(<FormCreator />)
  const linkElement = screen.getByText(/Form Creator/i)
  expect(linkElement).toBeInTheDocument()
})
