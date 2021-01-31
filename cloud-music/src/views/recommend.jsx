import React, { Component } from 'react';
import '../assets/less/recommend.less';
// 引入接口
import { getRecommend, getSongListDetail } from '../utils/axios';
class Recommend extends Component {
  state = {
    recommendList: [],
  };
  componentDidMount() {
    this.getRecommendList();
  }
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
    // const res = await getSongListDetail(id).catch((err) => console.log(err));
    // console.log(res);
  };
  render() {
    const { recommendList } = this.state;
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
      </div>
    );
  }
}

export default Recommend;
