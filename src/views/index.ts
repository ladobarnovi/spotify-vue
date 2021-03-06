import InitPlaylist from "./Playlist";
import InitAlbum from "./Album";
import InitArtist from "./Artist";
import InitCollection from "./Collection";
import InitDownload from "./Download";
import InitSearch from "./Search";
import InitShows from "./Show";
import InitEpisodes from "./Episode";

export default () => {
  InitPlaylist();
  InitAlbum();
  InitArtist();
  InitCollection();
  InitDownload();
  InitSearch();
  InitShows();
  InitEpisodes();
};
