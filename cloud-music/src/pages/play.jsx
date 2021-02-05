import React, { Component } from 'react';
import $ from 'jquery';
import '../assets/less/play.less';
import img from '../assets/images/pic.png';
import pause from '../assets/images/pause.png';
// 引入接口
import { getSong, getLyric, getSongInfo } from '../utils/axios';
class Play extends Component {
  state = {
    id: '',
    songUrl: '',
    lyric: '',
    img,
    pause,
    songName: '',
    picUrl: '',
    singer: '',
    currentTime: '00:00',
    isPlay: true,
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
        // 歌曲信息
        this.getSongInfo();
      }
    );
  }
  // 音乐播放器 audio 的ref
  musicPlayer = React.createRef();
  // 音乐播放器 歌词列表 的ref
  lyricList = React.createRef();
  // 暂停图标的 ref
  pauseIcon = React.createRef();
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
    // console.log(res);
    const lyric = {};
    const reg = /\[(.*?)](.*)/g;
    res.lrc.lyric.replace(reg, (pre, time, cur) => {
      time = time.slice(0, 5);
      lyric[time] = cur;
    });
    // console.log(lyric);
    if (res.code === 200) {
      this.setState(
        {
          lyric,
        },
        () => {
          const player = this.musicPlayer.current;
          // currentTime 当前播放时间
          player.ontimeupdate = () => {
            // 将时间格式化
            const transform = (second) =>
              parseInt(second).toString().padStart(2, '0');
            let currentTime = parseInt(player.currentTime);
            currentTime = `${transform(currentTime / 60)}:${transform(
              currentTime % 60
            )}`;
            // 给匹配到时间的歌词添加样式
            if (currentTime in this.state.lyric) {
              this.setState(
                {
                  currentTime,
                },
                () => {
                  // 歌词滚动
                  const curLyric = $('.active')[0];
                  const list = $(this.lyricList.current);
                  const idx = list.children().index(curLyric);
                  const offset = 26;
                  if (curLyric.offsetTop > offset) {
                    list.css('transform', `translateY(-${idx * offset}px)`);
                  }
                }
              );
            }
          };
        }
      );
    }
  };
  // 获取歌曲信息
  getSongInfo = async () => {
    const { id } = this.state;
    const res = await getSongInfo(id).catch((err) => console.log(err));
    // console.log(res, 'info');
    if (res.code === 200) {
      const singer = res.songs[0].ar.map((val) => val.name).join('/');
      this.setState({
        picUrl: res.songs[0].al.picUrl,
        songName: res.songs[0].name,
        singer,
      });
    }
  };
  // 播放暂停
  changePlay = () => {
    this.setState(
      {
        isPlay: !this.state.isPlay,
      },
      () => {
        const { isPlay } = this.state;
        const player = this.musicPlayer.current;
        // console.log(player);
        // 播放
        if (isPlay) {
          player.play();
          this.pauseIcon.current.style.display = 'none';
        } else {
          // 暂停
          player.pause();
          this.pauseIcon.current.style.display = 'block';
        }
      }
    );
  };
  render() {
    const {
      songUrl,
      lyric,
      img,
      pause,
      picUrl,
      songName,
      singer,
      currentTime,
    } = this.state;
    // console.log(Array.isArray(lyric));
    return (
      <div className="player">
        {/* 上半部分 */}
        <div className="box" onClick={this.changePlay}>
          {/* 播放器上部分的杆 */}
          <div className="rod">
            <img src={img} alt="" />
          </div>
          <div className="pause" ref={this.pauseIcon}>
            <img src={pause} alt="" />
          </div>
          {/* 播放器的图片 */}
          <div className="songImg">
            <img src={picUrl} />
          </div>
        </div>

        {/* 歌曲信息部分 */}
        <div className="songInfo">
          <p className="infos">
            <span className="songName">{songName} - </span>
            <span className="singers">{singer}</span>
          </p>
          <div className="lyric">
            <div className="inner" ref={this.lyricList}>
              {Object.entries(lyric).map((val, i) =>
                currentTime == val[0] ? (
                  <p className="active" keys={i}>
                    {val[1]}
                  </p>
                ) : (
                  <p keys={i}>{val[1]}</p>
                )
              )}
            </div>
          </div>
          <audio ref={this.musicPlayer} src={songUrl} autoPlay></audio>
        </div>

        {/* 下载按钮 */}
        <div className="downloadBtn">
          <a href="javascript:;" className="open">打开</a>
          <a href="javascript:;" className="download">下载</a>
        </div>
      </div>
    );
  }
}

export default Play;
