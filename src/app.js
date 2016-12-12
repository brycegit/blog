var links = [
  {title: "blog", link: "/"},
  {title: "about", link: "/about"}
]

//TO DO
//bring in links via json - set up json file;
//separate html/css
var NavComponent = React.createClass({
  propTypes : {
    title : React.PropTypes.string,
    subtitle: React.PropTypes.string,
    link : React.PropTypes.object
  },
  render : function(){
    return (
    <nav className="row">
    <div className="box-100">
        <div className="nav_logo">bryce dooley :<span className="nav_sublogo">[web development, project management, digital marketing]</span></div>
      <div className="nav_links">
        <ul>
          <li><a className="nav_links-active" href="#">posts</a></li>
          <li><a href="#">about</a></li>
          <li><a href="#">contact</a></li>
          <li><a href="#">projects</a></li>
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
