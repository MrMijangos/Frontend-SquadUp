import { useState, useEffect } from "react";
import PostCard from "./PostCard";
import { getAllPosts } from "../../services/postService";
import type { PostData } from "../../services/postService";

const PostList = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllPosts()
      .then(setPosts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-sm text-gray-500">Cargando posts...</p>;

  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;