import React, { Component } from 'react';
import '../assets/less/recommend.less';
// 引入接口
import { getRecommend, getNewSongs } from '../utils/axios';
class Recommend extends Component {
  state = {
    recommendList: [],
    newSongs: [],
  };
  componentDidMount() {
    this.getRecommendList();
    this.getNewSongList();
  }
  // 获取新歌列表
  getNewSongList = async () => {
    const res = await getNewSongs().catch((err) => console.log(err));
    // console.log(res);
    if (res.code === 200) {
      this.setState(
        {
          newSongs: res.data.filter((val, i) => i < 10),
        },
        () => {
          console.log(this.state.newSongs);
        }
      );
    }
  };
  // 跳转到播放页
  play = (id) => {
    // console.log(id);
    // console.log(this.props);
    this.props.history.push({
      pathname: '/play',
      state: { id },
    });
  };
  // 获取歌单
  getRecommendList = async () => {
    const res = await getRecommend(6).catch((err) => console.log(err));
    if (res.code === 200) {
      this.setState({
        recommendList: res.result,
      });
    }
  };
  // 跳转到歌单详情
  getDetail = async (id) => {
    console.log(this.props);
    this.props.history.push({
      pathname: '/list',
      state: {
        id,
      },
    });
  };
  render() {
    const { recommendList, newSongs } = this.state;
    return (
      <div className="recommend">
        <h4>推荐歌单</h4>
        <ul className="list">
          {recommendList.map((val) => (
            <li key={val.id} onClick={() => this.getDetail(val.id)}>
              <img src={val.picUrl} alt="" />
              <p>{val.name}</p>
            </li>
          ))}
        </ul>
        <h4 className="mt">最新音乐</h4>
        <ul className="newSongs">
          {newSongs.map((val) => (
            <li key={val.id} onClick={() => this.play(val.id)}>
              <p className="title">
                {val.name}
                <span className="alias">
                  {val.alias[0]?`( ${val.alias[0]} )`:''}
                </span>
              </p>
              <p className="artist">
                {val.artists.map((ar) => ar.name).join(' / ')} -{' '}
                {val.album.name}
              </p>
              <i className="playBtn"></i>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Recommend;
