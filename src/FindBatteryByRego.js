import React from 'react';
import axios from 'axios';

class Post extends React.Component {
    render() {
      return (
        <div className="post">
          <span>{this.props.content}</span>
        </div>
      )
    }
  }

class Feed extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        posts: [
          {content: 'This is my first post!'},
          {content: 'This is my second post!'}
        ]
      }
    }
    render() {
      const posts = this.state.posts.map((post, index) =>
        <Post key={index} value={post} />
      );
      return (
        <div className="feed">
          {posts}
        </div>
      )
    }
  }

  class PostForm extends React.Component {
    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleSubmit(event) {
      event.preventDefault();
    }
  
    render() {
      return (
        <div className="post-form">
          <form onSubmit={this.handleSubmit}>
            <label>
              Content:
              <input type="text" />
            </label>
            <button className="button">Submit</button>
          </form>
        </div>
      )
    }
  }