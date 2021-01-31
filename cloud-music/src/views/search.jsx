import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../assets/less/search.less';
// 引入接口
import { getHotSearch, getSuggest, searchSong } from '../utils/axios';
class HotSearch extends Component {
  // 获取热搜关键词
  state = {
    hotSearchList: [],
  };
  componentDidMount() {
    this.getHotSearchList();
  }
  // 获取关键词
  getHotSearchList = async () => {
    const res = await getHotSearch().catch((err) => console.log(err));
    // console.log(res);
    if (res.code === 200) {
      this.setState({
        hotSearchList: res.result.hots,
      });
    }
  };
  render() {
    const { hotSearchList } = this.state;
    return (
      <div className="hotSearch">
        <p className="desc">热门搜索</p>
        <ul className="list">
          {hotSearchList.map((val, i) => (
            <li className="hot" key={i} onClick={()=>this.props.search(val.first)}>
              <span>{val.first}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
class SearchSuggest extends Component {
  // 获取搜索提示
  state = {
    suggestList: [],
  };
  componentDidMount() {
    this.getSuggestList();
  }
  // 父组件中改变了props传值时触发的函数
  componentWillReceiveProps() {
    this.getSuggestList();
  }
  // 获取搜索提示
  getSuggestList = async () => {
    const { val } = this.props;
    const res = await getSuggest(val).catch((err) => console.log(err));
    // console.log(res);
    if (res.code === 200) {
      this.setState({
        // 如果没有数据，就赋一个空数组
        suggestList: res.result.allMatch || [],
      });
    }
  };
  render() {
    const { suggestList } = this.state;
    return (
      <div className="searchSuggest">
        <ul>
          <li className="firstLine">搜索"{this.props.val}"</li>
          {suggestList.map((val, i) => (
            <li key={i}>{val.keyword}</li>
          ))}
        </ul>
      </div>
    );
  }
}
class SearchSongsList extends Component {
  // 跳转到播放
  play = (id) => {
    console.log(id);
    console.log(this);
    // this.
  };

  // 搜索歌曲获得的列表
  render() {
    const { searchResult } = this.props;
    return (
      <div className="searchSongsList">
        <ul>
          {searchResult.map((val, i) => (
            <Link
              to={{
                pathname: '/play',
                state: {
                  id: val.id,
                },
              }}
            >
              <li key={i}>
                <div className="info">
                  <p className="songName">{val.name}</p>
                  <p className="singer">
                    {val.artists.map((inf) => inf.name).join(' / ')} -
                    {val.album.name}
                  </p>
                </div>
                <i className="icon"></i>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    );
  }
}
class Search extends Component {
  state = {
    val: '',
    valLength: 0,
    isSearch: false,
    searchResult: [],
  };
  inputRef = React.createRef();
  // 输入input触发
  inputKeywords = async (e) => {
    const val = e.target.value;
    this.setState({
      val,
      valLength: val.length,
      isSearch: false,
      searchResult: [],
    });
    if (e.keyCode === 13) {
      // 按下回车触发搜索
      this.search(val);
      // this.setState({
      //   isSearch: true,
      // });
      // const res = await searchSong(val).catch((err) => console.log(err));
      // console.log(res);
      // if (res.code === 200) {
      //   this.setState({
      //     searchResult: res.result.songs,
      //   });
      // }
    }
    // console.log(e);
  };
  // 搜索
  search = async (val) => {
    this.setState({
      isSearch: true,
    });
    console.log(val);
    const res = await searchSong(val).catch((err) => console.log(err));
    console.log(res);
    if (res.code === 200) {
      this.setState({
        searchResult: res.result.songs,
      },()=>{
        console.log(this);
      });
    }
  };
  // 清空input
  cleanInput = () => {
    // console.log(this);
    this.inputRef.current.value = '';
    this.setState({
      val: '',
      valLength: 0,
      isSearch: false,
      searchResult: [],
    });
  };
  render() {
    const { val, valLength, isSearch, searchResult } = this.state;
    // console.log(valLength);
    return (
      <div className="search">
        {/* 搜索框 */}
        <div className="searchBar">
          <div className="searchInput">
            <input
              onKeyUp={this.inputKeywords}
              type="text"
              placeholder="搜索歌曲、歌手、专辑"
              ref={this.inputRef}
            />
            {valLength > 0 ? (
              <span className="cleanInput" onClick={this.cleanInput}>
                x
              </span>
            ) : (
              ''
            )}
          </div>
        </div>
        {/* 热搜词 */}
        {valLength === 0&& searchResult.length===0? <HotSearch search = {this.search}></HotSearch> : ''}
        {/* 搜索提示 */}
        { valLength > 0 && !isSearch ? <SearchSuggest val={val} /> : ''}
        {/* 显示搜索到的歌曲列表 */}
        {isSearch && searchResult.length > 0 ? (
          <SearchSongsList searchResult={searchResult || []} />
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default Search;
