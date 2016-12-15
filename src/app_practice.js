// var data =[
// {"links" : [
//   {"title": "blog", "link": "/"},
//   {"title": "about", "link": "/about"}
// ]},
// {"posts": [
//   {"title": "Hello World", "link": "/hello-world", "content": "I’ve finally started a blog! For those that don’t know me, my name is Bryce and I have worked in the digital marketing space for the last 6 years. I’ve spent the majority of this time as a web project manager..."},
//   {"title": "Git", "link": "/git", "content": "is this a neat paragraph? Could ya tell me now? is this a neat paragraph? Could ya tell me now? is this a neat paragraph? Could ya tell me now?"}
// ]}
// ]


//TO DO
//bring in links via json - set up json file;
//separate html/css
var NavComponent = React.createClass({
  propTypes : {
    title : React.PropTypes.string,
    subtitle: React.PropTypes.string,
    link : React.PropTypes.string
  },
  render(){
    var navLinks = data[0].links.map((item, i) => {
      return (

        <li key={i}><a href={item["link"]}>{item["title"]}</a></li>
      )
    });
    return (
    <nav className="row">
    <div className="box-100">
        <div className="nav_logo">{this.props.title} :<span className="nav_sublogo">{this.props.subtitle}</span></div>
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
var BlogComponent = React.createClass({
  getInitialState(){
    return {list: true}
  },
  propTypes : {
    title : React.PropTypes.string,
    link : React.PropTypes.object
  },
  open(){
    this.setState({list: !this.state.list})
    // var page = this.refs.blogTitle.innerHTML;
    // alert(`You've opened!` + page);
  },
  renderList(){
    var posts = this.props.data[1].posts.map((item, i) => {
      return (
        <div key={i} className="box-50">
          <h2 ref="blogTitle">{this.state.read ? "read" : item.title}</h2>
          <p>{item.content}</p>
          <a href="#" onClick={this.open} className="button">Read Post</a>
        </div>
      )
      });
      return (
      <div className="row_group-first">
        {posts}
      </div>
    );
  },
  renderPost(){
    return (
      <div>
        <h1>A Post</h1>
        <a href="#" onClick={this.open} className="button">Back</a>
      </div>
    );
  },
  render(){
    if(this.state.list){
      return this.renderList();
    }else{
      return this.renderPost();
    }
  }
});

// TO DO: create shell that takes data as initial state and displays posts
var BlogShell = React.createClass({
  getInitialState(){
    return {data: undefined}
  },
  loadData(){
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
              this.setState({data : data});
            })
          }else{
            console.log('Network response was not ok.');
          }
        })
        .catch(error => console.log(`Fetch error: ${error}`));
    }
  },
  componentDidMount(){
    this.loadData();
  },
  propTypes(){

  },
  render(){
    return <BlogComponent data={this.state.data} />
  }
});

var FooterComponent = React.createClass({
  render(){
    return (
      <div className="row">
        <div className="box-100">
          <footer>
          <p>no rights reserved - do whatever you want with this content</p>
          </footer>
        </div>
      </div>
    )
  }
  });

// class FooterComponent extends React.Component{
//   render(){
//     return (
//       <div className="row">
//         <div className="box-100">
//           <footer>
//           <p>no rights reserved - do whatever you want with this content</p>
//           </footer>
//         </div>
//       </div>
//     )
//   }
// }

// const FooterComponent = () => {
//   return <div className="row">
//       <div className="box-100">
//         <footer>
//         <p>no rights reserved - do whatever you want with this content</p>
//         </footer>
//       </div>
//     </div>
// }



ReactDOM.render(
  <div>

  <BlogShell/>
  <FooterComponent />
  </div>,
  document.getElementById('app')
);
