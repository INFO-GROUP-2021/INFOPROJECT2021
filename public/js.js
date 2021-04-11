const tabs = M.Tabs.init(document.querySelector('.tabs'));
          const API_KEY = "1d611e5252ee50d950f35b8c75d928fc";
          var options = {
              enableHighAccuracy: true,
              timeout: 5000,
              maximumAge: 0
            };
          
            async function success(pos) {
              var crd = pos.coords;
  
              let URL = "https://api.openweathermap.org/data/2.5/onecall?lat="+crd.latitude+"&lon="+crd.longitude+"&units=metric&exclude =alerts,minutely&appid="+API_KEY;
  
              let response = await fetch(URL);
              let data = await response.json();
              console.log(data);
              displayWeather(data);
            }
  
            
  
            async function searchBy(){
              let myData = JSON.parse(name)
                console.log(myData);
            }
  
            function displayWeather(data){
              let mani = document.querySelector("#results");
              let d = new Date(data.current.sunrise * 1000).toLocaleTimeString("en-US");
              let d2 =  new Date(data.current.sunset * 1000).toLocaleTimeString("en-US");
              mani. innerHTML = '';
              mani.innerHTML += ` 
              <tr>
                <td>Longditute: ${data.lon}</td>
                <td>Latitude: ${data.lat}</td>
              </tr>
                <tr>
                    <td>Currently ${data.current.weather[0].description}  
                </tr>
              <tr>
                <td>Current Temperture: ${data.current.temp} C</td>
              </tr>
              <tr>
                <td>Feels Like: ${data.current.feels_like} C</td>
              </tr>
              <tr>
                <td>Humidity: ${data.current.humidity}</td>
              </tr>
              <tr>
                <td>Sunrise: ${d}</td>
              </tr>
              <tr>
                <td>Sunset: ${d2}</td>
              </tr>  
              `;
              display24(data.hourly);
            }

            function display24(datas){
              let i = 1;
              let mani = document.querySelector("#results-24");
              mani.innerHTML='';
              for(let data of datas){
              mani.innerHTML += ` 
              <tr>
                <td>Hour: ${i}<td>
                <td>Forcast:  ${data.weather[0].description}  
                <td>Current Temperture: ${data.temp} C</td>
                <td>Feels Like: ${data.feels_like} C</td>
                <td>Humidity: ${data.humidity}</td>
              </tr>
            `
            i = i+ 1;
            }
          
            createChart(datas);
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
       
         
