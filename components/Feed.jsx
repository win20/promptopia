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
  const [posts, setposts] = useState([]);
  const [search, setSearch] = useState('')
  const [searchedPosts, setSearchedPosts] = useState([]);

  const handleTagClick = (clickedTag) => {
    setSearch(clickedTag);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setposts(data);
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const filteredPosts = posts.filter((p) => {
      return p.prompt.includes(search) || p.creator.username.includes(search) || p.tag.includes(search);
    });

    setSearchedPosts(filteredPosts);
  }, [search])

  return (
    <section className="feed">
      <form className='relative w-full flex-center'>
        <input
          type="text"
          value={search}
          placeholder='Search for a prompt'
          onChange={(e) => setSearch(e.target.value)}
          className='search_input peer' required
        />
      </form>

      <PromptCardList
        data={searchedPosts.length ? searchedPosts : posts}
        handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed