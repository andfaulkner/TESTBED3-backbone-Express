module.exports = emitStrings = ((options) =>
    (this.add( 'role:emitstr,cmd:hello', ( (args, done) =>
        (done( null, { say:"hellooooooooooo!!" }))
    )))
);