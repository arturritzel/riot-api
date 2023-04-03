const apiKey = 'RGAPI-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';
const region = 'BR1';
const DD_version = '13.6.1';

const summonerName = 'sapo fofo';
let summonerId;

await fetch(`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiKey}`)
  .then(response => response.json())
  .then(summonerData => {
    summonerId = summonerData.id;
    console.log(`${summonerName}'s ID: ${summonerId}`)
  })
  .catch(error => console.error(error));

fetch(`https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}?api_key=${apiKey}`)
  .then(response => response.json())
  .then(masteryData => {
    masteryData.sort((a, b) => b.championPoints - a.championPoints);

    const top5Champions = masteryData.slice(0, 5);

    fetch(`https://ddragon.leagueoflegends.com/cdn/${DD_version}/data/en_US/champion.json`)
      .then(response => response.json())
      .then(championData => {

        const top5ChampionNames = top5Champions.map(masterychampion => {
          for(const DDChampion in championData.data){
            if(championData.data[DDChampion].key === masterychampion.championId.toString())
                return championData.data[DDChampion].name
          }
        }); 

        top5ChampionNames.forEach((champion, index) => {
            console.log(`${champion}: ${top5Champions[index].championPoints} pontos // ${top5Champions[index].chestGranted ? "já" : "não"} pegou baú`)
        });
      })
      .catch(error => console.error(error));
  })
  .catch(error => console.error(error));
