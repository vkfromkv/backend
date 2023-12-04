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
    console.log("In the Repo : " + songId);
    let songDetails = await supabase
      .from(tableNames.songs)
      .select()
      .eq("id", songId)
      .single();

    const lyrics = await supabase
      .from(tableNames.lyrics)
      .select()
      .eq("id", songDetails.data.lyrics_id)
      .single();

    songDetails.data.lyrics = lyrics.data.lyrics_with_chords;

    return songDetails.data;
  } catch (e) {
    throw e.message;
  }
};

const GetSongList = async (filters) => {
  let query = supabase.from("songs").select("title, artist, created_on");

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

  try {
    // Execute the Supabase query
    const { data, error } = await query;

    if (error) {
      console.error("Error executing query:", error);
      throw error;
    }

    // Return the list of songs

    // const formattedSongs = data.map((song) => ({
    //   title: song.title,
    //   artist: song.artist,
    //   created_on: formatCreatedOnDate(song.created_on),
    // }));
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

async function formatCreatedOnDate(date) {
  // Check if the date is an object and convert it to a string
  if (typeof date === "object" && date !== null) {
    const formattedDate = new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));

    // Extract the day suffix (e.g., 'th', 'st', 'nd', 'rd')
    const daySuffix = formattedDate.match(/\d{1,2}(st|nd|rd|th)/)[0];

    // Replace the day in the formatted date with the day and suffix
    return formattedDate.replace(/\d{1,2}/, `$&${daySuffix}`);
  }

  // If the date is already a string, return it directly
  if (typeof date === "string") {
    return date;
  }

  // If the date is neither an object nor a string, return an empty string or handle as needed
  return "";
}

export default { SaveSong, GetSong, GetSongList };
