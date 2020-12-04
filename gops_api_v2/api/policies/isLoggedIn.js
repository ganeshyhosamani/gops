module.exports = async function(req, res, proceed) {
  let { authorization } = req.headers;

  if (!authorization) return res.forbidden();
  let session = await Session.findOne({ jwt: authorization, status: "A" });

  req.userSession = session;
  //--•
  // Otherwise, this request did not come from a logged-in user.
  if (!session) return res.forbidden();
  else return proceed();
};
