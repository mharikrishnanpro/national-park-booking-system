import { Link } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";
import { Icons } from "../constants/icons";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="text-center max-w-md">
        <Icons.AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-3" />

        <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
        <p className="text-gray-600 mb-6">
          The page you’re trying to access does not exist or has been moved.
        </p>

        <Link to="/">
          <Button size="md">Go Back Home</Button>
        </Link>
      </Card>
    </div>
  );
};

export default NotFoundPage;
