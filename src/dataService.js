var data = [];

if(self.fetch){
  fetch('../build/data.json')
    .then(response => {
      if(response.ok){
      response.json()
        .then(json => {
          for (var i = 0; i < json.length; i++) {
            data.push(json[i]);
          }
          console.log(data);
        })
      }else{
        console.log('Network response was not ok.');
      }
    })
    .catch(error => console.log(`Fetch error: ${error}`));
}
