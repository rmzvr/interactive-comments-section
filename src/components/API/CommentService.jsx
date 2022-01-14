import axios from "axios";

export default class CommentService {
  static async getAll() {
    const response = await axios.get("./data.json");
    return response.data.comments;
  }
}
