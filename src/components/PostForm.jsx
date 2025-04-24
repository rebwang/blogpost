import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function PostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("posts").insert([
      { title, content, image_url: imageUrl },
    ]);

    if (!error) navigate("/");
  };

  return (
    <div className="container">
      <h2 className="mb-4">Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          placeholder="Post Title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="form-control mb-3"
          placeholder="Content"
          rows="5"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          className="form-control mb-3"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button className="btn btn-primary">Post</button>
      </form>
    </div>
  );
}
