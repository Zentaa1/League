const header = document.querySelector('.header');
const div3 = document.createElement('div');
var search = document.createElement('input');
search.setAttribute('type', 'text');
search.setAttribute('class', 'input');
search.placeholder = "Summoner name...";
const btn = document.createElement('a');
btn.textContent += "Search";
btn.setAttribute('class', 'btn');
btn.setAttribute('type', 'submit');
div3.appendChild(search);
div3.appendChild(btn);
header.appendChild(div3);

async function getApi() {
    try {
      const name = search.value;
      const url = '/.netlify/functions/riotApiProxy?name=' + name;
  
      const response = await axios.get(url);
      const data = response.data;

      const summonerId = data.id;
  
      renderHTML(data);
      getSumRank(summonerId);
    } catch (error) {
      console.log('Failed to fetch API:', error);
    }
  }

  btn.addEventListener("click", function(event) {
    event.preventDefault();
    getApi();
    getSumRank();
  });
/*async function getSummonerRank(sumRankUrl) {
    try {

        const response4 = await fetch(sumRankUrl);
        const sumRank = await response4.json();

        renderSumRank(sumRank);
    }
    catch (error) {
        console.log("Her ble det noe galt, ingen rank her")
    }
}

getSummonerRank();

function renderSumRank(sumRank) {

    const ranks = document.querySelector('.ranks');
    const div2 = document.createElement('div');
    const rankName = document.createElement('h2');
    rankName.classList.add('rank-Name');
    const rankIcon = document.createElement('img');
    rankIcon.classList.add('rank-Icon');
    rankName.textContent = sumRank[1].tier + ' ' + sumRank[1].rank;
    rankIcon.setAttribute('src', '/assets/' + sumRank[1].tier + '.png');
    div2.appendChild(rankName);
    div2.appendChild(rankIcon);
    ranks.appendChild(div2);

    console.log(sumRank)
    console.log(sumRank[1].tier)
    console.log(sumRank[1].rank)
    

}

async function getSummonerMatch(sumMatchUrl) {
    try {

        const response5 = await fetch(sumMatchUrl);
        const sumMatch = await response5.json();

        renderSummonerMatch(sumMatch);
    } catch (error) {
        console.log('noe ble feil her!')
    }
}

getSummonerMatch();

function renderSummonerMatch(sumMatch) {

    console.log(sumMatch)
    recentMatchUrl = 'https://europe.api.riotgames.com/lol/match/v5/matches/' + sumMatch[0] + '?api_key=' + API_KEY;
    getRecentMatch(recentMatchUrl);

    
}

async function getRecentMatch(recentMatchUrl) {
    try {
        const response6 = await fetch(recentMatchUrl);
        const recentMatch = await response6.json();

        renderRecentMatch(recentMatch);
    } catch (error) {
        console.log('Fant ikke matchen du lette etter.')
    }
}

getRecentMatch();

function renderRecentMatch(recentMatch) {

    const damageDealt = [
        recentMatch.info.participants[0].totalDamageDealt,
        recentMatch.info.participants[1].totalDamageDealt,
        recentMatch.info.participants[2].totalDamageDealt,
        recentMatch.info.participants[3].totalDamageDealt,
        recentMatch.info.participants[4].totalDamageDealt,
        recentMatch.info.participants[5].totalDamageDealt,
        recentMatch.info.participants[6].totalDamageDealt,
        recentMatch.info.participants[7].totalDamageDealt,
        recentMatch.info.participants[8].totalDamageDealt,
        recentMatch.info.participants[9].totalDamageDealt
    ];

    const mvpDamage = Math.max(...damageDealt);

    function getMvpParticipant(recentMatch) {
        let maxDamage = 0;
        let mvpParticipantIndex = 0;
      
        for (let i = 0; i < recentMatch.info.participants.length; i++) {
          const participantDamage = recentMatch.info.participants[i].totalDamageDealt;
          if (participantDamage > maxDamage) {
            maxDamage = participantDamage;
            mvpParticipantIndex = i;
          }
        }
        return mvpParticipantIndex;
      }

      const mvpParticipantIndex = getMvpParticipant(recentMatch);
        console.log(`MVP participant index: ${mvpParticipantIndex}`);

    var date = new Date(0);
    date.setSeconds(recentMatch.info.gameDuration);
    var timeString = date.toISOString().substring(11, 19).replace(/^[0:]+/, "");
    console.log(timeString)

    const lastMatch = document.querySelector('.recentmatch');
    const teamOne = document.createElement('div');
    const gameMode = document.createElement('h2');
    gameMode.textContent = 'Game type: ' + recentMatch.info.gameMode + ' -- Game length: ' + timeString;
    teamOne.appendChild(gameMode)
    const matchMvp = document.createElement('h2');
    matchMvp.textContent = recentMatch.info.participants[mvpParticipantIndex].summonerName + ' Was the Mvp of this match with a whooping ' + mvpDamage + ' damage dealt!' + ' With a largest multikill of: ' + recentMatch.info.participants[mvpParticipantIndex].largestMultiKill;
    matchMvp.classList.add('matchMvp');
    teamOne.appendChild(matchMvp);
    const teamOneH = document.createElement('H2');
    teamOneH.textContent = 'TEAM ONE';
    teamOne.appendChild(teamOneH);
    teamOneH.classList.add('team-one-h');

    const Player1 = document.createElement('h4');
    Player1.textContent = recentMatch.info.participants[0].summonerName + '     -    ' + recentMatch.info.participants[0].championName;
    teamOne.appendChild(Player1);

    const Player1info = document.createElement('p');
    Player1info.textContent = 'Damage dealt: ' + recentMatch.info.participants[0].totalDamageDealt + ' Gold Earned: ' + recentMatch.info.participants[0].goldEarned;
    teamOne.appendChild(Player1info);

    const PlayerStats = document.createElement('h5');
    PlayerStats.textContent = 'Kills: ' + recentMatch.info.participants[0].kills + ' Deaths: ' + recentMatch.info.participants[0].deaths + ' Assists: ' + recentMatch.info.participants[0].assists;
    teamOne.appendChild(PlayerStats);

    const Player2 = document.createElement('h4');
    Player2.textContent = recentMatch.info.participants[1].summonerName + '     -    ' + recentMatch.info.participants[1].championName;
    teamOne.appendChild(Player2);

    const Player2info = document.createElement('p');
    Player2info.textContent = 'Damage dealt: ' + recentMatch.info.participants[1].totalDamageDealt + ' Gold Earned: ' + recentMatch.info.participants[1].goldEarned;
    teamOne.appendChild(Player2info);

    const Player2Stats = document.createElement('h5');
    Player2Stats.textContent = 'Kills: ' + recentMatch.info.participants[1].kills + ' Deaths: ' + recentMatch.info.participants[1].deaths + ' Assists: ' + recentMatch.info.participants[1].assists;
    teamOne.appendChild(Player2Stats);

    const Player3 = document.createElement('h4');
    Player3.textContent = recentMatch.info.participants[2].summonerName + '     -    ' + recentMatch.info.participants[2].championName;
    teamOne.appendChild(Player3);

    const Player3info = document.createElement('p');
    Player3info.textContent = 'Damage dealt: ' + recentMatch.info.participants[2].totalDamageDealt + ' Gold Earned: ' + recentMatch.info.participants[2].goldEarned;
    teamOne.appendChild(Player3info);

    const Player3Stats = document.createElement('h5');
    Player3Stats.textContent = 'Kills: ' + recentMatch.info.participants[2].kills + ' Deaths: ' + recentMatch.info.participants[2].deaths + ' Assists: ' + recentMatch.info.participants[2].assists;
    teamOne.appendChild(Player3Stats);

    const Player4 = document.createElement('h4');
    Player4.textContent = recentMatch.info.participants[3].summonerName + '     -    ' + recentMatch.info.participants[3].championName;
    teamOne.appendChild(Player4);

    const Player4info = document.createElement('p');
    Player4info.textContent = 'Damage dealt: ' + recentMatch.info.participants[3].totalDamageDealt + ' Gold Earned: ' + recentMatch.info.participants[3].goldEarned;
    teamOne.appendChild(Player4info);

    const Player4Stats = document.createElement('h5');
    Player4Stats.textContent = 'Kills: ' + recentMatch.info.participants[3].kills + ' Deaths: ' + recentMatch.info.participants[3].deaths + ' Assists: ' + recentMatch.info.participants[3].assists;
    teamOne.appendChild(Player4Stats);

    const Player5 = document.createElement('h4');
    Player5.textContent = recentMatch.info.participants[4].summonerName + '     -    ' + recentMatch.info.participants[4].championName;
    teamOne.appendChild(Player5);

    const Player5info = document.createElement('p');
    Player5info.textContent = 'Damage dealt: ' + recentMatch.info.participants[4].totalDamageDealt + ' Gold Earned: ' + recentMatch.info.participants[4].goldEarned;
    teamOne.appendChild(Player5info);

    const Player5Stats = document.createElement('h5');
    Player5Stats.textContent = 'Kills: ' + recentMatch.info.participants[4].kills + ' Deaths: ' + recentMatch.info.participants[4].deaths + ' Assists: ' + recentMatch.info.participants[4].assists;
    teamOne.appendChild(Player5Stats);
    lastMatch.appendChild(teamOne);

    const teamTwo = document.createElement('div');
    const teamTwoH = document.createElement('H2');
    teamTwoH.textContent = 'TEAM TWO';
    teamTwoH.classList.add('team-two-h')
    teamTwo.appendChild(teamTwoH);
    const Player6 = document.createElement('h4');
    Player6.textContent = recentMatch.info.participants[5].summonerName + '     -    ' + recentMatch.info.participants[5].championName;
    teamTwo.appendChild(Player6);

    
    const Player6info = document.createElement('p');
    Player6info.textContent = 'Damage dealt: ' + recentMatch.info.participants[5].totalDamageDealt + ' Gold Earned: ' + recentMatch.info.participants[5].goldEarned;
    teamTwo.appendChild(Player6info);

    const Player6Stats = document.createElement('h5');
    Player6Stats.textContent = 'Kills: ' + recentMatch.info.participants[5].kills + ' Deaths: ' + recentMatch.info.participants[5].deaths + ' Assists: ' + recentMatch.info.participants[5].assists;
    teamTwo.appendChild(Player6Stats);

    const Player7 = document.createElement('h4');
    Player7.textContent = recentMatch.info.participants[6].summonerName + '     -    ' + recentMatch.info.participants[6].championName;
    teamTwo.appendChild(Player7);

    const Player7info = document.createElement('p');
    Player7info.textContent = 'Damage dealt: ' + recentMatch.info.participants[6].totalDamageDealt + ' Gold Earned: ' + recentMatch.info.participants[6].goldEarned;
    teamTwo.appendChild(Player7info);

    const Player7Stats = document.createElement('h5');
    Player7Stats.textContent = 'Kills: ' + recentMatch.info.participants[6].kills + ' Deaths: ' + recentMatch.info.participants[6].deaths + ' Assists: ' + recentMatch.info.participants[6].assists;
    teamTwo.appendChild(Player7Stats);

    const Player8 = document.createElement('h4');
    Player8.textContent = recentMatch.info.participants[7].summonerName + '     -    ' + recentMatch.info.participants[7].championName;
    teamTwo.appendChild(Player8);
 
    const Player8info = document.createElement('p');
    Player8info.textContent = 'Damage dealt: ' + recentMatch.info.participants[7].totalDamageDealt + ' Gold Earned: ' + recentMatch.info.participants[7].goldEarned;
    teamTwo.appendChild(Player8info);

    const Player8Stats = document.createElement('h5');
    Player8Stats.textContent = 'Kills: ' + recentMatch.info.participants[7].kills + ' Deaths: ' + recentMatch.info.participants[7].deaths + ' Assists: ' + recentMatch.info.participants[7].assists;
    teamTwo.appendChild(Player8Stats);

    const Player9 = document.createElement('h4');
    Player9.textContent = recentMatch.info.participants[8].summonerName + '     -    ' + recentMatch.info.participants[8].championName;
    teamTwo.appendChild(Player9);

    const Player9info = document.createElement('p');
    Player9info.textContent = 'Damage dealt: ' + recentMatch.info.participants[8].totalDamageDealt + ' Gold Earned: ' + recentMatch.info.participants[8].goldEarned;
    teamTwo.appendChild(Player9info);

    const Player9Stats = document.createElement('h5');
    Player9Stats.textContent = 'Kills: ' + recentMatch.info.participants[8].kills + ' Deaths: ' + recentMatch.info.participants[8].deaths + ' Assists: ' + recentMatch.info.participants[8].assists;
    teamTwo.appendChild(Player9Stats);

    const Player10 = document.createElement('h4');
    Player10.textContent = recentMatch.info.participants[9].summonerName + '     -    ' + recentMatch.info.participants[9].championName;
    teamTwo.appendChild(Player10);

    const Player10info = document.createElement('p');
    Player10info.textContent = 'Damage dealt: ' + recentMatch.info.participants[9].totalDamageDealt + ' Gold Earned: ' + recentMatch.info.participants[9].goldEarned;
    teamTwo.appendChild(Player10info);

    const Player10Stats = document.createElement('h5');
    Player10Stats.textContent = 'Kills: ' + recentMatch.info.participants[9].kills + ' Deaths: ' + recentMatch.info.participants[9].deaths + ' Assists: ' + recentMatch.info.participants[9].assists;
    teamTwo.appendChild(Player10Stats);
    lastMatch.appendChild(teamTwo);

    if(recentMatch.info.teams[0].win === true ) {
        teamOneH.style.color = 'green';
        teamOneH.textContent = 'Team one Won the game!';
        teamTwoH.style.color = 'red';
        teamTwoH.textContent = 'Team two Lost the game';
    }  else {
        teamOneH.style.color = 'red';
        teamOneH.textContent = 'Team one Lost the game';
        teamTwoH.style.color = 'green';
        teamTwoH.textContent = 'Team two Won the game!'
    }


    console.log(mvpDamage)
    console.log(recentMatch)
    console.log(recentMatch.info.teams[0].win)
}*/