import { EventEmitter } from "events";

class FeedStore extends EventEmitter {
  constructor() {
    super();
    this.siteprefix = "http://127.0.0.1:8000/users/";//"http://ec2-54-198-230-153.compute-1.amazonaws.com/api/";
  }

  getUsername() {
    return localStorage.getItem('username');
  }

  setUser(username) {
    localStorage.setItem('username', username);
  }

  removeModal() {
    this.emit("removemodal");
    console.log("nayy");
  }

  setFilterCategory(category, checked) {
    this.emit("changecategory", category, checked);
  }

  setToken(token){
    localStorage.setItem('token', token);
  }

  getToken()
  {
    return localStorage.getItem('token');
  }

  getsiteprefix()
  {
    return this.siteprefix;
  }
}

const feedStore = new FeedStore();
export default feedStore;
