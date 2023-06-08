function renderSumRank(sumRank) {
    const rankedSoloEntry = sumRank.find(entry => entry.queueType === 'RANKED_SOLO_5x5');
    
    if (rankedSoloEntry) {
      const ranks = document.querySelector('.ranks');
      ranks.innerHTML = "";
      const div2 = document.createElement('div');
      const queueType = document.createElement('h2');
      queueType.classList.add('queueType');
      queueType.textContent = "Solo/Duo";
      const rankName = document.createElement('h2');
      rankName.classList.add('rank-name');
      const rankIcon = document.createElement('img');
      rankIcon.classList.add('rank-Icon');
      rankName.textContent = rankedSoloEntry.tier + ' ' + rankedSoloEntry.rank;
      rankIcon.setAttribute('src', '/assets/' + rankedSoloEntry.tier + '.png');
      div2.appendChild(queueType);
      div2.appendChild(rankName);
      div2.appendChild(rankIcon);
      ranks.appendChild(div2);
    } else {
      console.log('Ranked solo entry not found');
    }
  }