# react-aws-iot-device-shadows

React Class wrapper for connecting to AWS IoT from a device using SDK JavaScript bundle ported from [JamesJara's React Native Component](https://www.npmjs.com/package/react-native-aws-iot-device-shadows)

Allows developers to use the AWS IOT shadow support from a React class.

- [Overview](#overview)
- [Installation](#install)
- [Example](#example)
- [API Documentation](#api)
- [Connection Types](#connections)
- [AWS bundle](#bundle)
- [Unit Tests](#unittests)
- [License](#license)
- [Support](#support)

<a name="overview"></a>

## Overview

This document provides instructions on how to install and configure the AWS
IoT device/Shadow in React.

### AWS SDK Dependency

This package is built on top of the AWS SDK [aws-sdk.js](https://github.com/aws/aws-iot-device-sdk-js) which provides two classes: 'device'
and 'thingShadow'.

#### Thing Shadows

The 'thingShadow' class implements additional functionality for accessing Thing Shadows via the AWS IoT
API; the thingShadow class allows devices to update, be notified of changes to,
get the current state of, or delete Thing Shadows from AWS IoT. Thing
Shadows allow applications and devices to synchronize their state on the AWS IoT platform.

#### Device

The 'device' class wraps [mqtt.js](https://github.com/mqttjs/MQTT.js/blob/master/README.md) to provide a
secure connection to the AWS IoT platform and expose the [mqtt.js](https://github.com/mqttjs/MQTT.js/blob/master/README.md) interfaces upward. It provides features to simplify handling of intermittent connections, including progressive backoff retries, automatic re-subscription upon connection, and queued offline publishing with configurable drain rate.

<a name="install"></a>

## Installation

Installing with npm:

```sh
npm install react-aws-iot-device-shadows
```

## Example

[./example/awsIOT.js](./example/awsIOT.js) - React Class example to serve as a Data Service within a React Application.

```js
import AWSIot from "./example/awsIOT";

/* 
   Initialise service object, creates a
   connection and subscribes to topics 
*/
AWSIot.init();

// Publish a message to topic
AWSIot.publish('yourTopic', 'Hello world');
```

Add any logic you wish to perform on a message to the `processEvent(event)` callback or specify your own callback function within the `this.clent.setCallback()` function. Data can then be store within the class for access in a parent module.

<a name="api"></a>
## API Documentation

- `type`: use 'device' for device type and 'shadows' for ShadowThing
- `host`: the AWS IoT endpoint you will use to connect
- `region`: the AWS IoT region you will use to connect
- `config`: extra configuration for the thingShadow
- `onConnect`: callback for when the websockets connects
- `onReconnect`: callback for when the websockets reconnects
- `onDelta`: callback for delta msg
- `onStatus`: callback for status msg
- `onThingConnected`: callback for each registered thing

<a name="connections"></a>

## Connection Types

This react component only supports one type of connections to the AWS IoT platform:

- MQTT over WebSocket/TLS with SigV4 authentication using port 443

<a name="bundle"></a>

## Re-Creating the bundle with webpack

This IOT JS SDK is packaged with[webpack](https://webpack.js.org/), because currently there is not official support for AWS IOT react. This is already bundle it for you using the last version.

```sh
npm run build
```

<a name="unittests"></a>

## Unit Tests

This package includes unit tests which can be run as follows:

```sh
npm test
```

Running the unit tests will also generate code coverage data in the 'reports'
directory.

<a name="license"></a>

## License

This react native component is distributed under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0), see LICENSE.txt and NOTICE.txt for more information.

<a name="suport"></a>

## Support

feel free to open any ticket in github issues
