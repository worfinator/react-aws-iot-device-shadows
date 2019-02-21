import AWSIoTClient from "react-aws-iot-device-shadows";

const config = {
  type: "device",
  region: "us-west-2",
  host: "yourserver-ats.iot.us-west-2.amazonaws.com",
  AccessKeyId: "yourAccessKey",
  SecretAccessKey: "yourSecretKey",
  SessionToken: "aValidSessionToken"
};

class AWSIot {
  constructor() {
    this.config = config;
    this.client = AWSIoTClient(config);
    this.event = AWSIoTClient.event;
  }

  init() {
    this.connect();
    this.client.setCallback(this.processEvent);
    // normal message channel
    this.subscribe("yourTopic");
    // Device/Thing update accepted channel
    this.subscribe(`$aws/things/yourThingName/shadow/update/accepted`);
  }

  processEvent(event) {
    console.log(event);
  }

  connect() {
    this.client.connect(
      this.config.AccessKeyId,
      this.config.SecretAccessKey,
      this.config.SessionToken
    );
  }

  subscribe(topic) {
    this.client.subscribe(topic);
  }

  publish(topic, message) {
    this.client.publish(topic, message);
  }
}

export default new AWSIot();

// User AWSIot.init(); to create a new instance in you App.js
// Then AWSIot.connect(); To start the connection.

// Create your logic in processEvent to handle the various events
// Store the results somewhere in the constructor for access outside
