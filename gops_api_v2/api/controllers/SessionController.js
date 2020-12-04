/**
 * SessionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
module.exports = {
  login: async (req, res) => {
    let { email, password } = req.body;
    if (!password) throw "Password required ";
    if (!email) throw "Email required ";
    let bcrypt = require("bcryptjs");
    // let session = await session.find({jwt:})
    console.log(email, password);
    let employee = await Employees.findOne({
      email
    });
    console.log(employee);
    if (!employee) throw "Employee not found";
    if (bcrypt.compareSync(password, employee.passwordHash)) {
      let { firstName, lastName, email, id } = employee;
      var token = jwt.sign({ firstName, lastName, email, id }, "gturns_sec");

      let session = await Session.find({ userId: id, status: "A" });
      console.log(session.length);
      if (session.length > 0) session = session[0];

      if (!session || session.length === 0)
        session = await Session.create({
          userId: id,
          jwt: token,
          userType: "employee"
        }).fetch();

      res.status(200).send(session.jwt);
    } else {
      res.status(500).send("Login failed");
    }
  },
  logout: async (req, res) => {
    console.log(req.headers);
    let { authorization } = req.headers;
    let session = await Session.findOne({ jwt: authorization, status: "A" });
    if (session) {
      await Session.update({ jwt: authorization, status: "A" }).set({
        status: "I"
      });
      res.status(200).send("ok");
    } else res.status(500).send("not ok");
  },
  createUser: async (req, res) => {
    let { PAN, firstName, lastName, email, phone, password } = req.body;
    let bcrypt = require("bcryptjs");
    let salt = bcrypt.genSaltSync(10);
    let passwordHash = bcrypt.hashSync(password, salt);
    let employee = await Employees.create({
      PAN,
      firstName,
      lastName,
      email,
      phone,
      passwordHash
    }).fetch();
    res.send(employee);
  },
  me: async (req, res) => {
    console.log("test");
    let { authorization } = req.headers;
    let session = await Session.findOne({ jwt: authorization, status: "A" });
    console.log(session);
    if (!session) if (!session) return res.forbidden();
    let user = await Employees.findOne({ id: session.userId });
    res.status(200).send(user);
  }
};
