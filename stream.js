// @inspiration https://howtonode.org/coding-challenges-with-streams
// @inspiration http://nicolashery.com/parse-data-files-using-nodejs-streams/
// @inspiration https://github.com/substack/stream-handbook
// @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes

const Transform = require('stream').Transform;
const Readable = require('stream').Readable;

class DavidStream extends Transform {
    constructor() {
        super({readableObjectMode: true});

    }

    _transform(chunk, encoding, cb) {


        if(chunk.toString().match(/kuk.*/g) === null){
            this.push(chunk);
        }
        cb();
    }
}

/**
 * Filter lines that contains kuk* word
 */
var rs = new Readable();
rs._read = function noop(){};// need to be here anyway:)
rs.push("kuk1");
rs.push("kuk2");
rs.push("kuk3");
rs.push("denisa\n");
rs.push("barush");

rs.pipe(new DavidStream())
    .pipe(process.stdout);
