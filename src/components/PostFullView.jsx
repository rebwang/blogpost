import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { BsFillHandThumbsUpFill } from "react-icons/bs";

export default function PostFullView({ post, handleUpvote, handleDelete }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchComments();
  }, [post.id]);

  const fetchComments = async () => {
    const { data } = await supabase
      .from("comments")
      .select("*")
      .eq("post_id", post.id)
      .order("created_at", { ascending: false });
    setComments(data || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from("comments")
      .insert([{ post_id: post.id, content: comment }]);
    if (!error) {
      setComment("");
      fetchComments();
    }
  };

  return (
    <div className="container mb-5">
      <div className="card">
        <div className="card-body">
          <h2>{post.title}</h2>
          <p className="text-muted">{new Date(post.created_at).toLocaleString()}</p>
          <p>{post.content}</p>
          {post.image_url && (
            <img
              src={post.image_url}
              alt="Post"
              className="img-fluid rounded my-3"
            />
          )}

          <div className="d-flex gap-2 mb-3">
            <button className="btn btn-primary" onClick={handleUpvote}>
              <BsFillHandThumbsUpFill className="me-1" />
               {post.upvotes ?? 0}
            </button>
            <button className="btn btn-secondary" onClick={() => navigate(`/edit/${post.id}`)}>
              Edit
            </button>
            <button className="btn btn-danger" onClick={handleDelete}>
              Delete
            </button>
          </div>

          <hr />

          <h4 className="mb-3">Comments</h4>
          {comments.length === 0 ? (
            <p>No comments yet.</p>
          ) : (
            comments.map((c) => (
              <div className="border rounded p-2 mb-2" key={c.id}>
                <p className="mb-1">{c.content}</p>
                <small className="text-muted">{new Date(c.created_at).toLocaleString()}</small>
              </div>
            ))
          )}

          <form onSubmit={handleSubmit} className="mt-4">
            <textarea
              className="form-control mb-2"
              rows="3"
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button className="btn btn-outline-primary">Submit Comment</button>
          </form>
        </div>
      </div>
    </div>

    
  );
}
