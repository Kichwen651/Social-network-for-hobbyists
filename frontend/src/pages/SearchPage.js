import React, { useState, useEffect } from 'react';
import { fetchGroups, fetchAllPosts } from '../services/api'; // Import both fetchGroups and fetchAllPosts
import Post from '../components/Post';
import GroupCard from '../components/GroupCard';
import { Button } from 'react-bootstrap';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState({
    posts: [],
    groups: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch groups and posts for initial rendering
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        setError(null);  // Clear previous errors
        const groupsData = await fetchGroups();  // Fetch all groups
        const postsData = await fetchAllPosts();  // Fetch all posts

        // Ensure data is valid
        if (groupsData && postsData) {
          setSearchResults({
            posts: postsData,
            groups: groupsData,
          });
        } else {
          throw new Error('No data returned');
        }
      } catch (err) {
        console.error(err);  // Log the error to the console
        setError('No data returned');  // Set error message here
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Handle the search functionality directly within the onChange event handler
  const handleSearch = async (e) => {
    const queryValue = e.target.value;
    setQuery(queryValue);

    if (!queryValue.trim()) return;

    setLoading(true);
    try {
      // Filter posts and groups based on the query
      const filteredPosts = searchResults.posts.filter(post =>
        post.content.toLowerCase().includes(queryValue.toLowerCase())
      );
      const filteredGroups = searchResults.groups.filter(group =>
        group.title.toLowerCase().includes(queryValue.toLowerCase())
      );

      setSearchResults({
        posts: filteredPosts,
        groups: filteredGroups,
      });
    } catch (error) {
      setError('Error during search');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4 p-8">
      <h1 className="text-3xl font-bold mb-6">Search for Posts and Groups</h1>

      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleSearch}  // Directly use the handler here
          className="form-control mb-4"
        />
        <Button variant="primary" onClick={handleSearch}>Search</Button>
      </div>

      {/* Display loading state */}
      {loading && <p>Loading results...</p>}

      {/* Display error */}
      {error && <p className="text-danger">{error}</p>}

      {/* Display search results */}
      {query && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Search Results</h2>

          {/* Posts Section */}
          <div>
            <h3>Posts</h3>
            {searchResults.posts.length > 0 ? (
              searchResults.posts.map((post) => <Post key={post.id} post={post} />)
            ) : (
              <p>No posts found.</p>
            )}
          </div>

          {/* Groups Section */}
          <div>
            <h3>Groups</h3>
            {searchResults.groups.length > 0 ? (
              searchResults.groups.map((group) => <GroupCard key={group.id} group={group} />)
            ) : (
              <p>No groups found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
