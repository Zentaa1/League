import { championImages } from './apiMastery';
import { champNames } from './apiMastery';

function renderSumMast(sumMast) {
    const masteryContainer = document.querySelector('.mastery');
    masteryContainer.innerHTML = "";
    const champ1Div = document.createElement('div');
    const champ1Img = document.createElement('img');
    champ1Img.src = championImages[champion1];
    const champ1Name = document.createElement('p');
    champ1Name.textContent = sumMast[0].championName;
    masteryContainer.appendChild(champ1Div);
    champ1Div.appendChild(champ1Img);
    champ1Div.appendChild(champ1Name);


}