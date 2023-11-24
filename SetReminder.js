const Reminder = require("./Model/Reminder");

async function setReminder(date, message, title, userIds) {
  let reminder = new Reminder({
    date,
    message,
    title,
    userIds,
    issent: 0,
  });
  await reminder.save();
}

module.exports = { setReminder };
