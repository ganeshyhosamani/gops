import React, { Component } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket(
  "wss://ws.zerodha.com/?api_key=kitefront&user_id=ZD3352&enctoken=bqgqmr1%2B0SnMcc2J0xZLkDUQtXmfrxXd3fxqJDoJpWPVivvms4Fkw9LGiz92SjU%2F1NyJ716hyJgUVe1r3oocxxH4tXLYsQ%3D%3D&uid=1603862496447&user-agent=kite3-web&version=2.6.1"
);
client.binaryType = "arraybuffer";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tokens: []
    };
  }
  componentWillMount() {
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    client.onmessage = async message => {
      // const text = await message.data.text();

      let blob = message.data;

      // var instrument_token = blob.slice(0, 4, 'int32')
      // var ltp = blob.slice(4, 8, 'int32')
      // var instrument_token = blob.slice(8, 12, 'int32')
      console.log(blob);
      console.log(blob.byteLength);
      console.log(parseBinary(blob));
      if (blob.byteLength > 1) this.setState({ tokens: parseBinary(blob) });
    };
  }

  render() {
    return (
      <div
        onClick={() => {
          client.send(
            JSON.stringify({
              a: "subscribe",
              v: [256265]
            })
          );
        }}
      >
        Practical Intro To WebSockets.
        <br />
        {JSON.stringify(this.state.tokens)}
      </div>
    );
  }
}

export default App;
var NseCM = 1,
  NseFO = 2,
  NseCD = 3,
  BseCM = 4,
  BseFO = 5,
  BseCD = 6,
  McxFO = 7,
  McxSX = 8,
  Indices = 9;
var read_timeout = 5, // seconds
  reconnect_max_delay = 0,
  reconnect_max_tries = 0,
  // message flags (outgoing)
  mSubscribe = "subscribe",
  mUnSubscribe = "unsubscribe",
  mSetMode = "mode",
  // incoming
  mAlert = 10,
  mMessage = 11,
  mLogout = 12,
  mReload = 13,
  mClearCache = 14,
  // public constants
  modeFull = "full", // Full quote including market depth. 164 bytes.
  modeQuote = "quote", // Quote excluding market depth. 52 bytes.
  modeLTP = "ltp";

// split one long binary message into individual tick packets
function splitPackets(bin) {
  // number of packets
  var num = buf2long(bin.slice(0, 2)),
    j = 2,
    packets = [];
  // console.log("bin");
  // console.log(bin);
  // console.log(num);
  for (var i = 0; i < num; i++) {
    // first two bytes is the packet length
    var size = buf2long(bin.slice(j, j + 2)),
      packet = bin.slice(j + 2, j + 2 + size);

    packets.push(packet);

    j += 2 + size;
  }

  return packets;
}

function buf2long(buf) {
  var b = new Uint8Array(buf),
    val = 0,
    len = b.length;

  for (var i = 0, j = len - 1; i < len; i++, j--) {
    val += b[j] << (i * 8);
  }

  return val;
}

function parseBinary(binpacks) {
  var packets = splitPackets(binpacks),
    ticks = [];

  for (var n = 0; n < packets.length; n++) {
    var bin = packets[n],
      instrument_token = buf2long(bin.slice(0, 4)),
      segment = instrument_token & 0xff;

    var tradable = true;
    if (segment === Indices) tradable = false;

    var divisor = 100.0;
    if (segment === NseCD) divisor = 10000000.0;

    // Parse LTP
    if (bin.byteLength === 8) {
      ticks.push({
        tradable: tradable,
        mode: modeLTP,
        instrument_token: instrument_token,
        last_price: buf2long(bin.slice(4, 8)) / divisor
      });
      // Parse indices quote and full mode
    } else if (bin.byteLength === 28 || bin.byteLength === 32) {
      var mode = modeQuote;
      if (bin.byteLength === 32) mode = modeFull;

      var tick = {
        tradable: tradable,
        mode: mode,
        instrument_token: instrument_token,
        last_price: buf2long(bin.slice(4, 8)) / divisor,
        ohlc: {
          high: buf2long(bin.slice(8, 12)) / divisor,
          low: buf2long(bin.slice(12, 16)) / divisor,
          open: buf2long(bin.slice(16, 20)) / divisor,
          close: buf2long(bin.slice(20, 24)) / divisor
        },
        change: buf2long(bin.slice(24, 28))
      };

      // Compute the change price using close price and last price
      if (tick.ohlc.close != 0) {
        tick.change =
          ((tick.last_price - tick.ohlc.close) * 100) / tick.ohlc.close;
      }

      // Full mode with timestamp in seconds
      if (bin.byteLength === 32) {
        tick.timestamp = null;
        var timestamp = buf2long(bin.slice(28, 32));
        if (timestamp) tick.timestamp = new Date(timestamp * 1000);
      }

      ticks.push(tick);
    } else if (bin.byteLength === 44 || bin.byteLength === 184) {
      var mode = modeQuote;
      if (bin.byteLength === 184) mode = modeFull;

      var tick = {
        tradable: tradable,
        mode: mode,
        instrument_token: instrument_token,
        last_price: buf2long(bin.slice(4, 8)) / divisor,
        last_quantity: buf2long(bin.slice(8, 12)),
        average_price: buf2long(bin.slice(12, 16)) / divisor,
        volume: buf2long(bin.slice(16, 20)),
        buy_quantity: buf2long(bin.slice(20, 24)),
        sell_quantity: buf2long(bin.slice(24, 28)),
        ohlc: {
          open: buf2long(bin.slice(28, 32)) / divisor,
          high: buf2long(bin.slice(32, 36)) / divisor,
          low: buf2long(bin.slice(36, 40)) / divisor,
          close: buf2long(bin.slice(40, 44)) / divisor
        }
      };

      // Compute the change price using close price and last price
      if (tick.ohlc.close != 0) {
        tick.change =
          ((tick.last_price - tick.ohlc.close) * 100) / tick.ohlc.close;
      }

      // Parse full mode
      if (bin.byteLength === 184) {
        // Parse last trade time
        tick.last_trade_time = null;
        var last_trade_time = buf2long(bin.slice(44, 48));
        if (last_trade_time)
          tick.last_trade_time = new Date(last_trade_time * 1000);

        // Parse timestamp
        tick.timestamp = null;
        var timestamp = buf2long(bin.slice(60, 64));
        if (timestamp) tick.timestamp = new Date(timestamp * 1000);

        // Parse OI
        tick.oi = buf2long(bin.slice(48, 52));
        tick.oi_day_high = buf2long(bin.slice(52, 56));
        tick.oi_day_low = buf2long(bin.slice(56, 60));
        tick.depth = {
          buy: [],
          sell: []
        };

        var s = 0,
          depth = bin.slice(64, 184);
        for (var i = 0; i < 10; i++) {
          s = i * 12;
          tick.depth[i < 5 ? "buy" : "sell"].push({
            quantity: buf2long(depth.slice(s, s + 4)),
            price: buf2long(depth.slice(s + 4, s + 8)) / divisor,
            orders: buf2long(depth.slice(s + 8, s + 10))
          });
        }
      }

      ticks.push(tick);
    }
  }

  return ticks;
}
