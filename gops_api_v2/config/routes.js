/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` your home page.            *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  "post /login": "SessionController.login",
  "post /me": "SessionController.me",
  "post /logout": "SessionController.logout",
  "post /createEmployee": "SessionController.createUser",

  "post /clients": "ClientsController.createClient",
  "get /updateClients": "ClientsController.updateClients",
  // "get /searchclients": "ClientsController.employeeClients",
  "get /searchclients": "ClientsController.search",
  "get /employeeClients": "ClientsController.employeeClients",
  "post /deleteClients": "ClientsController.deleteClient",

  "post /upsertpnl": "pnlController.upsertpnl",
  "get /clients/:id/pnl": "pnlController.clientspnl",
  "get /clients/:id/withdrawals": "WithdrawalsController.clientWithdrawals",
  "get /clients/:id/deposits": "DepositsController.clientDeposits"

  /***************************************************************************
   *                                                                          *
   * More custom routes here...                                               *
   * (See https://sailsjs.com/config/routes for examples.)                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the routes in this file, it   *
   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
   * not match any of those, it is matched against static assets.             *
   *                                                                          *
   ***************************************************************************/
};
