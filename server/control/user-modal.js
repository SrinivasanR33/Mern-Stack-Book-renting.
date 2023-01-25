const user = require("../modal/modal-book");
var nodemailer = require("nodemailer");
var cron = require("node-cron");
// SendUser = async (req, res) => {
//   const body = req.body;
//   var transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "vasan4649@gmail.com",
//       pass: "ggrrhnpgbneyjsmo",
//     },
//   });

//   var mailOptions = {
//     from: "vasan4649@gmail.com",
//     to: body.email,
//     subject: body.subject,
//     text: body.text,
//   };

//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("Email sent: " + info.response);
//     }
//   });
// };
const task = cron.schedule("15 10 * * * *", () => {
  // Getting the time in hh:mm:ss am/pm format
  var time = new Date().toLocaleTimeString();

  // Printing the string to the console
  console.log(`The task is run and the time is ${time}`);
});
SendUser = (req, res) => {
  // cron.schedule(" 1,0 * * * *", () => {
  const transporter = nodemailer.createTransport({
    name: "SMTP_HOST",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    // service:"gmail",
    auth: {
      user: "vasan4649@gmail.com",
      pass: "fganvtrkzhjzpxhs",
    },
    tls: {
      ciphers: "SSLv3",
    },
  });
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
      return transporter
        .sendMail(req.body)
        .then((info) => {
          console.log(`Message sent: ${info.response}`);
          return res.json({
            success: true,
          });
        })
        .catch((err) => console.log(`Problem sending email: ${err}`));
    }
  });
  console.log("running a task every minute");
  // });
};
GetUser = async (req, res) => {
  await user.userlog
    .find({}, (err, log) => {
      if (err) {
        return res
          .status(400)
          .json({ success: false, error: "User not in the list" });
      }
      if (!log.length) {
        return res
          .status(404)
          .json({ success: false, error: "Page not found" });
      }
      return res.status(200).json({ success: true, data: log });
    })
    .catch((err) => console.log(err));
};
searchUser = async (req, res) => {
  const body = req.body;
  await user.userlog
    .find(body, (err, log) => {
      if (err) {
        return res
          .status(200)
          .json({ success: false, massage: "User not in the list" });
      }
      if (log.length > 0) {
        return res.status(200).json({ success: true, data: log });
      } else {
        return res.status(200).json({ success: false, data: [] });
      }
    })
    .catch((err) => console.log(err));
};
createUser = async (req, res) => {
  const body = req.body;
  const customer = new user.userlog(body);
  await customer
    .save()
    .then((use) => {
      return res.status(201).json({
        success: true,
        data: use,
        message: "UserCreated",
      });
    })
    .catch((err) => {
      if (err) {
        return res
          .status(400)
          .json({ success: false, error: "User not created" });
      }
    });
};
deleteUser = async (req, res) => {
  const body = req.body;
  console.log(body);
  await user.userlog
    .findOneAndDelete({ _id: req.body.id }, (err, user) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }

      if (!user) {
        return res
          .status(404)
          .json({ success: false, error: `User not found` });
      }

      return res
        .status(200)
        .json({ success: true, message: "Deleted Successfully", data: user });
    })
    .catch((err) => console.log(err));
};
module.exports = {
  GetUser,
  createUser,
  searchUser,
  deleteUser,
  SendUser,
  task,
};
