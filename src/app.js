var App = React.createClass({
  getInitialState(){
    return {data : "loading...", page: "posts", category: "project management", blogPost: "Git"}
  },
  componentDidMount(){
    this.loadData();
  },
  loadData(){
    if(self.fetch){
      fetch('../build/data.json')
        .then(response => {
          if(response.ok){
          response.json()
            .then(json => {
              this.setState({data : json});
            })
          }else{
            console.log('Network response was not ok.');
          }
        })
        .catch(error => console.log(`Fetch error: ${error}`));
    }else{
      // TO DO: add xhttp req
    }
  },
  render(){
    var links = [];
    var posts = [];
    var categories = [];
    var currentPost = "";
    var content = "";
    for(var page in this.state.data){
      links.push(page);
      if(page == "posts"){
        this.state.data[page].map(post => {
            posts.push(post);
            if(this.state.blogPost == post.title) currentPost = post;
            if(categories.indexOf(post.category) == -1) {
                categories.push(post.category);
            }
          }
        )
      }else{
        content = this.state.data[page].content;
      }
    }
    if(this.state.page == "posts" && this.state.blogPost == null){
      return (
        <div>
        <Nav logo="bryce dooley" links={links} categories={categories} page={this.state.page} category={this.state.category}/>
        <BlogListing posts={posts}/>
        <Footer/>
        </div>
      )
    }else if(this.state.blogPost){
      return (
        <div>
        <Nav logo="bryce dooley" links={links} categories={categories} page={this.state.page} category={this.state.category}/>
        <Landing  title={this.state.blogPost} content={currentPost.content}/>
        <Footer/>
        </div>
      )
    }else{
      return(
        <div>
        <Nav logo="bryce dooley" links={links} categories={categories} page={this.state.page} category={this.state.category}/>
        <Landing title={this.state.page} content={content}/>
        <Footer/>
        </div>
      )
    }
  }
});
//TO DO - make links work
var Nav = React.createClass({
  propTypes: {
    logo: React.PropTypes.string,
    links: React.PropTypes.array,
    categories: React.PropTypes.array,
    page: React.PropTypes.string,
    category: React.PropTypes.string
  },
  render(){
    var title = this.props.logo;
    var categories = this.props.categories.map((cat, i) => {
      if(this.props.categories.indexOf(cat) == this.props.categories.length - 1){
        return <a className={this.props.category == cat ? "nav_links-active" : null} key={i}>{cat}</a>
      }else{
        return <a className={this.props.category == cat ? "nav_links-active" : null} key={i}>{cat}</a>
      }
    });
    var links = this.props.links.map((link, i) => {
      return <li key={i}><a className={this.props.page == link ? "nav_links-active" : null}>{link}</a></li>
    });
    return (
      <nav className="row">
        <div className="box-100">
            <div className="nav_logo">{title} :<span className="nav_sublogo">[{categories}]</span></div>
          <div className="nav_links">
            <ul>
              {links}
            </ul>
          </div>
        </div>
      </nav>
    )
  }
});

var BlogListing = React.createClass({
  propTypes: {
    posts: React.PropTypes.array
  },
  render(){
    var posts = this.props.posts.map((item, i) => {
      return (
        <div key={i} className="box-50">
          <h2>{item.title}</h2>
          <p>{item.content}</p>
          <a href="#" className="button">Read Post</a>
        </div>
      )
      });
    return (
      <div className="row_group-first">
        {posts}
      </div>
    )
  }
});

var Landing = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    content: React.PropTypes.string
  },
  render(){
    return(
      <div className="row">
        <div className="box-100">
          <h1>{this.props.title}</h1>
          <div dangerouslySetInnerHTML={ {__html: this.props.content} }></div>
        </div>
      </div>
    )
  }
});

var Footer = React.createClass({
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

ReactDOM.render(<App/>,
  document.getElementById('app')
);
