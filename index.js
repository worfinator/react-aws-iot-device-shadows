// import AWS from 'aws-sdk/dist/aws-sdk-react-native';
import { AWSIoTData } from "./aws-iot-device-sdk-js-react-native.js";

/**
 * Use this class with redux
 *
 * @param {Object} configuration
 * @return {{ AWSIoTMQTTClient }}
 * @constructor
 */
export function AWSIoTClient(configuration) {
  const self = {};
  self.service = null;
  self.callback = () => {};
  configuration.type =
    configuration.type === "shadow" ? "thingShadow" : "device";

  const config = {
    //
    // Set the AWS region we will operate in.
    //
    region: configuration.region,
    host: configuration.host,
    //
    // Connect via secure WebSocket
    //
    protocol: "wss",
    //
    // Set the maximum reconnect time to 8 seconds; this is a browser application
    // so we don't want to leave the user waiting too long for reconnection after
    // re-connecting to the network/re-opening their laptop/etc...
    //
    maximumReconnectTimeMs: 1000,
    //
    // Enable console debugging information (optional)
    //
    debug: true,
    //
    // IMPORTANT: the AWS access key ID, secret key, and sesion token must be
    // initialized with empty strings.
    //
    accessKeyId: "",
    secretKey: "",
    sessionToken: ""
  };

  if (configuration) {
    Object.assign(config, configuration);
  }

  self.connect = function(accessKeyId, secretAccessKey, sessionToken) {
    config.accessKeyId = accessKeyId;
    config.secretKey = secretAccessKey;
    config.sessionToken = sessionToken;
    self.service = AWSIoTData[config.type](config);
    self.config = config;
    self.service.on("connect", self.onConnect);
    self.service.on("reconnect", self.onReconnect);
    self.service.on("offline", self.onOffline);
    self.service.on("error", self.onError);
    self.service.on("message", self.onMessage);
    self.service.on("status", self.onStatus);
    self.service.on("delta", self.onDelta);
    self.service.on("close", self.onClose);
    self.service.on("timeout", self.onTimeout);
  };

  self.setCallback = function(callback) {
    self.callback = callback;
  };

  self.subscribe = function(topic) {
    this.service.subscribe(topic);
    self.callback({ event: "subscribe", topic: topic });
  };

  self.publish = function(topic, message) {
    device.publish(awsConfig.topic, JSON.stringify(message));
    self.callback({ event: "publish", topic: topic, message: message });
  };

  self.onConnect = function() {
    self.callback({ event: "connect" });
  };

  self.onReconnect = function() {
    self.callback({ event: "reconnect" });
  };

  self.onOffline = function() {
    self.callback({ event: "offline" });
  };

  self.onError = function(error) {
    self.callback({ event: "error", error: error });
  };

  self.onMessage = function(topic, payload) {
    const message = JSON.parse(payload);
    self.callback({ event: "message", topic: topic, message: message });
  };

  self.onStatus = function(thingId, statusType, clientToken, stateObject) {
    self.callback({
      event: "status",
      thingId: thingId,
      statusType: statusType,
      clientToken: clientToken,
      stateObject: stateObject
    });
  };

  self.onDelta = function(thingName, stateObject) {
    self.callback({
      event: "delta",
      thingName: thingName,
      stateObject: stateObject
    });
  };

  self.onClose = function() {
    self.callback({ event: "close" });
  };

  self.onTimeout = function(thingName, clientToken) {
    self.callback({
      event: "timeout",
      thingName: thingName,
      clientToken: clientToken
    });
  };

  return self;
}

export default AWSIoTClient;
