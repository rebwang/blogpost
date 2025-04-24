import { Link } from "react-router-dom";

const getTimeAgo = (createdAt) => {
  const now = new Date();
  const postTime = new Date(createdAt);
  const diffMs = now - postTime;
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 1) {
    const diffMins = Math.floor(diffMs / (1000 * 60));
    return `Posted ${diffMins || 1} minute${diffMins !== 1 ? 's' : ''} ago`;
  } else if (diffHours < 24) {
    return `Posted ${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  } else {
    return `Posted ${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  }
};

export default function PostCard({ post }) {
  return (
    <div className="card mb-4">
        <Link to={`/post/${post.id}`} className="text-decoration-none text-dark">
      <div className="card-body">
        <p className="card-subtitle text-muted mb-2">
          {getTimeAgo(post.created_at)}
        </p>
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text">{post.upvotes ?? 0} upvotes</p>
      </div>
      </Link>
    </div>
  );
}
