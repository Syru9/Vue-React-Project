import React, { Component } from 'react';
import '../assets/less/hotRank.less';
// 引入后台接口
import { getHotList } from '../utils/axios';
class HotRank extends Component {
  state = {
    songsList: [],
  };
  componentDidMount() {
    this.getSongList();
  }
  // 获取热歌榜
  getSongList = async () => {
    const res = await getHotList().catch((err) => console.log(err));
    if (res.code === 200) {
      this.setState({
        songsList: res.playlist.tracks.filter((item, i) => i <= 19),
      });
      // console.log(res);
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
  render() {
    const { songsList } = this.state;
    return (
      <div className="hotRank">
        {/* 头部 */}
        <div className="title">
          <div className="name"></div>
        </div>

        {/* 列表 */}
        <ul className="songsList">
          {songsList.map((val, i) => (
            <li className="item" key={val.id} onClick={() => this.play(val.id)}>
              <span className="idx">{(i + 1).toString().padStart(2, '0')}</span>
              <div className="outer">
                <div className="songInfo">
                  <p className="songName">
                    {val.name}
                    {val.alia[0] ? (
                      <span className="alia">({val.alia[0]})</span>
                    ) : (
                      ''
                    )}
                  </p>
                  <p className="singer">{`${val.ar
                    .map((item) => item.name)
                    .join(' / ')}-${val.al.name}`}</p>
                </div>
                <span className="playBtn"></span>
              </div>
            </li>
          ))}
        </ul>

        {/* 更多 */}
        <div className="more">
          <p>查看完整榜单</p>
        </div>
      </div>
    );
  }
}

export default HotRank;
