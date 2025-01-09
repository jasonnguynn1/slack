require("dotenv").config();
const { App } = require("@slack/bolt");
const { WebClient } = require("@slack/web-api");
const schedule = require("node-schedule");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN, // Bot Token từ Slack
  signingSecret: process.env.SLACK_SIGNING_SECRET, // Signing Secret từ Slack
});

const client = new WebClient(process.env.SLACK_BOT_TOKEN);

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
  try {
    const info = await client.users.list();
    const user = info.members.find(
      (member) =>
        (member.real_name && member.real_name.toLowerCase() === "farm_manager") ||
        (member.name && member.name.toLowerCase() === "farm_manager")
    );
  
    if (user?.id && message.text.includes(`<@${user.id}>`)) {
      await say(`Chào, <@${message.user}>! Chúc bạn có một ngày tốt lành`);
    }
  } catch (err) {
    console.log("Error:", err);
  }
});

// app.event("member_joined_channel", async ({ event, client }) => {
//   const info = await client.users.list();
//   const user = info.members.find(
//     (member) =>
//       member.real_name === "farm_manager" || member.name === "farm_manager"
//   );
//   if (user?.id && event.user === user?.id) {
//     try {
//       await client.chat.postMessage({
//         channel: event.channel,
//         text: `Chào mọi người! Tôi đến đây để nhắc mọi người đi ăn đúng giờ. Rất vui được làm quen với các bạn! 😊`,
//       });
//       console.log("Đã gửi tin nhắn chào thành công!");
//     } catch (error) {
//       console.error("Lỗi khi gửi tin nhắn chào:", error);
//     }
//   }
// });

schedule.scheduleJob("30 12 * * *", async () => {
  try {
    const response = await client.conversations.list({
      types: "public_channel, private_channel",
    });
    console.log(response);
    const channel = response.channels.find(
      (channel) => channel.name === "nông-trại"
    );

    if (channel.id) {
      await app.client.chat.postMessage({
        token: process.env.SLACK_BOT_TOKEN,
        channel: channel.id,
        text: "Đến giờ ăn rồi! Đi ăn đi mọi người ơi 😊",
      });
      console.log("Đã gửi tin nhắn tự động thành công!");
    }
  } catch (error) {
    console.error("Lỗi khi gửi tin nhắn tự động:", error);
  }
});

schedule.scheduleJob("00 15 * * *", async () => {
  try {
    const response = await client.conversations.list({
      types: "public_channel, private_channel",
    });
    console.log(response);
    const channel = response.channels.find(
      (channel) => channel.name === "nông-trại"
    );

    if (channel.id) {
      await app.client.chat.postMessage({
        token: process.env.SLACK_BOT_TOKEN,
        channel: channel.id,
        text: "Uống trà sữa/ cafe không mọi người 😊",
      });
      console.log("Đã gửi tin nhắn tự động thành công!");
    }
  } catch (error) {
    console.error("Lỗi khi gửi tin nhắn tự động:", error);
  }
});

schedule.scheduleJob("00 18 * * *", async () => {
  try {
    const response = await client.conversations.list({
      types: "public_channel, private_channel",
    });
    console.log(response);
    const channel = response.channels.find(
      (channel) => channel.name === "nông-trại"
    );

    if (channel.id) {
      await app.client.chat.postMessage({
        token: process.env.SLACK_BOT_TOKEN,
        channel: channel.id,
        text: "VỀ ĐÊ!",
      });
      console.log("Đã gửi tin nhắn tự động thành công!");
    }
  } catch (error) {
    console.error("Lỗi khi gửi tin nhắn tự động:", error);
  }
});

schedule.scheduleJob("00 10 * * *", async () => {
  try {
    const response = await client.conversations.list({
      types: "public_channel, private_channel",
    });
    console.log(response);
    const channel = response.channels.find(
      (channel) => channel.name === "nông-trại"
    );

    if (channel.id) {
      await app.client.chat.postMessage({
        token: process.env.SLACK_BOT_TOKEN,
        channel: channel.id,
        text: "Chúc mọi người một ngày làm việc năng suất 😊",
      });
      console.log("Đã gửi tin nhắn tự động thành công!");
    }
  } catch (error) {
    console.error("Lỗi khi gửi tin nhắn tự động:", error);
  }
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log("Bot đã sẵn sàng trên cổng 3000!");
})();
