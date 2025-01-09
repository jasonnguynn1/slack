require("dotenv").config();
const { App } = require("@slack/bolt");
const { WebClient } = require("@slack/web-api");
const schedule = require("node-schedule");

// Khởi tạo ứng dụng Slack với token và signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN, // Bot Token từ Slack
  signingSecret: process.env.SLACK_SIGNING_SECRET, // Signing Secret từ Slack
});

const client = new WebClient(process.env.SLACK_BOT_TOKEN);

(async () => {
  try {
    const response = await client.conversations.list();
    console.log("Danh sách kênh:", response.channels);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách kênh:", error);
  }
})();

// Tạo nhắc nhở vào thời gian cụ thể
// const scheduleReminder = (channelId, message, delayInMs) => {
//   setTimeout(async () => {
//     try {
//       await app.client.chat.postMessage({
//         channel: channelId,
//         text: message,
//       });
//       console.log("Đã gửi nhắc nhở!");
//     } catch (error) {
//       console.error("Lỗi gửi nhắc nhở:", error);
//     }
//   }, delayInMs);
// };

app.message("hello", async ({ message, say }) => {
  await say(`Chào, <@${message.user}>! Chúc bạn có một ngày tốt lành`);
});

app.message("hi", async ({ message, say }) => {
    await say(`Chào, <@${message.user}>! Chúc bạn có một ngày tốt lành`);
});

app.event("member_joined_channel", async ({ event, client }) => {
  // Kiểm tra nếu bot là người mới gia nhập kênh
  const info = await client.users.list();
  const user = info.members.find(
    (member) =>
      member.real_name === "farm_manager" || member.name === "farm_manager"
  );
  if (user?.id && event.user === user?.id) {
    try {
      // Gửi tin nhắn chào mọi người trong kênh
      await client.chat.postMessage({
        channel: event.channel,
        text: `Chào mọi người! Tôi đến đây để nhắc mọi người đi ăn đúng giờ. Rất vui được làm quen với các bạn! 😊`,
      });
      console.log("Đã gửi tin nhắn chào thành công!");
    } catch (error) {
      console.error("Lỗi khi gửi tin nhắn chào:", error);
    }
  }
});

schedule.scheduleJob("30 12 * * *", async () => {
  try {
    await app.client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel: "C087WGGBKV1",
      text: "Đến giờ ăn rồi! Đi ăn đi mọi người ơi 😊",
    });
    console.log("Đã gửi tin nhắn tự động thành công!");
  } catch (error) {
    console.error("Lỗi khi gửi tin nhắn tự động:", error);
  }
});

// Khởi chạy ứng dụng
(async () => {
  await app.start(process.env.PORT || 3000);
  console.log("Bot đã sẵn sàng trên cổng 3000!");
})();
