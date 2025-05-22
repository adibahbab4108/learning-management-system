import axios from "axios";

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);
  try {
    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbbAPI}`,
      formData
    );
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
