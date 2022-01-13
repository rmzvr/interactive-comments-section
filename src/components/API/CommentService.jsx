import axios from "axios";

export default class CommentService {
  static async getAll() {
    try {
      const response = await axios.get("./data.json");
      return response.data.comments;
    } catch (e) {
      console.log(e);
    }
  }
}
