
var path = require('path');

/**
* IoReactorException
* Class for wrapping exception
*/
class IoReactorException {

    /**
    * Constructor
    *
    * @param message error message
    * @param sourceError source error object
    */
    constructor(message,sourceError) {
        this.message = message;
        this.sourceError = sourceError;
    }
}



/**
* IoEvent class, encapsulates all information
* that makes up an IoEvent triggered by a MonitorPlugin
*
* ReactorPlugin's react() method will be passed objects of
* this specification
*
*/
class IoEvent {
    constructor(ioEventType, fullPath, optionalFsStats, optionalExtraInfo) {
        this._eventType = ioEventType;
        this._fullPath = fullPath;
        this._optionalFsStats = optionalFsStats;
        this._optionalExtraInfo = optionalExtraInfo;

        this._parentPath = path.dirname(fullPath) ;
        this._filename = path.basename(fullPath);

        this._context = {}; // permits reactors to add arbitraty info to the event
    }

    get context() {
        return this._context;
    }

    set context(c) {
     this._context = c;
    }

    get parentPath() {
        return this._parentPath;
    }
    get filename() {
        return this._filename;
    }
    get eventType() {
        return this._eventType;
    }
    get fullPath() {
        return this._fullPath;
    }
    get optionalFsStats() {
        return this._optionalFsStats;
    }
    get optionalExtraInfo() {
        return this._optionalExtraInfo;
    }
}


/**
* ReactorResult class, represents a result from the
* invocation of a ReactorPlugin's react() method
*
* ReactorPlugins must fulfill/reject with an object
* that meets this specification
*
*/
class ReactorResult {
    constructor(success, pluginId, reactorId, ioEvent, message, error) {
        this._pluginId = pluginId;
        this._reactorId = reactorId,
        this._ioEvent = ioEvent;
        this._success = success;
        this._message = message;
        this._error = error;
    }
    get isSuccess() {
        return this._success;
    }
    get message() {
        return this._message;
    }
    get ioEvent() {
        return this._ioEvent;
    }
    get error() {
        return this._error;
    }
    get pluginId() {
        return this._pluginId;
    }
    get reactorId() {
        return this._reactorId;
    }
}


module.exports.IoEvent = IoEvent;
module.exports.IoReactorException = IoReactorException;
module.exports.ReactorResult = ReactorResult;
