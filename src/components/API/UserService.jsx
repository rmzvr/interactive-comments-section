import axios from "axios";

export default class UserService {
  static async getCurrentUser() {
    const response = await axios.get("./data.json");
    return response.data.currentUser;
  }
}
