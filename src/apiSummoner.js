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
      console.log(data);
      
      renderHTML(data);
      getSumRank(summonerId);
      getSumMast(summonerId);
    } catch (error) {
      console.log('Failed to fetch API:', error);
      const container = document.querySelector('.container');
      container.innerHTML = "";
      const noSumDiv = document.createElement('div');
      const noSummoner = document.createElement('h2');
      noSummoner.textContent = "Could not find summoner " + search.value;
      noSumDiv.appendChild(noSummoner);
      container.appendChild(noSumDiv);
    }
  }

  btn.addEventListener("click", function(event) {
    event.preventDefault();
    getApi();
    getSumRank(summonerId);
    getSumMast(summonerId);
  });