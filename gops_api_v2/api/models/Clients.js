/**
 * Clients.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    firstName: { type: "string", required: true },
    lastName: { type: "string" },
    email: { type: "string", required: true, unique: true },
    phone: { type: "string", required: true, unique: true },
    PAN: { type: "string", required: true, unique: true },

    status: { type: "string", defaultsTo: "A" },
    apfw: { type: "number" }, //Available profit for withdraw
    bc: { type: "number" }, //Beginning Capital
    additions: { type: "number" }, //Additions
    pnl: { type: "number" },
    bnc: { type: "number" }, //Brokerage and charges
    withdrawals: { type: "number" },
    ec: { type: "number" }, //Ending Capital

    employees: {
      collection: "employees",
      via: "client",
      through: "employeeclients"
    },
    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    accounts: {
      collection: "accounts",
      via: "client"
    }
  }
};
