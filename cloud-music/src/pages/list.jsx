import React, { Component } from 'react';
import '../assets/less/list.less';
// 引入接口
import { getSongListDetail } from '../utils/axios';
class List extends Component {
  state = {
    id: '',
    songList: [],
    name:'',
    bg:''
  };
  componentDidMount() {
    this.setState(
      {
        id: this.props.location.state.id,
      },
      () => {
        // 获取歌单详情
        this.getListDetail();
      }
    );
  }
  // 获取歌单详情
  getListDetail = async () => {
    const { id } = this.state;
    const res = await getSongListDetail(id).catch((err) => console.log(err));
    console.log(res);
    if (res.code === 200) {
      this.setState({
        songList: res.playlist.tracks,
        name:res.playlist.name,
        bg:res.playlist.coverImgUrl
      });
    }
	};
	  // 跳转到播放页
		play = (id) => {
			this.props.history.push({
				pathname: '/play',
				state: { id },
			});
		};
  render() {
    const { songList,bg,name } = this.state;
    return (
      <div className="list">
        <div className="listHeader">
          <img className="bg" src={bg} alt=""/>
          <p className="name">{name}</p>
        </div>
        <ul>
          {songList.map((val, i) => (
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
      </div>
    );
  }
}

export default List;
