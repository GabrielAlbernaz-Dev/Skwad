import React from 'react'
import PostItem from '../../components/Post/PostItem'
import ContentContainer from '../../layouts/ContentContainer/ContentContainer'
import PostBox from '../../components/Post/PostBox'
import PostList from '../../components/Post/PostList'

const Home = () => {
  const postsDataTest = [
    {
      profileId:'@harrypotterinfos',
      src:'https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg',
      time:'21h',
      title:'Harry Potter BR',
      text:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa at repudiandae tenetur corporis doloremque. Dicta eligendi id earum tempore aspernatur omnis consectetur repellat eum ab error. Quibusdam, distinctio? Sunt, modi!'
    },
    {
      profileId:'@brttGames',
      src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSICisTU28AJm6sUpTMTp75hUWXnAqV5U3aKqePfp6miQ&s',
      time:'14h',
      title:'Fluxo brTT',
      text:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa at repudiandae tenetur TSC'
    },
    {
      profileId:'@harrypotterinfos',
      src:'https://s2.glbimg.com/Z4c0dLtiMbmfP7hxpRKKMKjITSM=/0x0:1318x1021/600x0/smart/filters:gifv():strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2021/m/g/1KGc3MT5A5wRCv3okBaw/mwzera-champions.jpg',
      time:'11h',
      title:'FURIA Mwzera',
      text:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. @Gabriel'
    },
  ]
  
  return (
    <ContentContainer>
        <PostBox src="https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg" placeholder="What's on your mind, Gabriel?"/>
        <PostList data={postsDataTest}/>
    </ContentContainer>
  )
}

export default Home