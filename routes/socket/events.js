
// 'use strict';
const Message = require("../../models/index").Message;




exports.newMessage = async (message) => {
  try {
    await Message.create(message);
  } catch (error) {
    console.error(error);
  }
};
