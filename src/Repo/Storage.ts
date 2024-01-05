import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 as uuid } from "uuid";

export interface Image {
  id: string;
  url?: string;
}

const storage = getStorage();

export const uploadImage = async (uid: string, file: File) => {
  console.log("upload image", file);
  console.log("file name", file.name);

  const fileId = uuid();
  const storageRef = ref(storage, `events/${uid}/${fileId}`);
  const result = await uploadBytes(storageRef, file);
  console.log("result", result);

  // return result.ref.toString();

  const url = await getDownloadURL(result.ref);
  console.log("url", url);
  return {
    id: result.ref.toString(),
    url,
  };
};
