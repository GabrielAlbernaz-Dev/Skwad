import React, { useState } from 'react'
import ContentContainer from '../../layouts/ContentContainer/ContentContainer'
import ListExplorer from '../../components/ListExplorer/ListExplorer'
import Head from '../../helper/Head'
import ExploreTabs from '../../components/ExploreTabs/ExploreTabs'

const Explore = () => {
  const [activeTabs, setActiveTabs] = useState('trending');
  const camelCaseLabel = activeTabs.charAt(0).toUpperCase() + activeTabs.slice(1);

  const exploreItems = [
    {id:1,href:'/post-1',title:'CBLOL',views:5033},
    {id:2,href:'/post-2',title:'LCK',views:1554},
    {id:3,href:'/post-3',title:'CCXP',views:1341},
    {id:4,href:'/post-4',title:'CCXP',views:1341},
    {id:5,href:'/post-5',title:'CCXP',views:1341}
  ];

  const exploreItems2 = [
    {id:1,href:'/post-1',title:'LCS',views:5033},
    {id:2,href:'/post-2',title:'LCK',views:1554},
    {id:3,href:'/post-3',title:'CCXP',views:1341},
    {id:4,href:'/post-4',title:'CCXP',views:1341},
    {id:5,href:'/post-5',title:'CCXP',views:1341}
  ];

  const exploreItems3 = [
    {id:1,href:'/post-1',title:'LPL',views:5033},
    {id:2,href:'/post-2',title:'LCK',views:1554},
    {id:3,href:'/post-3',title:'CCXP',views:1341},
    {id:4,href:'/post-4',title:'CCXP',views:1341},
    {id:5,href:'/post-5',title:'CCXP',views:1341}
  ];

  const data = {
    trending: exploreItems,
    recommendations: exploreItems2,
    news: exploreItems3,
  };

  return (
    <>
      <Head title="Explore" description="Explore page"/>
      <ContentContainer>
        <ExploreTabs active={activeTabs} setActive={setActiveTabs}/>
        <ListExplorer items={data[activeTabs]} label={camelCaseLabel}/>
      </ContentContainer>    
    </>
  )
}

export default Explore