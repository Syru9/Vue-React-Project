import axios from './axios';

// 获取推荐歌单
export function getRecommend(num) {
  return axios.get('/personalized?limit=' + num);
}

// 获取热歌榜
export function getHotList() {
  return axios.get('/playlist/detail?id=3778678');
}

// 根据歌单 id 获取歌单详情
export function getSongListDetail(id) {
  return axios.get('/playlist/detail?id=' + id);
}

// 获取热门搜索列表
export function getHotSearch() {
  return axios.get('/search/hot');
}

// 获取搜索建议
export function getSuggest(title) {
  return axios.get(`/search/suggest?keywords= ${title}&type=mobile`);
}

// 获取歌曲 url
export function getSong(id) {
  return axios.get('/song/url?id=' + id);
}

// 获取歌词
export function getLyric(id) {
  return axios.get('/lyric', {
    params: { id },
  });
}

// 搜索歌曲
export function searchSong(keywords) {
  return axios.get('/search?keywords=' + keywords);
}
