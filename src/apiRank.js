async function getSumRank(summonerId) {
  try {
    const sumRankResponse = await axios.get(`/.netlify/functions/summonerRank?summonerId=${summonerId}`);
    const sumRank = sumRankResponse.data;

    renderSumRank(sumRank);
  } catch (error) {
    console.log('Failed to fetch API:', error);
  }
}