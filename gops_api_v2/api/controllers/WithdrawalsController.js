/**
 * WithdrawalsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  clientWithdrawals: async (req, res) => {
    console.log(req.query);
    let { id } = req.params;
    let withdrawals = await Withdrawals.find({ client: id }).sort([
      {
        wDate: "DESC"
      }
    ]);
    res.status(200).send(withdrawals);
  }
};
