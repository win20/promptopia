'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import Profile from '@components/Profile';

const UserProfile = () => {
  const params = useParams();

  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({
    email: '',
    image: '',
    username: '',
    _id: '',
  });

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params.userId}/posts`)
      const data = await response.json();

      setPosts(data);
    };

    const fetchUser = async () => {
      const response = await fetch(`/api/users/${params.userId}`);
      const data = await response.json();

      setUser(data);
    };

    fetchPosts();
    fetchUser();
  }, []);

  return (
    <Profile
      name={`${user.username}'s`}
      desc={`Welcome to ${user.username}'s profile page`}
      data={posts}
      handleEdit={() => {}}
      handleDelete={() => {}}
    />
  )
}

export default UserProfile