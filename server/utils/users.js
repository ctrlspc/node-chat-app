const _ = require('lodash');

class Users {
  constructor () {
    this.users = []
  }

  addUser(id, name, room) {
    var user = {id,name,room};
    this.users.push(user);
    return user;
  }

  getUserList(room){
    var users = this.users.filter((user) => user.room === room);
    return users.map((user) => user.name);
  }

  removeUser(id){
    //return removed user
    var removeUser = this.getUser(id);

    if (removeUser) {
      this.users = this.users.filter((user)=> user.id !== id);
      return removeUser;
    }
  }

  getUser(id){
    return this.users.filter((user)=> user.id === id)[0];
  }

  getRooms(){
    return _.uniq(this.users.map((user) => user.room));
  }
}

module.exports = {Users};
