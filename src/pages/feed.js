import React, { Component } from 'react';
import {
  Section,
  Header,
  SpanName,
  SpanPlace, 
  Article,
  DivHeader,
  Img,
  Button,
  Footer,
  FooterDiv,
  FooterImg,
  FooterP,
  FooterSpan,
} from '../styles/feed';

import api from '../services/api';
import io from 'socket.io-client';

import like from '../assets/like.svg';
import more from '../assets/more.svg';
import comment from '../assets/comment.svg';
import send from '../assets/send.svg';

class Feed extends Component {
  state = {
    feed: [],
  };

  apiGetData = async _ => {
    try {
      const resp = await api.get('/posts');
      const data = resp.data;
      this.setState({ feed: data });
      
    } catch(err) {
      console.log(err);
    }
  };

  registerToSocket = _ => {
    const socket = io('http://localhost:3000');
    
    socket.on('post', newData => {
      const data = [newData, ...this.state.feed]; 
      this.setState({ feed: data });
    });
    
    socket.on('like', likedPost => {
      const data = this.state.feed.map(post =>
        post._id === likedPost._id ? likedPost : post  
      );
      this.setState({ feed: data });
    });
  };

  handleLike = async id => {
    await api.post(`/posts/${id}/like`);
  };

  componentDidMount() { 
    this.registerToSocket();
    this.apiGetData();
  };

  render() {
  return (
    <Section>
      {!!this.state.feed && this.state.feed.map(post => (
        <Article key={post._id}>
          <Header>
            <DivHeader>
              <SpanName>{post.author}</SpanName>
              <SpanPlace>{post.place}</SpanPlace>
            </DivHeader>

            <Img src={more} alt='Mais' />
          </Header>

          <Img style={{width: '100%'}} src={`http://localhost:3000/files/${post.image}`} alt='' />

          <Footer>
            <FooterDiv>
              <Button onClick={_ => this.handleLike(post._id)}>
                <FooterImg src={like} alt='' />
              </Button>
              <FooterImg src={comment} alt='' />
              <FooterImg src={send} alt='' />
            </FooterDiv>

            <strong>{post.like} curtidas</strong>
            <FooterP>
              {post.description}
              <FooterSpan>{post.hashtags}</FooterSpan>
            </FooterP>
          </Footer>
        </Article>
      ))}
    </Section>
  )
  }
};

export default Feed;