import React from 'react'
import ContentContainer from '../../layouts/ContentContainer/ContentContainer'
import ListExplorer from '../../components/ListExplorer/ListExplorer'

const Explore = () => {
  const exploreItems = [
    {id:1,href:'/post-1',title:'CBLOL',views:5033},
    {id:2,href:'/post-2',title:'LCK',views:1554},
    {id:3,href:'/post-3',title:'CCXP',views:1341},
    {id:3,href:'/post-3',title:'CCXP',views:1341},
    {id:3,href:'/post-3',title:'CCXP',views:1341},
    {id:3,href:'/post-3',title:'CCXP',views:1341}
  ] 

  return (
    <ContentContainer>
      <ListExplorer items={exploreItems}/>
    </ContentContainer>
  )
}

export default Explore