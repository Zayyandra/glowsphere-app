import ErrorPage from "../components/ErrorPage";

export default function Error401() {
  return (
    <ErrorPage
      code="401"
      title="Unauthorized"
      message="You must be authenticated to access this resource."
    />
  );
}
