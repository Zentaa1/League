function renderHTML(data) {
    const container = document.querySelector('.container');
    container.innerHTML = "";
    const div = document.createElement('div');
    const sumIcon = document.createElement('img');
    const sumName = document.createElement('h2');
    sumName.classList.add('sum-Name');
    const sumLevel = document.createElement('h3');
    sumLevel.classList.add('sum-Level');
    sumIcon.classList.add('sum-Icon');
    sumName.textContent = data.name;
    sumLevel.textContent = "Level: " + data.summonerLevel;
    sumIcon.setAttribute('src', 'https://ddragon.leagueoflegends.com/cdn/13.6.1/img/profileicon/' + data.profileIconId + '.png');
    div.appendChild(sumIcon);
    div.appendChild(sumName);
    div.appendChild(sumLevel);
    container.appendChild(div);
}