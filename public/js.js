          const tabs = M.Tabs.init(document.querySelector('.tabs'));
          const API_KEY = "1d611e5252ee50d950f35b8c75d928fc";

          document.addEventListener('DOMContentLoaded', function() {
            const elems = document.querySelectorAll('.collapsible');
            const instances = M.Collapsible.init(elems, options);
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
            createChart(data);
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
               '10', '20', '30', '40', '50','60','70', '80', '90','100'
              ];
              let result = 0;

          for (let d of datas){
                result += (d.day + d.night + d.eve+ d.morning)/7;
              }
              console.log(result);

              const data = {
                labels: labels,
                datasets: [{
              label: 'Proibility of Perciptaion ',
                  backgroundColor: 'rgba(0,0,0,1)',
                  pointHoverBackgroundColor: 'rgba(255,255,255,1)',
                  borderColor: 'rgba(0,0,0,1)',
                  data : result}]};

              const config = {
                type: 'line',
                data: data,
                options: {}
              };
              
              var myChart = new Chart(
              document.getElementById('myChart'),
               config
              );

            }

        
       
         
