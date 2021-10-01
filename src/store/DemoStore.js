import {  makeObservable, action, observable } from "mobx";
import { deleteRequest, getRequest, postRequest, patchRequest } from "../helper/api";

class DemoStore {
  @observable
  name = ''
  @observable
  id=''
  @observable
  dataEdit = {
  }
  constructor(parentStore) {
    makeObservable(this);
    this.parentStore = parentStore;
  }
  @action
  setName(value){
      this.name = value
  }
  @action
  setId(value){
      this.id = value
  }
  @action
  setDataEdit(value){
    this.dataEdit = value
  }
  @action
  async product(){
    try {
      let data = getRequest(
        process.env.REACT_APP_API_AUTH_URL + '/products'
      )
      if(data){
        return data;
      }
    } catch (error) {
      
    }
  }
  @action
  async create(){
    try {
      await postRequest(
        process.env.REACT_APP_API_AUTH_URL + '/products',
        {name: this.name}
      )
    } catch (error) {
        console.log(error)
    }
    
  }
  @action
  async delete(){
      try {
          await deleteRequest(
            process.env.REACT_APP_API_AUTH_URL +  '/products/' + this.id,
          )
      } catch (error) {
          console.log(error)
      }
      this.id = ''
  }
  @action
  async edit(){
    try {
        await patchRequest(
          process.env.REACT_APP_API_AUTH_URL +  '/products/' + this.id,
          this.dataEdit
        )
    } catch (error) {
        console.log(error)
    }
}
}

  

export default DemoStore;
