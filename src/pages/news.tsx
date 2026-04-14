import { useEffect, useState, useCallback, memo } from "react";

const API_BASE_URL = "http://localhost:3001";

function usePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    const res = await fetch(`${API_BASE_URL}/api/posts`);
    const data = await res.json();
    setPosts(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, setPosts, loading };
}

function useLike(setPosts) {
  const toggleLike = useCallback(async (id) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              isLiked: !p.isLiked,
              likes: p.isLiked ? p.likes - 1 : p.likes + 1,
            }
          : p
      )
    );

    await fetch(`${API_BASE_URL}/api/posts/${id}/like`, {
      method: "POST",
    });
  }, [setPosts]);

  return { toggleLike };
}

const Post = memo(({ post, onLike }) => {
  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <img src={post.author.avatar} style={styles.avatar} />
        <div>
          <div>{post.author.name}</div>
          <div style={styles.time}>{post.createdAt}</div>
        </div>
      </div>

      <div style={styles.content}>{post.content}</div>

      <button onClick={() => onLike(post.id)}>
        {post.isLiked ? "❤️" : "🤍"} {post.likes}
      </button>
    </div>
  );
});

export default function NewsFeed() {
  const { posts, setPosts, loading } = usePosts();
  const { toggleLike } = useLike(setPosts);

  if (loading) return <div>Loading...</div>;

  return (
    <div style={styles.container}>
      {posts.map((p) => (
        <Post key={p.id} post={p} onLike={toggleLike} />
      ))}
    </div>
  );
}

const styles = {
  container: { maxWidth: 500, margin: "0 auto" },
  card: { border: "1px solid #ddd", padding: 12, marginBottom: 10 },
  header: { display: "flex", gap: 10, alignItems: "center" },
  avatar: { width: 40, height: 40, borderRadius: "50%" },
  time: { fontSize: 12, color: "#777" },
  content: { margin: "10px 0" },
};