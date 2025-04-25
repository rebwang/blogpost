import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import PostCard from '../components/PostCard';
// import './Home.css'; // Optional: for spacing or custom styles

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState('created_at');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchPosts();
  }, [sortBy, search]);

  const fetchPosts = async () => {
    let query = supabase.from('posts').select('*');

    // Apply search filter (case-insensitive title match)
    if (search.trim() !== '') {
      query = query.ilike('title', `%${search}%`);
    }

    // Sort by selected option
    query = query.order(sortBy, { ascending: false });

    const { data, error } = await query;

    if (!error) {
      setPosts(data);
    } else {
      console.error('Error fetching posts:', error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Blog Posts</h1>

      <div className="row g-3 align-items-center mb-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="created_at">Newest</option>
            <option value="upvotes">Most Upvoted</option>
          </select>
        </div>
      </div>

      {posts.length === 0 ? (
        <p className="text-muted">No posts found.</p>
      ) : (
        posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))
      )}
    </div>
  );
}
