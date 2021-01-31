import React, { Component } from 'react';
import Recommend from '../views/recommend';
import HotRank from '../views/hotRank';
import Search from '../views/search';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';
// 引入样式文件
import '../assets/less/index.less';

class Index extends Component {
  render() {
    return (
      <div className="index">
        <div className="top">
          <div className="inner">
            <header>
              <h1 className="logo">
                <span>网易云音乐</span>
              </h1>
            </header>
            <div className="download">
              <span>下载APP</span>
            </div>
          </div>
        </div>
        {/* 导航 */}
        <div className="nav">
          <NavLink activeClassName="active" to="/index/recommend">
            <div>
              <span className="bd">
                <span>推荐音乐</span>
              </span>
            </div>
          </NavLink>
          <NavLink activeClassName="active" to="/index/hotRank">
            <div>
              <span className="bd">
                <span>热歌榜</span>
              </span>
            </div>
          </NavLink>
          <NavLink activeClassName="active" to="/index/search">
            <div>
              <span className="bd">
                <span>搜索</span>
              </span>
            </div>
          </NavLink>
        </div>
        <Switch>
          <Route path="/index/recommend" component={Recommend}></Route>
          <Route path="/index/hotRank" component={HotRank}></Route>
          <Route path="/index/search" component={Search}></Route>
          <Redirect to="/index/recommend"></Redirect>
        </Switch>
      </div>
    );
  }
}

export default Index;
