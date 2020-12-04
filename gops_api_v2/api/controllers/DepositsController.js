/**
 * DepositsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  clientDeposits: async (req, res) => {
    console.log(req.query);
    let { id } = req.params;
    let deposits = await Deposits.find({ client: id }).sort([
      {
        dDate: "DESC"
      }
    ]);
    res.status(200).send(deposits);
  }
};
