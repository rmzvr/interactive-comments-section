import axios from "axios";

export default class UserService {
  static async getCurrentUser() {
    try {
      const response = await axios.get("./data.json");
      return response.data.currentUser;
    } catch (e) {
      console.log(e);
    }
  }
}
