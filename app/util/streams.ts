/* eslint-disable import/no-commonjs */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line import/no-nodejs-modules
import type { Transform } from 'stream';

const Through = require('through2');
const ObjectMultiplex = require('@metamask/object-multiplex');
const pump = require('pump');

/**
 * Returns a stream transform that parses JSON strings passing through
 *
 * @returns The stream transform
 */
function jsonParseStream(): Transform {
  return Through.obj(function (serialized: string, _: unknown, cb: () => void) {
    this.push(JSON.parse(serialized));
    cb();
  });
}

/**
 * Returns a stream transform that calls JSON.stringify
 * on objects passing through
 *
 * @returns The stream transform
 */
function jsonStringifyStream(): Transform {
  return Through.obj(function (obj: unknown, _: unknown, cb: () => void) {
    this.push(JSON.stringify(obj));
    cb();
  });
}

/**
 * Sets up stream multiplexing for the given stream
 *
 * @param connectionStream - The stream to mux
 * @returns The multiplexed stream
 */
function setupMultiplex(connectionStream: Transform): typeof ObjectMultiplex {
  const mux = new ObjectMultiplex();
  pump(connectionStream, mux, connectionStream, (err: Error | null) => {
    if (err) {
      console.warn(err);
    }
  });
  return mux;
}

export { jsonParseStream, jsonStringifyStream, setupMultiplex };
