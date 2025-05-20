import ErrorPage from "../components/ErrorPage";

export default function Error400() {
  return (
    <ErrorPage
      code="400"
      title="Bad Request"
      message="The server could not understand your request due to invalid syntax."
    />
  );
}
