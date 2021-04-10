document.onload = getLeaderBoards('battle','bo4');

async function getLeaderBoards(platform,game){
  let URL = "https://www.callofduty.com/api/papi-client/leaderboards/v2/title/" + game + "/platform/"+ platform+"/time/alltime/type/core/mode/career/page/1";
  let myHeaders = new Headers();
  let data;
  const getData ={
    method:'GET',
    headers: myHeaders,
    mode: 'cors',
    redirect: 'follow',
    body: JSON.stringify(data)
  };
   let response = await fetch(URL,getData);
   let info = await response.json();
  
   displayLeaderBoard(info);
}

function displayLeaderBoard(data){
  let results = document.querySelector('#insertBoard');
  results.innerHTML = null;
  let html = '';

  let information  = data.data.entries;
  console.log(information);
   
   for(let d of information){
    html +=`<tr>
    <td>${d.rank}</td>
    <td>${d.username}</td>
    <td>${d.values.prestige}</td>
    <td>${d.values.wins}</td>
    <td>${d.values.losses}</td>
    <td>${d.values.kills}</td>
    <td>${d.values.deaths}</td>
    <td>${d.values.killstreak}</td>
    <td>${d.values.assists}</td>
    <td>${d.values.headshots}</td>
    <td>${d.values.hits}</td>
    <td>${d.values.misses}</td>
    <td>${d.values.accuracy}</td>
    </tr>`;
   }
   results.innerHTML = html;
}


async function getPlayer (name, platform, game,mode){
    let URL = "https://my.callofduty.com/api/papi-client/crm/cod/v2/title/" + game + "/platform/"+ platform + "/gamer/" + name+"/matches/"+ mode + "/start/0/end/0/details";
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "ACT_SSO_COOKIE=Set by test scripts; ACT_SSO_COOKIE_EXPIRY=1591153892430; atkn=Set by test scripts;");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
    };

fetch(URL, requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

  const getData ={
    method:'GET',
    headers: myHeaders,
    mode: 'cors',
    redirect: 'follow',
    body: JSON.stringify(data)
  };
   let response = await fetch(URL,getData);
   let info = await response.json();
   console.log(info);
}

async function getCSRFToken(){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("https://s.activision.com/activision/login", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

function login(username, password){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=Set by test scripts; new_SiteId=activision;");
    
    var urlencoded = new URLSearchParams();
    urlencoded.append("username", "Your login email for callofduty.com");
    urlencoded.append("password", "Your login password for callofduty.com");
    urlencoded.append("remember_me", "true");
    urlencoded.append("_csrf", "Set by test scripts");
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
    
    fetch("https://s.activision.com/do_login?new_SiteId=activision", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
}

