const expect = require('expect');

const {Users} = require('./users');


var seedUsers;

var populateSeedUsers = () => {
  seedUsers = new Users();

  seedUsers.users = [
    {
      id:'1',
      name:'testUserOne',
      room:'testRoomOne'
    },
    {
      id:'2',
      name:'testUserTwo',
      room:'testRoomOne'
    },
    {
      id:'3',
      name:'testUserThree',
      room:'testRoomTwo'
    }
  ];
};

describe('Users', () => {


  describe('Users.addUser(id,name,room)', () => {

    it('Should add a new user', () => {
      var testUser = {
        id:'123',
        name:'testUser',
        room:'testRoom'
      };

      var users = new Users();

      users.addUser(testUser.id, testUser.name, testUser.room);

      expect(users.users[0]).toEqual(testUser);


    });
  });

  describe('Users.getUserList(room)', () => {
    beforeEach(() => {
      populateSeedUsers();
    });

    it('Should return testRoomOne Users', () => {
      var testUsers = seedUsers.getUserList('testRoomOne');
      expect(testUsers).toEqual(['testUserOne','testUserTwo']);
    });

    it('Should return testRoomTwo Users', () => {
      var testUsers = seedUsers.getUserList('testRoomTwo');
      expect(testUsers).toEqual(['testUserThree']);
    });
  });

  describe('Users.removeUser(id)', () => {
    beforeEach(() => {
      populateSeedUsers();
    });

    it('Should remove a user with a valid id', () => {
      var removedUser = seedUsers.removeUser('1');

      expect(seedUsers.users).toEqual([{
        id:'2',
        name:'testUserTwo',
        room:'testRoomOne'
      },
      {
        id:'3',
        name:'testUserThree',
        room:'testRoomTwo'
      }])

      expect(removedUser).toEqual({
        id:'1',
        name:'testUserOne',
        room:'testRoomOne'
      });
    });

    it('Should not remove a user with an invalid id', () => {
      var removedUser = seedUsers.removeUser('123');

      expect(seedUsers.users).toEqual([{
        id:'1',
        name:'testUserOne',
        room:'testRoomOne'
      },
      {
        id:'2',
        name:'testUserTwo',
        room:'testRoomOne'
      },
      {
        id:'3',
        name:'testUserThree',
        room:'testRoomTwo'
      }]);

      expect(removedUser).toBeFalsy();
    });


  });

  describe('Users.getUser(id)', () => {

    it('Should get a user with a valid id', () => {
      var foundUser = seedUsers.getUser(seedUsers.users[0].id);
      expect(foundUser).toEqual(seedUsers.users[0]);
    });

    it('Should not get a user with an invalid id', () => {
      var foundUser = seedUsers.getUser('123');
      expect(foundUser).toBeFalsy();
    });
  });
});
