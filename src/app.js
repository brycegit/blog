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

//TO DO
//bring in links via json - set up json file;
//separate html/css
var NavComponent = React.createClass({
  propTypes : {
    title : React.PropTypes.string,
    subtitle: React.PropTypes.string,
    link : React.PropTypes.string
  },
  render: function(){
    var navLinks = data.map(item => {
      return (
        <li><a href={item["link"]}>{item["title"]}</a></li>
      )
    });
    // console.log(navLinks);
    return (
    <nav className="row">
    <div className="box-100">
        <div className="nav_logo">bryce dooley :<span className="nav_sublogo">[web development, project management, digital marketing]</span></div>
      <div className="nav_links">
        <ul>
          {navLinks}
        </ul>
      </div>
    </div>
    </nav>
  );
  }
});

//TO DO
//add proptypes
//pull in blog copy via json
//dynamic 50%/100%/33% etc.
var ListingComponent = React.createClass({
  // propTypes : {
  //   title : React.PropTypes.string,
  //   subtitle: React.PropTypes.string,
  //   link : React.PropTypes.object
  // },
  render : function(){
    return (
    <div className="row_group-first">
      <div className="box-50">
        <h2>Hello World!</h2>
        <p>I’ve finally started a blog! For those that don’t know me, my name is Bryce and I have worked in the digital marketing space for the last 6 years. I’ve spent the majority of this time as a web project manager...</p>
        <a href="#" className="button">Read Post</a>
      </div>
      <div className="box-50">
        <h2>Setting up a GitHub page</h2>
        <p>is this a neat paragraph? Could ya tell me now? is this a neat paragraph? Could ya tell me now? is this a neat paragraph? Could ya tell me now?</p>
        <a href="#" className="button">Read Post</a>
      </div>
    </div>
  );
  }
});

var FooterComponent = React.createClass({
  render : function(){
    return (
      <div className="row">
        <div className="box-100">
          <footer>
          <p>no rights reserved - do whatever you want with this content</p>
          </footer>
        </div>
      </div>
  );
  }
  });

ReactDOM.render(
  <div>
  <NavComponent />
  <ListingComponent />
  <FooterComponent />
  </div>,
  document.getElementById('app')
);
