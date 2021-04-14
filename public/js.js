          const tabs = M.Tabs.init(document.querySelector('.tabs'));
          const API_KEY = "1d611e5252ee50d950f35b8c75d928fc";

          document.addEventListener('DOMContentLoaded', function() {
            const elems = document.querySelectorAll('.collapsible');
            const instances = M.Collapsible.init(elems, options);
          });

          var loaded = false;

          var returnChart1;
          var returnChart2;
          var returnChart3;

          
          var getString = document.getElementById('searchBox');
          getString.addEventListener("keyup", function(event){

            if(event.key === 13){
              event.preventDefault();
              document.getElementById("searchConfirm").click();
            }
          }) 

          function launchSearch(){
            var getString1 = document.getElementById('searchBox').value;
            let getCity = getString1.search(',');
            let city = getString1.substring(0,getCity);
            let country = getString1.substring(getCity, getString1.length);
           lookUpByCity(city,country);  
          }

          var passBack = "";

          var options = {
              enableHighAccuracy: true,
              timeout: 5000,
              maximumAge: 0
            };

            async function lookUpByCity(city,country){
                  let URL = "https://api.openweathermap.org/data/2.5/weather?q=" +city+","+country+"&appid="+API_KEY;
                  let response = await fetch(URL);
                  let data = await response.json();
                  reverseLookup2(data.coord); 
                  if(response.status >= 400){
                    alert("Error: Location not Found. Try again");
                    throw new Error(response.statusText);
                  }
                  else{
                      let URL2 = "https://api.openweathermap.org/data/2.5/onecall?lat="+data.coord.lat+"&lon="+data.coord.lon+"&exclude =alerts,minutely&units=metric&appid="+API_KEY;
                      let response2 = await fetch(URL2);
                      let data2 = await response2.json();
                     displayWeather(data2);
                  }  
                  
            }
          
            async function success(pos) {
              var crd = pos.coords;
              reverseLookup(crd);
              let URL = "https://api.openweathermap.org/data/2.5/onecall?lat="+crd.latitude+"&lon="+crd.longitude+"&exclude =alerts,minutely&units=metric&appid="+API_KEY;
              let response = await fetch(URL);
              let data = await response.json();
              displayWeather(data);
            }

            async function reverseLookup(crd){
              var API_KEY2 = "pk.e34c1833ce4d63ee886cb101d24aa0f1";
              let URL = "https://us1.locationiq.com/v1/reverse.php?key="+API_KEY2+"&lat="+ crd.latitude+"&lon="+crd.longitude+"&format=json"
              let response = await fetch(URL);
              let data = await response.json();
              returnReverseLookup(data);
            }

            async function reverseLookup2(data2){
              var API_KEY2 = "pk.e34c1833ce4d63ee886cb101d24aa0f1";
              let URL = "https://us1.locationiq.com/v1/reverse.php?key="+API_KEY2+"&lat="+ data2.lat+"&lon="+data2.lon+"&format=json"
              let response = await fetch(URL);
              let data = await response.json();
              returnReverseLookup(data);
            }
      
  
             function returnReverseLookup(data){
              console.log(data);
              if(data.address.city === ""){
                passBack =  data.address.town +", "+ data.address.country;
              }
              else{
                passBack =  data.address.city +", "+ data.address.country;
              }
              
            }
  
             function displayWeather(data){
              let mani = document.querySelector("#results");
              let d = new Date(data.current.sunrise * 1000).toLocaleTimeString("en-US");
              let d2 =  new Date(data.current.sunset * 1000).toLocaleTimeString("en-US");
              mani. innerHTML = '';
              mani.innerHTML += ` 
              <li>
              <div class="collapsible-header">
                <h6>Location</h6>
              </div>
              <div class="collapsible-body white">
                <p> Location:  ${passBack}</p>
                <p> Longditute: ${data.lon} </p>
                <p>Latitude: ${data.lat}</p>
              </div>
              </li>

              <li>
              <div class="collapsible-header">
              <h6> Current Weather Conditons</h6>
              </div>
                <div class="collapsible-body white">
                    <p>Currently ${data.current.weather[0].description}</p>
                    <p>Cloudy Percentage ${data.current.clouds}</p>
                    <p>Humdity ${data.current.humidity}</p>
                    <p>Wind Speed ${data.current.wind_speed}</p>
                </div>
                </li>
              <li>
            <div class="collapsible-header">
              <h6>Temperature</h6>
            </div>
              <div class="collapsible-body white">
                <p>Current Temperature: ${data.current.temp} C</p>
                <p>Feels Like: ${data.current.feels_like} C</p>
            </div>
            </li>
            <li>
              <div class="collapsible-header">
              <h6>UV Index/Sunrise and Set</h6>
          </div>

              <div class="collapsible-body white">
                <p>Sunrise: ${d}</p>
                <p>Sunset: ${d2}</p>
                <p>UV Index ${data.current.uvi}</p>
              </div>
              </li>  
              `;
              display24(data);
            }

         

             function display24(passed){
              datas = passed.hourly;
              let d = '';
              let mani = document.querySelector("#results-24");
              mani.innerHTML='';
              var i = 0;
              for(let data of datas){
                d = new Date(data.dt * 1000).toLocaleTimeString("en-US");
              mani.innerHTML += ` 
              <li>
              <div class="collapsible-header">
                <h6>Hour: ${d}</h6>
              </div>
            <div class="collapsible-body white">
                <h4> Forecast </h4>
                <p>Weather  ${data.weather[0].description}</p>
                <p> Cloudness Percentage ${data.clouds}</p>
                <p>Humidity: ${data.humidity}</p>  
                <p> Probability of Rain ${data.pop*100}%</p>
                <p> Wind Speed ${data.wind_speed}</p>
                <h4>Temperature</h4>
                <p>Current Temperature: ${data.temp} C</p>
                <p>Feels Like: ${data.feels_like} C</p>
                <p> UV Index ${data.uvi}  </p> 
              </div>
            </li>
           `
            }
            
            display7Day(passed);
          }


          function display7Day(passed){
            data = passed.daily;
            if(loaded === true){
              killAllCharts(returnChart1,returnChart2,returnChart3);
            }
            returnChart1 = createChartProb(data);
            returnChart2 =createChartMinMax(data);
            returnChart3 = createChartCloud(data);

            let mani = document.querySelector("#results-7D");
              mani. innerHTML = '';
              let today = new Date();
              for(let d of data){ 
                let d1 = new Date(d.sunrise * 1000).toLocaleTimeString("en-US");
                let d2 =  new Date(d.sunset * 1000).toLocaleTimeString("en-US");
                mani.innerHTML+= `
                <li>
                <div class="collapsible-header">
                    <h6>Prediction: ${today}</h6>
                </div>
                <div class="collapsible-body white">
                  <p>Description: ${d.weather[0].description}</p>
                  <p> Cloudy Percentage: ${d.clouds}</p>
                  <p> Probablity of Rain: ${d.pop * 100}</p>
                  <p> Humidty: ${d.humidity}</p>
                  <h3>Details</h3>
                  
                  <p> Sunrise: ${d1}</p>
                  <p>Sunset:  ${d2}</p>
                  <p> UV Index: ${d.uvi}</p>
                  <h3>Temperatures</h3>
                  <p> Morning Temp ${d.temp.morn}</p>
                  <p> Mid-day Temp ${d.temp.day}</p>
                  <p> Evening ${d.temp.night}</p>
                  <p> Night ${d.temp.eve}</p>
                  </div>
                  </li>
                `;
                today.setDate(today.getDate() +1);
              }
                loaded = true;
          }


          
            function error(err) {
              console.warn(`ERROR(${err.code}): ${err.message}`);
        }
          
            function locate(){
              navigator.geolocation.getCurrentPosition(success, error, options);
            }
          
            document.querySelector('#locateBtn').addEventListener('click', locate);
        
            
    
            function createChartProb(datas){
            
              const labels = [
              'Sunday','Monday','Tuesday','Wednesday', 'Thursday','Friday', 'Saturday'
              ];
              
              const data = {
                labels: labels,
                datasets: [{
              label: 'Probability of Rain (%)',
                  backgroundColor: 'rgba(244, 208, 63, 0.5)',
                  fill: true,
                  borderColor: 'rgba(244, 208, 63, 0.8)',
                  data : [datas[0].pop * 100,datas[1].pop *100 ,
                  datas[2].pop *100, datas[3].pop *100,
                  datas[4].pop *100,datas[5].pop * 100,
                  datas[6].pop * 100]}]};

              const config = {
                type: 'line',
                data: data,
                options: {}
              };
              var myChart = new Chart(
                document.getElementById('myChart'),
                 config
                );

                return myChart;

            }

            function createChartMinMax(datas){
               
              var ctx = document.getElementById('myChart2').getContext('2d');
              const data = {
                
                labels : [
                  'Sunday','Monday','Tuesday','Wednesday', 'Thursday','Friday', 'Saturday'
                  ],
                  datasets:[{
                    type:'line',
                    label:'min temp', backgroundColor:'rgba(217, 30, 24, 1)',
                    borderColor:'rgba(217, 30, 24, 1)',
                    data : [datas[0].temp.min,datas[1].temp.min,
                  datas[2].temp.min, datas[3].temp.min,
                  datas[4].temp.min,datas[5].temp.min,
                  datas[6].temp.min]
                  },{
                    type:'line',
                    label:'max temp',
                    backgroundColor: 'rgba(44, 130, 201, 1)',
                    borderColor:'rgba(44, 130, 201, 1)',
                    data : [datas[0].temp.max,datas[1].temp.max,
                  datas[2].temp.max, datas[3].temp.max,
                  datas[4].temp.max,datas[5].temp.max,
                  datas[6].temp.max]
                  }],

              };

              const config = {
                type: 'scatter',
                data: data,
                options: {
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                }
              };
              
              var myChart2 = new Chart(ctx,{
                data:data
                ,options:{}
                },
              config
              );

              return myChart2;
              
            }

            function createChartCloud(datas){

              const labels = [
              'Sunday','Monday','Tuesday','Wednesday', 'Thursday','Friday', 'Saturday'
              ];
              
              const data = {
                labels: labels,
                datasets: [{
              label: 'Cloudness (%)',
                  backgroundColor: 'rgba(34, 167, 240, 0.5)',
                  fill: true,
                  borderColor: 'rgba(34, 167, 240, 1)',
                  data : [datas[0].clouds,datas[1].clouds ,
                  datas[2].clouds, datas[3].clouds,
                  datas[4].clouds,datas[5].clouds,
                  datas[6].clouds]}]};

              const config = {
                type: 'bar',
                data: data,
                options: {}
              };
              
              var myChart3 = new Chart(
              document.getElementById('myChart3'),
               config
              );

              return myChart3;

            }

        function killAllCharts(chart1, chart2,chart3){
          chart1.destroy();
          chart2.destroy();
          chart3.destroy();
          loaded = false;
        }


        
       
         
