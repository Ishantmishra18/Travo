import Message from '../models/Message' ;

exports.sendMessage = async (req, res) => {
  const { sender, receiver, content } = req.body;
  const message = await Message.create({ sender, receiver, content });
  res.status(201).json(message);
};
