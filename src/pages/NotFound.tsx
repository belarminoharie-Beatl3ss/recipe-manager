
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-center py-20 space-y-4">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="text-lg text-base-content/70">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to="/" className="btn btn-primary">
        Back to Search
      </Link>
    </div>
  );
}
