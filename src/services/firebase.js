import * as firebase from "firebase";
import { firebaseConfig } from "../configs/firebase";

let instance = null;

class FirebaseService {
  constructor() {
    if (!instance) {
      this.app = firebase.initializeApp(firebaseConfig);
      instance = this;
    }
    return instance;
  }
}

export default new FirebaseService().app;

const { TIMESTAMP } = firebase.database.ServerValue;

export { TIMESTAMP };
