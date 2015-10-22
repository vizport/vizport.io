var gulp = require('gulp');
var s3 = require("gulp-s3");
var os = require("os");
require('dotenv').load();

var slack = require('gulp-slack')({
    url: process.env.SLACK_URL,
    channel: '#channel', // Optional
    user: 'Gasperbot', // Optional
    icon_emoji: ':ghost:' // Optional
});

gulp.task('publish', function() {
  var aws = {
  	key: process.env.AWS_KEY_ID,
	  secret: process.env.AWS_KEY_ACCESS,
	  bucket: process.env.AWS_PROD_BUCKET,
    region: "us-west-2"
	};
  console.log(aws.bucket);
  return gulp.src('./build/**')
      .pipe(s3(aws , { 
        uploadPath: process.env.AWS_PATH,
        headers: {
          'x-amz-acl': 'public-read'
        }
      }))
      .pipe(slack('@channel: Se ha hecho un nuevo push a http://vizport.io/ por:' + os.hostname()));;
});