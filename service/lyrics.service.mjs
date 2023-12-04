import guitarTunings from "../utils/enums/tunings.utils.mjs";
import songKeys from "../utils/enums/keys.utils.mjs";
import genres from "../utils/enums/genres.utils.mjs";
import timeSignatures from "../utils/enums/timeSignatures.utils.mjs";
import objectHelper from "../helper/object.helper.mjs";
import chordsEnum from "../utils/enums/chords.utils.mjs";
import songRepo from "../repository/songs.repository.mjs";

const SaveSong = async (data) => {
  try {
    return await songRepo.SaveSong(data);
  } catch (e) {
    throw e.Message;
  }
};

const GetSongs = async (data) => {
  return await songRepo.GetSongList(data);
};

const GetDropDownDataForPublication = () => {
  try {
    return {
      TuningList: guitarTunings,
      songKeys: songKeys,
      timeSignatures: timeSignatures,
      genres: genres,
      capoList: GenerateCapoList(),
    };
  } catch (e) {
    throw e.Message;
  }
};

const GetSong = async (req) => {
  try {
    let songData = await songRepo.GetSong(req.body.Id);

    console.log(songData.lyrics);
    songData.lyrics = FormatLyricsToHTML(
      songData.lyrics.Lyrics,
      req.body.Transpose
    );

    return songData;
  } catch (e) {
    throw e.message;
  }
};
//#region Private Methods

const TranposeChords = (text, transpose) => {
  try {
    if (transpose > 0) {
      let newText = "";
      text.split(" ").forEach((chord) => {
        if (chord.length > 0) {
          chord = Transpose(chord, transpose);
        } else {
          chord = " ";
        }
        newText += chord;
      });
      return newText;
    }
    return text;
  } catch (e) {
    throw e.Message;
  }
};

const Transpose = (chord, transpose) => {
  try {
    let base = chord[0];
    let suffixIndex = 0;
    let suffixList = chordsEnum.chordKeysSharpDominated;

    if (
      !objectHelper.isNullOrEmpty(chord[1]) &&
      chordsEnum.chordSemiToneSuffix.includes(chord[1])
    ) {
      suffixIndex++;
      base += chord[1];
      if (chord[1] == "b") {
        suffixList = chordsEnum.chordKeysFlatDominated;
      }
    }

    let nextIndex = suffixList.indexOf(base) + transpose;
    if (nextIndex > suffixList.length - 1) {
      nextIndex = nextIndex - suffixList.length;
    }

    return suffixList[nextIndex] + chord.split(chord[suffixIndex])[1];
  } catch (e) {
    throw e.Message;
  }
};

const GenerateCapoList = (capoCount = 12) => {
  try {
    let count = 1;
    let capoList = ["No Capo"];
    while (count <= capoCount) {
      capoList.push("Fret " + count);
      count++;
    }

    return capoList;
  } catch (e) {
    throw e.Message;
  }
};

const FormatLyricsToHTML = (lyrics, transpose = 0) => {
  try {
    let isChords = true; // 0 is chords.

    let chordsLine = "";

    let finalList = "<br><br>";

    lyrics.forEach((a) => {
      if (objectHelper.isNullOrEmpty(a)) {
      } else if (isChords) {
        chordsLine = a;
        isChords = !isChords;

        chordsLine = TranposeChords(a, transpose);
      } else {
        let chordsForLyrics = chordsLine.split(" ").filter((str) => str !== "");
        let spanBuffer = 0;
        chordsForLyrics.forEach((chord) => {
          const index = chordsLine.indexOf(chord);

          chordsLine = chordsLine.replace(
            chord,
            GenerateDummyCharacter(chord.length)
          );

          const spanTheChords = GenerateSpan(chord, true);

          a = insertAt(a, index + spanBuffer, spanTheChords);
          spanBuffer += spanTheChords.length;
        });
        finalList += GenerateSpan(a) + "<br><br>";
        isChords = !isChords;
      }
    });

    return finalList;
  } catch (e) {
    throw e.Message;
  }
};

const GenerateSpan = (text, isChord = false) => {
  let htmlText = "<span";

  if (isChord) htmlText += " class = 'Chords' ";

  htmlText += ">" + text + "</span>";

  return htmlText;
};

function insertAt(string, index, substring) {
  // Using substr to get the part of the string before the index
  let prefix = string.substr(0, index);

  // Using substr again to get the part of the string after the index
  let suffix = string.substr(index);

  // Concatenating the prefix, substring, and suffix to create the new string
  let newString = prefix + substring + suffix;

  return newString;
}

function GenerateDummyCharacter(length) {
  let text = "";
  while (length > 0) {
    text += "#";
    length--;
  }

  return text;
}

const GetTopNSongs = async () => {
  return await songRepo.GetTopNForHomePage();
};
//#endregion
export default {
  SaveSong,
  GetDropDownDataForPublication,
  GetSong,
  GetSongs,
  GetTopNSongs,
};
