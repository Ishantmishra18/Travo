import User from '../models/userSchema.js';


export const addBookmark = async (req, res) => {
  const { postID } = req.params;
  const user = await User.findById(req.user.id);

  if (!user.bookmarks.includes(postID)) {
    user.bookmarks.push(postID);
    await user.save();
  }

  res.status(200).json({ message: 'Bookmarked' });
};

export const removeBookmark = async (req, res) => {
  const { postID } = req.params;
  const user = await User.findById(req.user.id);

  user.bookmarks = user.bookmarks.filter(id => id.toString() !== postID);
  await user.save();

  res.status(200).json({ message: 'Bookmark removed' });
};

export const getBookmarks = async (req, res) => {
  const user = await User.findById(req.user.id).populate('bookmarks');
  res.status(200).json(user.bookmarks);
};
