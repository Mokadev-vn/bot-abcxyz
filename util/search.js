
const yts = require("yt-search");
module.exports = async function(string){
    const search = await yts(string);
    const videos = search.videos.slice(0, 10);
    return videos;
}