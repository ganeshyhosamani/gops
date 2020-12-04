/**
 * ClientsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  createClient: async (req, res) => {
    let { PAN, bc, credentials, firstName, lastName, email, phone } = req.body;

    let client = await Clients.create({
      firstName,
      lastName,
      email,
      phone,
      PAN,
      apfw: 0,
      bc,
      additions: 0,
      pnl: 0,
      bnc: 0,
      withdrawals: 0,
      ec: 0
    }).fetch();
    let account = await Accounts.create({
      client: client.id,
      credentials
    }).fetch();

    return res.status(201).send({ account, client });
  },
  search: async (req, res) => {
    let { key } = req.query;

    var clients = await Clients.find({
      or: [{ firstName: { contains: key } }, { lastName: { contains: key } }]
    }).meta({ makeLikeModifierCaseInsensitive: true });

    return res.status(200).send(clients);
  },
  employeeClients: async (req, res) => {
    let { key } = req.query;

    // var clients = await Clients.find({
    //   or: [{ firstName: { contains: key } }, { lastName: { contains: key } }]
    // }).meta({ makeLikeModifierCaseInsensitive: true });
    if (!key) key = "";
    console.log(req.userSession);
    let e = await EmployeeClients.find({
      employee: req.userSession.userId
    }).populate("client");

    return res.status(200).send(
      e
        .map(e => e.client)
        .filter(c => {
          return (
            c.firstName.toLowerCase().includes(key.toLowerCase()) ||
            c.lastName.toLowerCase().includes(key.toLowerCase()) ||
            c.email.toLowerCase().includes(key.toLowerCase())
          );
        })
    );
  },
  deleteClient: async (req, res) => {
    let { clientId, employeeId } = req.body;
    if (!clientId) throw "client id missing";
    console.log(req.userSession, clientId, req.userSession.userId);
    var deleted = await EmployeeClients.destroyOne({
      client: clientId,
      employee: employeeId
    });

    if (deleted) {
      return res.status(200).send();
    } else {
      return res.status(500).send();
    }
  },
  updateClients: async (req, res) => {
    let clients = await Clients.find();
    // console.log(clients);
    let result = await Promise.all(
      clients.map(async c => {
        console.log(c.email);
        // Update withdrawals
        let withdrawals = await Withdrawals.find({ client: c.id });
        let deposits = await Deposits.find({ client: c.id });
        let r = {
          total_withdrawals: await withdrawals
            .map(w => w.ammount)
            .reduce((a, b) => a + b, 0),
          total_deposits: await deposits
            .map(d => d.ammount)
            .reduce((a, b) => a + b, 0)
        };

        let a = await Clients.update({
          id: c.id
        }).set({
          withdrawals: r.total_withdrawals,
          additions: r.total_deposits
        });
        console.log(a);
        return;
      })
    );
    return res.status(200).send(result);
  }
};
