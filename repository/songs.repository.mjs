import supabase from "../config/supabaseClient.mjs";
import ObjectHelper from "../helper/object.helper.mjs";
import responseUtils from "../utils/response.utils.mjs";
import errorMessagesUtils from "../utils/errorMessages.utils.mjs";
import errorStatusCodesUtils from "../utils/errorStatusCodes.utils.mjs";
import tableNames from "../utils/database/database.utils.mjs";
import objectHelper from "../helper/object.helper.mjs";
import SuccessMessages from "../utils/successMessages.utils.mjs";
import SuccessStatusCodes from "../utils/successStatusCodes.utils.mjs";

const SaveSong = async (item) => {
  try {
    const newLyrics = {
      lyrics: "",
      lyrics_with_chords: {
        Lyrics: item.lyrics,
      },
      created_on: new Date(),
      created_by: 2,
    };

    let lyricsResponse = await supabase
      .from(tableNames.lyrics)
      .upsert(newLyrics)
      .select();

    console.log(lyricsResponse.data.id);
    const newSong = {
      title: item.title,
      artist: item.artist,
      tuning: item.tuning,
      song_key: item.key,
      capo_position: item.capo,
      published_by: 2,
      time_signature: item.timeSignature,
      tempo: 100,
      lyrics_id: lyricsResponse.data[0].id,
      created_on: new Date(),
      created_by: 2,
      genre: item.genre,
    };

    let songsResponse = await supabase
      .from(tableNames.songs)
      .upsert(newSong)
      .select();

    return responseUtils.StructureMessage(
      SuccessStatusCodes.Created,
      SuccessMessages.created
    );
  } catch (e) {
    console.log("Inside Catch");
    console.log(e.message);
  }
};

const GetSong = async (songId) => {
  try {
    let songDetails = await supabase
      .from(tableNames.songs)
      .select()
      .eq("id", songId)
      .single();

    songDetails.hits += 1;

    const lyrics = await supabase
      .from(tableNames.lyrics)
      .select()
      .eq("id", songDetails.data.lyrics_id)
      .single();

    songDetails.data.lyrics = lyrics.data.lyrics_with_chords;

    await supabase
      .from(tableNames.songs)
      .update(songDetails)
      .eq("id", songDetails.id);

    return songDetails.data;
  } catch (e) {
    throw e.message;
  }
};

const GetSongList = async (filters) => {
  let query = supabase.from("songs").select("id,title, artist, created_on");
  console.log("Thinfs are good : " + filters.timeSignature);
  if (filters.searchText) {
    query = query.ilike("title", `${filters.searchText}%`);
  }

  if (filters.artist) {
    query = query.filter("artist", "eq", filters.artist);
  }

  if (filters.tuning) {
    query = query.filter("tuning", "eq", filters.tuning);
  }

  if (filters.songKey) {
    query = query.filter("song_key", "eq", filters.songKey);
  }

  if (filters.timeSignature) {
    query = query.filter("time_signature", "eq", filters.timeSignature);
  }

  if (filters.userId) {
    query = query.filter("published_by", "eq", filters.userId);
  }

  if (filters.capo) {
    query = query.filter("capo_position", "eq", filters.capo);
  }

  if (filters.genre) {
    query = query.filter("genre", "eq", filters.genre);
  }

  try {
    // Execute the Supabase query
    const { data, error } = await query;

    if (error) {
      console.error("Error executing query:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const GetTopNForHomePage = async (n = 10) => {
  let topHits = await supabase
    .from("songs")
    .select("id,title, artist, created_on,hits")
    .order("hits", { ascending: false })
    .limit(n);

  let recentlyUploaded = await supabase
    .from("songs")
    .select("id,title, artist, created_on,hits")
    .order("created_on", { ascending: false })
    .limit(n);

  return { tophits: topHits.data, recentlyUploaded: recentlyUploaded.data };
};

export default { SaveSong, GetSong, GetSongList, GetTopNForHomePage };
