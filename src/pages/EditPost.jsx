import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching post:", error);
      } else {
        setPost(data);
        setTitle(data.title);
        setContent(data.content);
        setImageUrl(data.image_url);
      }
    };

    fetchPost();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("posts")
      .update({
        title,
        content,
        image_url: imageUrl,
      })
      .eq("id", id);

    if (error) {
      console.error("Error updating post:", error);
    } else {
      navigate(`/post/${id}`);
    }
  };

  if (!post) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Edit Post</h2>
      <form onSubmit={handleUpdate} className="row g-3">
        <div className="col-12">
          <label className="form-label">Title</label>
          <input
            className="form-control"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="col-12">
          <label className="form-label">Content</label>
          <textarea
            className="form-control"
            rows="6"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="col-12">
          <label className="form-label">Image URL</label>
          <input
            className="form-control"
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-success">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
