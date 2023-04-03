const apiKey = 'your-key-here'
const region = 'your-region-here'; // BR1, NA, EUW, etc.

// get summoner ID
const summonerName = 'your-summoner-name-here';

fetch(`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiKey}`)
  .then(response => response.json())
  .then(summonerData => {
    const summonerId = summonerData.id;
    console.log(`${summonerName}'s ID: ${summonerId}`)
  })
