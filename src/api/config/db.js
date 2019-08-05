let mongoose = require('mongoose')

let dbUrl = 'mongodb://nodep:nodep@localhost:27017/nodep'

mongoose.connect(dbUrl,{useNewUrlParser: true});

mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + dbUrl);
});

mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
})

mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected.');
});

var gracefulShutdown = function(msg, callback) {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};

process.once('SIGUSR2', function() {
    gracefulShutdown('nodemon restart', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});

process.on('SIGINT', function() {
    gracefulShutdown('app termination', function() {
        process.exit(0);
    });
});

process.on('SIGTERM', function() {
    gracefulShutdown('CMS shutdown', function() {
        process.exit(0);
    });
});