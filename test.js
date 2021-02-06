const yts = require("yt-search");
const ytdl = require("ytdl-core");
async function get(){
    const songInfo = await ytdl.getInfo("https://www.youtube.com/watch?v=pdoNCsq0KUc");
    console.log(songInfo.videoDetails.thumbnails[1].url)
    // const search = await yts("Thien dang");
    // const videos = search.videos.slice(0, 10);

    // videos.forEach((v) =>{
    //     console.log(v);
    // })
}
get()