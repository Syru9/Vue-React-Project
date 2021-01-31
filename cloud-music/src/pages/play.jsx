import React, { Component } from 'react';
// 引入接口
import { getSong, getLyric } from '../utils/axios';
class Play extends Component {
  state = {
    id: '',
    songUrl: '',
    lyric: '',
  };
  componentDidMount() {
    // 传入歌曲 id
    this.setState(
      {
        id: this.props.location.state.id,
      },
      () => {
        // 获取歌曲 url
        this.getSongUrl();
        // 获取歌词
        this.getSongLyric();
      }
    );
  }
  // 获取歌曲 url
  getSongUrl = async () => {
    const { id } = this.state;
    const res = await getSong(id).catch((err) => console.log(err));
    // console.log(res);
    if (res.code === 200) {
      this.setState({
        songUrl: res.data[0].url,
      });
    }
  };
  // 获取歌词
  getSongLyric = async () => {
    const { id } = this.state;
    const res = await getLyric(id).catch((err) => console.log(err));
    console.log(res);
    if (res.code === 200) {
      this.setState({
        lyric: res.lrc.lyric,
      });
    }
  };
  render() {
    const { songUrl, lyric } = this.state;
    return (
      <div>
        <audio src={songUrl} controls autoPlay></audio>
        <p>{lyric}</p>
      </div>
    );
  }
}

export default Play;
