export let masteryImages = {};
export let champNames = {};

async function getSumMast(encryptedId) {
    try {
        const sumMastResponse = await axios.get(`/.netlify/functions/championMastery?encryptedId=${encryptedId}`);
        const sumMast = sumMastResponse.data;

        const champResponse = await axios.get('http://ddragon.leagueoflegends.com/cdn/11.22.1/data/en_US/champion.json');
        const champs = champResponse.data.data;

        for (let champName in champs) {
            let champId = champs[champName].key;
            champNames[champId] = champName;
        }

        for (let i = 0; i < 5; i++) {
            if (sumMast[i] && champNames[sumMast[i].championId]) {
                sumMast[i].championName = champNames[sumMast[i].championId];
            } else {
                console.error('Cant find champion with ID')
            }
        }


        for (let i = 0; i < 5; i++) {
            if (sumMast[i]) {
                let championLevel = sumMast[i].championLevel;
                masteryImages[`champions${i+1}`] = `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-profiles/global/default/images/mastery_level${championLevel}.png`;
            }
        }

        console.log(sumMast);

        renderSumMast(sumMast);
    } catch (error) {
        console.log('Failed to fetch API:', error);
    }
}