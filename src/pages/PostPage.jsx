import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import PostFullView from "../components/PostFullView"; // NEW
// import "./PostPage.css";

const PostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

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
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  const handleUpvote = async () => {
    const { data, error } = await supabase
      .from("posts")
      .update({ upvotes: (post.upvotes || 0) + 1 })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error upvoting post:", error);
    } else {
      setPost(data);
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this post?");
    if (!confirm) return;

    const { error: deleteCommentsError } = await supabase
      .from("comments")
      .delete()
      .eq("post_id", id);

    if (deleteCommentsError) {
      console.error("Error deleting comments:", deleteCommentsError);
      return;
    }

    const { error: deletePostError } = await supabase
      .from("posts")
      .delete()
      .eq("id", id);

    if (deletePostError) {
      console.error("Error deleting post:", deletePostError);
    } else {
      navigate("/");
    }
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div className="app-container">
      <PostFullView post={post} handleUpvote={handleUpvote} handleDelete={handleDelete} />
    </div>
  );
};

export default PostPage;
