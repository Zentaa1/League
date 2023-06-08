async function getSumRank(summonerId) {
  try {
    const rankResponse = await axios.get(`/.netlify/functions/summonerRank?summonerId=${summonerId}`);
    const sumRank = rankResponse.data;

    renderSumRank(sumRank);
  } catch (error) {
    console.log('Failed to fetch API:', error);
  }
}