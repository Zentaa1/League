function renderSumMast(sumMast, masteryImages, champNames) {
    const masteryContainer = document.querySelector('.mastery');
    masteryContainer.innerHTML = '';

    for (let i = 0; i < 5; i++) {
        if (sumMast[i] && champNames[sumMast[i].championId]) {
            const championDiv = document.createElement('div');
            const championImg = document.createElement('img');
            const championIcon = document.createElement('img');
            const championName = document.createElement('p');
            const championScore = document.createElement('p');

            championDiv.classList.add('champion');
            championImg.src = masteryImages[`champions${i + 1}`];
            championIcon.src = '../assets/champion/' + champNames[sumMast[i].championId] + '_0.jpg';
            championName.textContent = champNames[sumMast[i].championId];
            championScore.textContent = sumMast[i].championPoints.toLocaleString();

            championDiv.appendChild(championImg);
            championDiv.appendChild(championName);
            championDiv.appendChild(championIcon);
            championDiv.appendChild(championScore);
            masteryContainer.appendChild(championDiv);
        }
    }
}