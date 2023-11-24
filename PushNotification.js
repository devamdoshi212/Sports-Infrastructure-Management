module.exports.sendPushNotification = async function (
  userToken,
  title,
  message
) {
  const apiKey =
    "AAAAxGjomac:APA91bFuvy95E9m2mlpMK_YRulJq9-eGSHpltp9LvT9vhsBAd-EVAQwKOSLDAivPqgeio51lmFTn-ibHHZbG37vWo-DbadhExtyY_fpHnhOJYMrFHpWm51_BcWcOdD0psM0zYp84JrQg";
  const fcmEndpoint = "https://fcm.googleapis.com/fcm/send";

  const notificationMessage = {
    registration_ids: userToken,
    notification: {
      title,
      body: message,
    },
  };

  let response = await fetch(fcmEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "key=" + apiKey,
    },
    body: JSON.stringify(notificationMessage),
  });
  let data = await response.json();
  console.log(data);
};
// module.exports = sendPushNotification;
