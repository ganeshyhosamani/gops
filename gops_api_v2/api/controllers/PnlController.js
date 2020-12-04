/**
 * PnlController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  upsertpnl: async (req, res) => {
    let { client, profit, profitDate } = req.body;
    let pnl = await Pnl.find({ profitDate, client });
    console.log(pnl);
    console.log(pnl.length);
    if (pnl.length == 0) {
      let npnl = await Pnl.create({ client, profit, profitDate });
      res.send("ok");
      return;
    }
    if (pnl.length == 1) {
      let upnl = await Pnl.update({
        client,
        profitDate
      }).set({ profit });
      res.send("ok");
      return;
    }
    res.status(500).send({ client, profit, profitDate });
  },
  clientspnl: async (req, res) => {
    console.log(req.query);
    let { id } = req.params;
    let pnl = await Pnl.find({ client: id }).sort([{ profitDate: "DESC" }]);
    res.status(200).send(pnl);
  }
};
