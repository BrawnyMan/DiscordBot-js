// Returns the mentioned user
exports.getUserFromMention = (mention) => {
  if (!mention) return;
  return mention.mentions.users.first();
};
