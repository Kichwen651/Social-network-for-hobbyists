import React, { useEffect, useState } from 'react';
import { fetchPosts, fetchGroups } from '../services/api';
import Post from '../components/Post';
import GroupCard from '../components/GroupCard';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);  // To handle loading state
  const [error, setError] = useState(null);  // To handle error state

  useEffect(() => {
    const getPostsAndGroups = async () => {
      try {
        setLoading(true);  // Start loading
        const postsData = await fetchPosts();
        const groupsData = await fetchGroups();
        setPosts(postsData);
        setGroups(groupsData);
      } catch (error) {
        setError('Error loading posts and groups');  // Error handling
      } finally {
        setLoading(false);  // End loading
      }
    };

    getPostsAndGroups();
  }, []);

  if (loading) {
    return <div>Loading...</div>;  // Show loading state while fetching data
  }

  if (error) {
    return <div>{error}</div>;  // Show error message if any
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Welcome to the Hobbyists Network</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Latest Posts</h2>
          {posts.length > 0 ? (
            posts.map(post => <Post key={post.id} post={post} />)
          ) : (
            <p>No posts available.</p>
          )}
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Popular Groups</h2>
          {groups.length > 0 ? (
            groups.map(group => <GroupCard key={group.id} group={group} />)
          ) : (
            <p>No groups available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
