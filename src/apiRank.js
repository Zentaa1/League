async function getSumRank(summonerId, server) {
  try {
    const sumRankResponse = await axios.get(`/.netlify/functions/summonerRank?summonerId=${summonerId}&server=${server}`);
    const sumRank = sumRankResponse.data;

    renderSumRank(sumRank);
  } catch (error) {
    console.log('Failed to fetch API:', error);
  }
}