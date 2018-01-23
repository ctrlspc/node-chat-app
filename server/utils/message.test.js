const expect = require('expect');
var {generateMessage,generateLocationMessage} = require("./message");



describe('generateMessage', () => {
  it('should generate correct message object', () => {

    var from = 'testUser';
    var text = 'This is a test'
    var message = generateMessage(from, text);

    expect(message.from).toBe(from);
    expect(message.text).toBe(text);
    expect(typeof message.createdAt).toBe('number');
  })


})

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = 'testUser';
    var latitude = '1'
    var longitude = '2'
    var message = generateLocationMessage(from, latitude, longitude);

    expect(message.from).toBe(from);
    expect(message.url).toBe(`https://www.google.com/maps?q=${latitude},${longitude}`);
    expect(typeof message.createdAt).toBe('number');
  })
})
