const express = require("express");
const venom = require("venom-bot");

const app = express();
app.use(express.json());

const router = express.Router();

let venomClient;

venom
  .create("gustavo-airton")
  .then(
    (client) =>
      function () {
        venomClient = client;
      }
  )
  .catch((erro) => {
    console.log(erro);
  });

function sendLead(name, email, phone, campaign) {
  venomClient.sendText(
    "555198189590@c.us",
    "*NOVO LEAD - [" +
      campaign +
      "]*\n\n*Nome:* " +
      name +
      "\n*Telefone:* " +
      phone +
      "\n*E-mail:* " +
      email +
      "\n\nhttps://wa.me/" +
      phone
  );
}

router.post("/notifylead", (req, res) => {
  let campaign = req.body.campaign;
  let name = req.body["name"];
  let email = req.body["email"];
  let phone = req.body["phone"];

  sendLead(name, email, phone, campaign);
  console.log(req.body);

  res.json({
    hello: "success!",
  });
});

app.use(`/whook`, router);

console.log("teste");

app.listen(3000, () => {
  console.log(`Example app listening on port ${3000}`);
});
