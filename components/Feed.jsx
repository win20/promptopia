'use client';

import { useState, useEffect } from 'react'

import PromptCard from './PromptCard';
import { plugin } from 'mongoose';

const PromptCardList = ({data, handleTagClick}) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {

  const [searchText, setsearchText] = useState('');
  const [posts, setposts] = useState([]);
  const [searchedPosts, setSearchedPosts] = useState([]);

  const handleSearchChange = async (e) => {
    const search = e.target.value;

    const filteredPosts = posts.filter((p) => p.prompt.includes(search))
    setSearchedPosts(filteredPosts);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setposts(data);
    };

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className='relative w-full flex-center'>
        <input type="text" placeholder='Search for a prompt' onChange={handleSearchChange} className='search_input peer' required />
      </form>

      <PromptCardList
        data={searchedPosts.length ? searchedPosts : posts}
        handleTagClick={() => {}}
      />
    </section>
  )
}

export default Feed