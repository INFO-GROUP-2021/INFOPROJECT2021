document.onload = getLeaderBoards('battle','mw');

async function navigate(title, url){
  document.title = title;
  let content = document.querySelector('#content');
  if(url === null){
    content.innerHTML = "";
  }else{
    let response = await fetch(url);
    content.innerHTML = await response.text();
    executeScripts();
  }
}

function handleClick(event){
  event.preventDefault();
  event.stopPropagation();
  let a = event.target;
  let text = a.text; 
  let url = a.href;
  //history.pushState({title:text, url: url}, null, a.href);
  navigate(a.text, a.href);
}

const navi = document.querySelector('#navi');
  navi.addEventListener('click', handleClick, false);

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


async function getCSRFToken(username, password){
  var requestOptions = {
    method: 'GET',
    Header:{
      'Accept': '*/*',
      'Accept-Encoding': 'gzip, deflate, br',
      'Connection':'keep-alive',
      'Cache-Control' :'no-cache, no-store, must-revalidate', 
		  'Pragma': 'no-cache',
		  'Expires': '0'
    },
    redirect: 'follow'
  };

    let token ='';

  fetch("https://s.activision.com/activision/login", requestOptions)
  .then(response => response.text())
  .then(result =>  {
    console.log(result.search('name="_csrf" value="'))
    var index = result.search('name="_csrf" value="') + 20;
    if(index !== -1){
      for(var i = index; i < index+64 ;i++){
      token += result.charAt(i);
      }
    }
     login(username, password,token)
    })
  
  .catch(error => console.log('error', error));
}

function login(username, password, token){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN = "+token +"; new_SiteId = activision;");

    for (var pair of myHeaders.entries()) {
      console.log(pair[0]+ ': '+ pair[1]);
   }
    var urlencoded = new URLSearchParams();
    urlencoded.append(username,"Your login email for callofduty.com");
    urlencoded.append(password,"Your login password for callofduty.com");
    urlencoded.append("remember_me", "true");
    urlencoded.append("_csrf", token);
    
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

