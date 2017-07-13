/**
 * Created by kamalkant on 12/07/17.
 */
export default class Auth {
  constructor() {
    this.setObjectData = this.setObjectData.bind(this);
    this.getObjectData = this.getObjectData.bind(this);
  }

  setObjectData(key, data) {
    localStorage.setItem(key, data);
  }

  getObjectData(key) {
    const data = localStorage.getItem(key);
    if (!data) {
      throw new Error('No access token found');
    }
    return data;
  }

  /*import ObjectStorage from '../../LocalStorage/ObjectStorage';
  const storage = new ObjectStorage();*/
  //storage.setObjectData(`OBJECT_DATA`, JSON.stringify(objectArray));

}

