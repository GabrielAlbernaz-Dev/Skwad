import React from 'react'
import ProfileHeader from '../../layouts/ProfileHeader/ProfileHeader'
import ContentContainer from '../../layouts/ContentContainer/ContentContainer'
import PostItem from '../../components/Post/PostItem'
import ProfileTabs from '../../components/ProfileTabs/ProfileTabs'
import { useState } from 'react'
import PostList from '../../components/Post/PostList'
import { useEffect } from 'react'
import Head from '../../helper/Head'
import profilePhoto from '../../assets/profile-photo.jpeg'
import { getPosts } from '../../data/posts'
import { useQuery } from '@tanstack/react-query'

const Profile = () => {
  const [activeTabs,setActiveTabs] = useState('posts');
  const { data: posts, isLoading } = useQuery(['posts'], getPosts);

  const likes = [
    {
      profileId:'@harrypotterinfos',
      src:'https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg',
      time:'21h',
      title:'xxxxxxxx',
      text:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa at repudiandae tenetur corporis doloremque. Dicta eligendi id earum tempore aspernatur omnis consectetur repellat eum ab error. Quibusdam, distinctio? Sunt, modi!'
    },
    {
      profileId:'@brttGames',
      src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSICisTU28AJm6sUpTMTp75hUWXnAqV5U3aKqePfp6miQ&s',
      time:'14h',
      title:'zzzzz',
      text:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa at repudiandae tenetur TSC'
    },
  ]

  const comments  = [
    {
      profileId:'@p0nzulol',
      src:profilePhoto,
      time:'15h',
      title:'Gabriel Albernaz',
      text:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. @Gabriel'
    },
    {
      profileId:'@p0nzulol',
      src:profilePhoto,
      time:'11h',
      title:'Gabriel Albernaz',
      text:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. @Gabriel'
    },
    {
      profileId:'@p0nzulol',
      src:profilePhoto,
      time:'21h',
      title:'Gabriel Albernaz',
      text:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. @Gabriel'
    },
  ]

  const data = {
    posts:posts,
    likes:posts,
    comments:posts
  }

  return (
    <>
      <Head title="Profile" description="Profile page"/>
      <ContentContainer>
        <ProfileHeader/>
        <ProfileTabs active={activeTabs} setActive={setActiveTabs}/>
        <PostList data={data[activeTabs]}/>
      </ContentContainer>
    </>
  )
}

export default Profile