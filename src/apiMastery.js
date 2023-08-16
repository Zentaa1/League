async function getSumMast(summonerId) {
    try {
        
        const sumMastResponse = await axios.get(`/.netlify/functions/championMastery?summonerId=${summonerId}`);
        const sumMast = sumMastResponse.data;

        
        const champResponse = await axios.get('https://ddragon.leagueoflegends.com/cdn/12.6.1/data/en_US/champion.json');
        const champs = champResponse.data.data;

        
        const missingChampions = {
            895: {
                key: '895',
                name: 'Nilah',
                championName: 'Nilah'
                
            }
            
        };

        
        const updatedChamps = { ...champs, ...missingChampions };

        
        const champNames = {};
        for (let champName in updatedChamps) {
            let champId = updatedChamps[champName].key;
            champNames[champId] = champName;
        }

        
        const masteryImages = {};

        
        for (let i = 0; i < sumMast.length; i++) {
            if (sumMast[i]) {
                let championId = sumMast[i].championId;
                let championLevel = sumMast[i].championLevel;
                masteryImages[`champions${i + 1}`] = `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-profiles/global/default/images/mastery_level${championLevel}.png`;

                
                if (champNames[championId]) {
                    sumMast[i].championName = champNames[championId];
                    console.log(sumMast[i].championName);
                } else {
                    console.error('Can\'t find champion with ID:', championId);
                }
            }
        }

        
        console.log(sumMast);
        renderSumMast(sumMast, masteryImages, champNames);
    } catch (error) {
        console.log('Failed to fetch API:', error);
    }
}