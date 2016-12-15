var App = React.createClass({
  getInitialState(){
    return {data : "loading...", page: "posts", category: "All", blogPost: null}
  },
  componentDidMount(){
    this.loadData();
  },
  componentDidUpdate() {
    ReactDOM.findDOMNode(this).scrollIntoView()
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
  displayHome(event){
    this.setState({page : "posts", blogPost: null, category: "All"});
  },
  changePage(event){
    if(event.target.textContent != "posts"){
      this.setState({page : event.target.textContent, category: "All", blogPost: null});
    }else{
      this.setState({page : event.target.textContent, category: "All", blogPost: null});
    }
  },
  displayCategory(event){
    this.setState({category: event.target.textContent, page: "posts", blogPost: null});
  },
  displayPost(event){
    let postCategory = this.state.data.posts.reduce((acc, curr) => {
      curr.title == event.target.name ? acc = curr.category : null;
      return acc;
    }, null);
    this.setState({blogPost: event.target.name, page: "posts", category: postCategory});
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
            this.state.category == "All" ? posts.push(post) : post.category == this.state.category ? posts.push(post) : null;
            if(this.state.blogPost == post.title) currentPost = post;
            if(categories.indexOf(post.category) == -1) {
                categories.push(post.category);
            }
          }
        )
      }else{
        if(this.state.page == page)
          content = this.state.data[page].content;
      }
    }
    if(this.state.page == "posts" && this.state.blogPost == null){
      return (
        <div>
        <Nav home={this.displayHome} pageClick={this.changePage} categoryClick={this.displayCategory} logo="bryce dooley" links={links} categories={categories} page={this.state.page} category={this.state.category}/>
        <BlogListing category={this.state.category} click={this.displayPost} posts={posts}/>
        <Footer/>
        </div>
      )
    }else if(this.state.blogPost){
      return (
        <div>
        <Nav home={this.displayHome} pageClick={this.changePage} categoryClick={this.displayCategory}logo="bryce dooley" links={links} categories={categories} page={this.state.page} category={this.state.category}/>
        <Landing title={this.state.blogPost} content={currentPost.content}/>
        <a className="button" onClick={this.displayHome}>View All Posts</a>
        <Footer/>
        </div>
      )
    }else{
      return(
        <div>
        <Nav home={this.displayHome} pageClick={this.changePage} categoryClick={this.displayCategory} logo="bryce dooley" links={links} categories={categories} page={this.state.page} category={this.state.category}/>
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
        return <a key={i}><span onClick={this.props.categoryClick} className={this.props.category == cat ? "nav_links-active" : null}>{cat}</span></a>
      }else{
        return <a key={i}><span onClick={this.props.categoryClick} className={this.props.category == cat ? "nav_links-active" : null}>{cat}</span>, </a>
      }
    });
    var links = this.props.links.map((link, i) => {
      return <li key={i}><a onClick={this.props.pageClick} className={this.props.page == link ? "nav_links-active" : null}>{link}</a></li>
    });
    return (
      <nav className="row">
        <div className="box-100">
            <div className="nav_logo"><a onClick={this.props.home}>{title}</a> :<span className="nav_sublogo">[{categories}]</span></div>
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
      var postClass = "box-50";
      var rowClass = "row";
      this.props.posts.length % 2 != 0 && i == this.props.posts.length - 1 ? postClass = "box-100" :  null;
      return (
        <div key={i} className={postClass}>
          <h2>{item.title}</h2>
          <div dangerouslySetInnerHTML={ {__html: item.teaser} }></div>
          <a name={item.title} onClick={this.props.click} className="button">Read Post</a>
        </div>
      )
      });
    return (
      <div className="row">
        <h1>{this.props.category} Posts</h1>
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
