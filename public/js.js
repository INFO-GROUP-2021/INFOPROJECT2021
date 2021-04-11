
        function executeScripts(){
                let script = document.querySelector('script').innerText;
                try{
                eval(script);
                }catch(e){
                console.error(e);
                }   
            }

        async function navigate(title, url){
            document.title = title;
            let content = document.querySelector('#content');
            console.log(url);
            if(url === null){
              content.innerHTML = "";
            }else{
              let response = await fetch(url);//fetch another page eg battery.html
              content.innerHTML = await response.text();
              executeScripts();
            }
          }

          function handleClick(event){
            event.preventDefault();
            event.stopPropagation();
            let a = event.target;//get the anchor tag element
            let text = a.text;//get text content of the anchor element
            let url = a.href;//get the url of the anchor element
            history.pushState({title:text, url: url}, null, a.href);//pass the url and text to the history
            navigate(a.text, a.href);//then navigate to page
          }

        
          const navi = document.querySelector('#navi');
         navi.addEventListener('click', handleClick, false);

       
         
