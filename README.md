# io-event-reactor-plugin-support

Supporting library for [io-event-reactor](https://github.com/bitsofinfo/io-event-reactor) plugin development.

If you want to develop a new `MonitorPlugin` or `ReactorPlugin` for [io-event-reactor](https://github.com/bitsofinfo/io-event-reactor), you simply
need to run `npm install io-event-reactor-plugin-support` in the root of your module folder. Once installed you can develop your plugin

## MonitorPlugin

MonitorPlugins are responsible for listening for filesystem events and invoking a callback with io event information about the
filesystem change. To create a plugin you simply need to export a `class` in your plugin that meets the following requirements.
You can name the class whatever you want, but it should be the default thing exported by your plugin module.

(For an example MonitorPlugin implementation see: [io-event-reactor-plugin-chokidar](https://github.com/bitsofinfo/iio-event-reactor-plugin-chokidar)

#### MonitorPlugin class constructor() signature

MonitorPlugins only have to meet the below constructor signature requirement and
properly invoke the provided callbacks as events occur in the filesystem. There are no
other functions that need to be declared on the plugin class.

```
/**
* Constructor
*
* An io-event-reactor MonitorPlugin constructor signature
*
* @param reactorId - id of the IoReactor this Monitor plugin is bound to
* @param logFunction - a function to be used for logging w/ signature function(severity, origin, message)
* @param errorCallback - a function to be used for relaying any errors w/ signature function(message, sourceErrorObject)
*
* @param ioEventCallback - when a file/dir event occurs, invoke this function(eventType, fullPath, optionalFsStats, optionalExtraInfo)
*   - where 'eventType' is one of 'add', 'addDir', 'unlink', 'unlinkDir', or 'change'
*   - where 'fullPath' is the full path to the file/dir the event is for
*   - when available, "optionalFsStats" if not null, should be = https://nodejs.org/api/fs.html#fs_class_fs_stats
*   - when available, "optionalExtraInfo", varies by plugin
*
* @param initializedCallback - when this MonitorPlugin is full initialized, this callback should be invoked
*
* @param pluginConfig - Your custom configuration will be delivered in this object and the specification is for you to decide and document!
*
*/
constructor(reactorId, logFunction, errorCallback,
            ioEventCallback, initializedCallback, pluginConfig) {
    ....
}
```

## ReactorPlugin

ReactorPlugins are responsible for reacting to an IoEvent by doing some action.
What that action is, is up to you. To create a plugin you simply need to export a `class` in your plugin that meets the following requirements.
You can name the class whatever you want, but it should be the default thing exported by your plugin module.

(For an example ReactorPlugin implementation see: [io-event-reactor-plugin-mysql](https://github.com/bitsofinfo/iio-event-reactor-plugin-mysql)

At the top of your ReactorPlugin js file:
```
var IoEvent = require('io-event-reactor-plugin-support').IoEvent;
var ReactorResult = require('io-event-reactor-plugin-support').ReactorResult;
```

#### ReactorPlugin class constructor() signature

```
/**
* Constructor
*
* An io-event-reactor ReactorPlugin that reacts to IoEvents
*
* @param pluginId - identifier for this plugin
* @param reactorId - id of the IoReactor this Monitor plugin is bound to
* @param logFunction - a function to be used for logging w/ signature function(severity, origin, message)
* @param initializedCallback - when this ReactorPlugin is full initialized, this callback  function(reactorPluginId) should be invoked
*
* @param pluginConfig - Your custom configuration will be delivered in this object and the specification is for you to decide and document!
*
*/
constructor(pluginId, reactorId, logFunction,
            errorCallback, initializedCallback, pluginConfig) {
    ....
}
```

#### ReactorPlugin react() signature

The `react(ioEvent)` method is called when an IoEvent occurs that is applicable to this ReactorPlugin as configured in `io-event-reactor`.
It should return a `Promise` that on both fulfill/reject returns an appropriately constructed `ReactorResult` object.

```
/**
* react(ioEvent) - core ReactorPlugin function
*
* This function is required on ReactorPlugin implementations
*
* @param ioEvent - IoEvent object to react to
* @return Promise - when fulfilled/rejected a ReactorResult object, on error the ReactorResult will contain the error
*
*/
react(ioEvent) {
    ....
}
```
