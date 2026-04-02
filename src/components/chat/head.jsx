import { Link } from "react-router-dom";

const Head = ({ user, room }) => {
  return (
    <div className="flex justify-between items-center p-5 border border-gray-200 shadow-lg">
      <p className="font-semibold">{user.displayName}</p>

      <p>{room}</p>

      <Link to="/" className="btn">
        Farklı Oda
      </Link>
    </div>
  );
};

export default Head;
