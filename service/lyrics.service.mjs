import guitarTunings from "../utils/enums/tunings.utils.mjs";
import songKeys from "../utils/enums/keys.utils.mjs";
import timeSignatures from "../utils/enums/timeSignatures.utils.mjs";

const SaveSong = (data) => {
  try {
    console.log(data.lyrics);
  } catch (e) {
    throw e.Message;
  }
};

const GetDropDownDataForPublication = () => {
  try {
    //Get Tuning

    return {
      TuningList: guitarTunings,
      songKeys: songKeys,
      timeSignatures: timeSignatures,
      capoList: GenerateCapoList(),
    };
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

export default { SaveSong, GetDropDownDataForPublication };
