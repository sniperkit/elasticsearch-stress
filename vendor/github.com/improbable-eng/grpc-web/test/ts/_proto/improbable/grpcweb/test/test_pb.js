/**
 * @fileoverview
 * @enhanceable
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');
goog.exportSymbol('proto.improbable.grpcweb.test.PingRequest', null, global);
goog.exportSymbol('proto.improbable.grpcweb.test.PingRequest.FailureType', null, global);
goog.exportSymbol('proto.improbable.grpcweb.test.PingResponse', null, global);

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.improbable.grpcweb.test.PingRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.improbable.grpcweb.test.PingRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.improbable.grpcweb.test.PingRequest.displayName = 'proto.improbable.grpcweb.test.PingRequest';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.improbable.grpcweb.test.PingRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.improbable.grpcweb.test.PingRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.improbable.grpcweb.test.PingRequest} msg The msg instance to transform.
 * @return {!Object}
 */
proto.improbable.grpcweb.test.PingRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    value: jspb.Message.getFieldWithDefault(msg, 1, ""),
    sleepTimeMs: jspb.Message.getFieldWithDefault(msg, 2, 0),
    responseCount: jspb.Message.getFieldWithDefault(msg, 3, 0),
    errorCodeReturned: jspb.Message.getFieldWithDefault(msg, 4, 0),
    failureType: jspb.Message.getFieldWithDefault(msg, 5, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.improbable.grpcweb.test.PingRequest}
 */
proto.improbable.grpcweb.test.PingRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.improbable.grpcweb.test.PingRequest;
  return proto.improbable.grpcweb.test.PingRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.improbable.grpcweb.test.PingRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.improbable.grpcweb.test.PingRequest}
 */
proto.improbable.grpcweb.test.PingRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setValue(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setSleepTimeMs(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setResponseCount(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setErrorCodeReturned(value);
      break;
    case 5:
      var value = /** @type {!proto.improbable.grpcweb.test.PingRequest.FailureType} */ (reader.readEnum());
      msg.setFailureType(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.improbable.grpcweb.test.PingRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.improbable.grpcweb.test.PingRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.improbable.grpcweb.test.PingRequest} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.improbable.grpcweb.test.PingRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getValue();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getSleepTimeMs();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = message.getResponseCount();
  if (f !== 0) {
    writer.writeInt32(
      3,
      f
    );
  }
  f = message.getErrorCodeReturned();
  if (f !== 0) {
    writer.writeUint32(
      4,
      f
    );
  }
  f = message.getFailureType();
  if (f !== 0.0) {
    writer.writeEnum(
      5,
      f
    );
  }
};


/**
 * @enum {number}
 */
proto.improbable.grpcweb.test.PingRequest.FailureType = {
  NONE: 0,
  CODE: 1,
  DROP: 2
};

/**
 * optional string value = 1;
 * @return {string}
 */
proto.improbable.grpcweb.test.PingRequest.prototype.getValue = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.improbable.grpcweb.test.PingRequest.prototype.setValue = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional int32 sleep_time_ms = 2;
 * @return {number}
 */
proto.improbable.grpcweb.test.PingRequest.prototype.getSleepTimeMs = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/** @param {number} value */
proto.improbable.grpcweb.test.PingRequest.prototype.setSleepTimeMs = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * optional int32 response_count = 3;
 * @return {number}
 */
proto.improbable.grpcweb.test.PingRequest.prototype.getResponseCount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/** @param {number} value */
proto.improbable.grpcweb.test.PingRequest.prototype.setResponseCount = function(value) {
  jspb.Message.setField(this, 3, value);
};


/**
 * optional uint32 error_code_returned = 4;
 * @return {number}
 */
proto.improbable.grpcweb.test.PingRequest.prototype.getErrorCodeReturned = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/** @param {number} value */
proto.improbable.grpcweb.test.PingRequest.prototype.setErrorCodeReturned = function(value) {
  jspb.Message.setField(this, 4, value);
};


/**
 * optional FailureType failure_type = 5;
 * @return {!proto.improbable.grpcweb.test.PingRequest.FailureType}
 */
proto.improbable.grpcweb.test.PingRequest.prototype.getFailureType = function() {
  return /** @type {!proto.improbable.grpcweb.test.PingRequest.FailureType} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/** @param {!proto.improbable.grpcweb.test.PingRequest.FailureType} value */
proto.improbable.grpcweb.test.PingRequest.prototype.setFailureType = function(value) {
  jspb.Message.setField(this, 5, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.improbable.grpcweb.test.PingResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.improbable.grpcweb.test.PingResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.improbable.grpcweb.test.PingResponse.displayName = 'proto.improbable.grpcweb.test.PingResponse';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.improbable.grpcweb.test.PingResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.improbable.grpcweb.test.PingResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.improbable.grpcweb.test.PingResponse} msg The msg instance to transform.
 * @return {!Object}
 */
proto.improbable.grpcweb.test.PingResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    value: jspb.Message.getFieldWithDefault(msg, 1, ""),
    counter: jspb.Message.getFieldWithDefault(msg, 2, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.improbable.grpcweb.test.PingResponse}
 */
proto.improbable.grpcweb.test.PingResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.improbable.grpcweb.test.PingResponse;
  return proto.improbable.grpcweb.test.PingResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.improbable.grpcweb.test.PingResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.improbable.grpcweb.test.PingResponse}
 */
proto.improbable.grpcweb.test.PingResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setValue(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCounter(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.improbable.grpcweb.test.PingResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.improbable.grpcweb.test.PingResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.improbable.grpcweb.test.PingResponse} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.improbable.grpcweb.test.PingResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getValue();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getCounter();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
};


/**
 * optional string Value = 1;
 * @return {string}
 */
proto.improbable.grpcweb.test.PingResponse.prototype.getValue = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.improbable.grpcweb.test.PingResponse.prototype.setValue = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional int32 counter = 2;
 * @return {number}
 */
proto.improbable.grpcweb.test.PingResponse.prototype.getCounter = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/** @param {number} value */
proto.improbable.grpcweb.test.PingResponse.prototype.setCounter = function(value) {
  jspb.Message.setField(this, 2, value);
};


goog.object.extend(exports, proto.improbable.grpcweb.test);
