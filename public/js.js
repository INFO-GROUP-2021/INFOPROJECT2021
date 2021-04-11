          const tabs = M.Tabs.init(document.querySelector('.tabs'));
          const API_KEY = "1d611e5252ee50d950f35b8c75d928fc";

          

        const SearchBar = document.getElementById('searchBar');
        SearchBar.addEventListener('keyup', (e)=> {
          var searchString = e.target.value;
          //searchBy(searchString);
          console.log(searchString);
        });

          var options = {
              enableHighAccuracy: true,
              timeout: 5000,
              maximumAge: 0
            };
          
            async function success(pos) {
              var crd = pos.coords;
  
              let URL = "https://api.openweathermap.org/data/2.5/onecall?lat="+crd.latitude+"&lon="+crd.longitude+"&exclude =alerts,minutely&units=metric&appid="+API_KEY;
  
              let response = await fetch(URL);
              let data = await response.json();
              console.log(data);
              displayWeather(data);
            }
  
            
  
            async function initSearch(){
              var myHeaders = new Headers();
              let data;
              const getData ={
                method:'GET',
                headers: myHeaders,
                mode: 'no-cors',
                redirect: 'follow',
                body: JSON.stringify(data)
              };
              const returnCityData = await fetch('current_city_list.json',getData)
              const myData = await returnCityData;
              console.log(myData);
            }

            initSearch();

  
            function displayWeather(data){
              let mani = document.querySelector("#results");
              let d = new Date(data.current.sunrise * 1000).toLocaleTimeString("en-US");
              let d2 =  new Date(data.current.sunset * 1000).toLocaleTimeString("en-US");
              mani. innerHTML = '';
              mani.innerHTML += ` 
              <thead>
              <th>Location</th>
              </thead>
              <tr>
                <td>Longditute: ${data.lon}</td>
                <td>Latitude: ${data.lat}</td>
              </tr>

              <thead>
              <th> Current Weather Conditons</th>
              </thead>
                <tr>
                    <td>Currently ${data.current.weather[0].description}</td>
                    <td>Cloudy Percentage ${data.current.clouds}</td>
                    <td>Humdity ${data.current.humidity}</td>
                    <td>Wind Speed ${data.current.wind_speed}</td>
                </tr>
              
                <thead>
              <th>Temperture</th>
              </thead>
              <tr>
                <td>Current Temperture: ${data.current.temp} C</td>
              </tr>
              <tr>
                <td>Feels Like: ${data.current.feels_like} C</td>
              </tr>

              <thead>
              <th>UV Index/Sunrise and Set</th>
              </thead>

              <tr>
                <td>Sunrise: ${d}</td>
                <td>Sunset: ${d2}</td>
                <td>UV Index ${data.current.uvi}</td>
              </tr>  
              `;
              display24(data);
            }

            function display24(passed){
              datas = passed.hourly;
              let i = 1;
              let mani = document.querySelector("#results-24");
              mani.innerHTML='';
              for(let data of datas){
                let d = new Date(data.dt * 1000).toLocaleTimeString("en-US");
              mani.innerHTML += ` 
              <thead>
                <th>Hour: ${d}</th>
              </thead>

              <thead>
                <th>Forcast</th>
              </thead>
                <tr>
                <td>Weather  ${data.weather[0].description}</td>
                <td> Cloudness Percentage ${data.clouds}</td>
                <td>Humidity: ${data.humidity}</td>  
                <td> Probability of Rain ${data.pop*100}%</td>
                <td> Wind Speed ${data.wind_speed}</td>
                </tr>
                <thead>
                <th>Temperture</th>
              </thead>
              <tr>
                <td>Current Temperture: ${data.temp} C</td>
                <td>Feels Like: ${data.feels_like} C</td>
                <td> UV Index ${data.uvi}   
              </tr>
            `
            i = i+ 1;
            }
          
            //createChart(datas);
            display7Day(passed.daily);
          }


          function display7Day(data){
            let mani = document.querySelector("#results-7D");
              mani. innerHTML = '';

              for(let d of data){
                let d1 = new Date(d.sunrise * 1000).toLocaleTimeString("en-US");
                let d2 =  new Date(d.sunset * 1000).toLocaleTimeString("en-US");
                mani.innerHTML+= `
                  <thead>
                    <th>Prediction</th>
                  </thead>
                  <td>Description: ${d.weather[0].description}</td>
                  <td> Cloudy Percentage: ${d.clouds}</td>
                  <td> Probablity of Rain: ${d.pop * 100}</td>
                  <td> Humidty: ${d.humidity}</td>
                  <thead>
                  <th>Details</th>
                  </thead>
                  <td> Sunrise: ${d1}</td>
                  <td>Sunset:  ${d2}</td>
                  <td> UV Index: ${d.uvi}</td>
                  <thead>
                  <th>Tempertures</th>
                  </thead
                  <tr>
                  <td> Morning Temp ${d.temp.morn}</td>
                  <td> Mid-day Temp ${d.temp.day}</td>
                  <td> Evening ${d.temp.night}</td>
                  <td> Night ${d.temp.eve}</td>
                  </tr>
                  
                  </tr>
                `
              }
          }


          
            function error(err) {
              console.warn(`ERROR(${err.code}): ${err.message}`);
            }
          
            function locate(){
              navigator.geolocation.getCurrentPosition(success, error, options);
            }
          
            document.querySelector('#locateBtn').addEventListener('click', locate);
        
     
            function createChart(datas){

              const labels = [
                '0','1','2','3','4','5','6','7','8','9','10',
                '11'
              ];
              const data = {
                labels: labels,
                datasets: [{
                  label: 'Humidty Index',
                  backgroundColor: 'rgb(255,255,255)',
                  borderColor: 'rgb(255,255,255)',
                  data: d }]};

              const config = {
                type: 'line',
                data,
                options: {}
              };
              
              var myChart = new Chart(
              document.getElementById('myChart'),
               config
              );

            }
       
         
