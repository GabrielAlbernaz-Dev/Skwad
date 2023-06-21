import React, { useEffect, useState } from 'react'
import ContentContainer from '../../layouts/ContentContainer/ContentContainer'
import ListExplorer from '../../components/ListExplorer/ListExplorer'
import Head from '../../helper/Head'
import ExploreTabs from '../../components/ExploreTabs/ExploreTabs'
import { getExploreReccomendations, getExploreTrending } from '../../data/explore'
import Loading from '../../components/Loading/Loading'


const Explore = () => {
  const [activeTabs, setActiveTabs] = useState('trending');
  const [trendingData, setTrendingData] = useState([]);
  const [recommendationsData, setRecommendationsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const camelCaseLabel = activeTabs.charAt(0).toUpperCase() + activeTabs.slice(1);

  useEffect(() => {
    async function fetchItems() {
      setIsLoading(true); 
      try {
        const tredingResponse = await getExploreTrending();
        setTrendingData(tredingResponse);

        const recommendationResponse = await getExploreReccomendations();
        setRecommendationsData(recommendationResponse);
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
        setIsLoading(false);
      }
    }
    fetchItems();
  }, []);

  const data = {
    trending: trendingData,
    recommendations: recommendationsData,
  };

  return (
    <>
      <Head title="Explore" description="Explore page" />
      <ContentContainer>
        <ExploreTabs active={activeTabs} setActive={setActiveTabs} />
        {isLoading ? ( 
          <div className="flex-row-center"><Loading loading={isLoading} /></div> 
        ) : (
          <ListExplorer items={data[activeTabs]} label={camelCaseLabel} />
        )}
      </ContentContainer>
    </>
  );
};

export default Explore;
