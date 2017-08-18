// Unit tests using QUnit (https://qunitjs.com/).
// This is loaded from test_urlize.html.

//these two lines ensure the test runs in amd_test.html and node.js
function tests(urlize) {
var test = QUnit.test;

QUnit.module('IE7');

test('Two words, no URL', function () {
  equal(urlize('foo bar'), 'foo bar');
});

test('Split words', function () {
  deepEqual(urlize.test.split('foo bar', /(\s+)/), ['foo', ' ', 'bar']);
});

QUnit.module('Basic functionality');

test('Bare', function () {
  equal(urlize('The website www.ljosa.com is down', true),
   'The website <a href="http://www.ljosa.com" rel="nofollow">www.ljosa.com</a> is down');
  equal(urlize('The website www.ljosa.com is down', {nofollow: true}),
   'The website <a href="http://www.ljosa.com" rel="nofollow">www.ljosa.com</a> is down');
});

test('Complete', function () {
  equal(urlize('The website http://www.ljosa.com/ is down', true),
   'The website <a href="http://www.ljosa.com/" rel="nofollow">http://www.ljosa.com/</a> is down');
  equal(urlize('The website http://www.ljosa.com/ is down', {nofollow: true}),
   'The website <a href="http://www.ljosa.com/" rel="nofollow">http://www.ljosa.com/</a> is down');
});

test ('Beginning bare', function () {
  equal(urlize('www.ljosa.com is down', true),
   '<a href="http://www.ljosa.com" rel="nofollow">www.ljosa.com</a> is down');
  equal(urlize('www.ljosa.com is down', {nofollow: true}),
   '<a href="http://www.ljosa.com" rel="nofollow">www.ljosa.com</a> is down');
});

test ('End complete', function () {
  equal(urlize('Go to http://www.ljosa.com/', true),
   'Go to <a href="http://www.ljosa.com/" rel="nofollow">http://www.ljosa.com/</a>');
  equal(urlize('Go to http://www.ljosa.com/', {nofollow: true}),
   'Go to <a href="http://www.ljosa.com/" rel="nofollow">http://www.ljosa.com/</a>');
});

test ('End bare', function () {
  equal(urlize('Go to www.ljosa.com', true),
   'Go to <a href="http://www.ljosa.com" rel="nofollow">www.ljosa.com</a>');
  equal(urlize('Go to www.ljosa.com', {nofollow: true}),
   'Go to <a href="http://www.ljosa.com" rel="nofollow">www.ljosa.com</a>');
});

test ('End bare non-com', function () {
  equal(urlize('Go to www.ljosa.priv.no', true),
   'Go to <a href="http://www.ljosa.priv.no" rel="nofollow">www.ljosa.priv.no</a>');
  equal(urlize('Go to www.ljosa.priv.no', {nofollow: true}),
   'Go to <a href="http://www.ljosa.priv.no" rel="nofollow">www.ljosa.priv.no</a>');
});

test ('End bare non-com trim period', function () {
  equal(urlize('Go to www.ljosa.priv.no.', true),
   'Go to <a href="http://www.ljosa.priv.no" rel="nofollow">www.ljosa.priv.no</a>.');
  equal(urlize('Go to www.ljosa.priv.no.', {nofollow: true}),
   'Go to <a href="http://www.ljosa.priv.no" rel="nofollow">www.ljosa.priv.no</a>.');
});

test ('End complete non-com', function () {
  equal(urlize('Go to http://www.ljosa.priv.no', true),
   'Go to <a href="http://www.ljosa.priv.no" rel="nofollow">http://www.ljosa.priv.no</a>');
  equal(urlize('Go to http://www.ljosa.priv.no', {nofollow: true}),
   'Go to <a href="http://www.ljosa.priv.no" rel="nofollow">http://www.ljosa.priv.no</a>');
});

test ('End complete trim period', function () {
  equal(urlize('Go to http://www.ljosa.priv.no.', true),
   'Go to <a href="http://www.ljosa.priv.no" rel="nofollow">http://www.ljosa.priv.no</a>.');
  equal(urlize('Go to http://www.ljosa.priv.no.', {nofollow: true}),
   'Go to <a href="http://www.ljosa.priv.no" rel="nofollow">http://www.ljosa.priv.no</a>.');
});

test('Email', function () {
  equal(urlize('Contact me at vebjorn@ljosa.com', true),
   'Contact me at <a href="mailto:vebjorn@ljosa.com">vebjorn@ljosa.com</a>');
  equal(urlize('Contact me at vebjorn@ljosa.com', {nofollow: true}),
   'Contact me at <a href="mailto:vebjorn@ljosa.com">vebjorn@ljosa.com</a>');
});

test('Email trim period', function () {
  equal(urlize('Contact me at vebjorn@ljosa.com.', true),
   'Contact me at <a href="mailto:vebjorn@ljosa.com">vebjorn@ljosa.com</a>.');
  equal(urlize('Contact me at vebjorn@ljosa.com.', {nofollow: true}),
   'Contact me at <a href="mailto:vebjorn@ljosa.com">vebjorn@ljosa.com</a>.');
});

// PENDING
// test('IDN', function () {
//     equal(urlize(unescape('www.r%F8asenter.no')),
// 	  unescape('<a href="http%3A//www.xn--rasenter-54a.no">www.r%F8asenter.no</a>'));
//     equal(urlize(unescape('www.r%F8asenter.no'), {}),
// 	  unescape('<a href="http%3A//www.xn--rasenter-54a.no">www.r%F8asenter.no</a>'));
// });

test('Bare parens', function () {
  equal(urlize('My web site (www.ljosa.com)', true),
   'My web site (<a href="http://www.ljosa.com" rel="nofollow">www.ljosa.com</a>)');
  equal(urlize('My web site (www.ljosa.com)', {nofollow: true}),
   'My web site (<a href="http://www.ljosa.com" rel="nofollow">www.ljosa.com</a>)');
});

test('No autoescape parameter', function () {
  equal(urlize('This <b>is</b> www.ljosa.com', true),
   'This <b>is</b> <a href="http://www.ljosa.com" rel="nofollow">www.ljosa.com</a>');
  equal(urlize('This <b>is</b> www.ljosa.com', {nofollow: true}),
   'This <b>is</b> <a href="http://www.ljosa.com" rel="nofollow">www.ljosa.com</a>');
});

test('autoescape == false', function () {
  equal(urlize('This <b>is</b> www.ljosa.com', true, false),
   'This <b>is</b> <a href="http://www.ljosa.com" rel="nofollow">www.ljosa.com</a>');
  equal(urlize('This <b>is</b> www.ljosa.com', true, false),
   'This <b>is</b> <a href="http://www.ljosa.com" rel="nofollow">www.ljosa.com</a>');
});

test('autoescape == true', function () {
  equal(urlize('This <b>is</b> www.ljosa.com', true, true),
   'This &lt;b&gt;is&lt;/b&gt; <a href="http://www.ljosa.com" rel="nofollow">www.ljosa.com</a>');
  equal(urlize('This <b>is</b> www.ljosa.com', {nofollow: true, autoescape: true}),
   'This &lt;b&gt;is&lt;/b&gt; <a href="http://www.ljosa.com" rel="nofollow">www.ljosa.com</a>');
});

test('trim_url_limit', function () {
  equal(urlize('When you go to www.nemeet.com/somethinglong, you will find it.', false, true, 20),
   'When you go to <a href="http://www.nemeet.com/somethinglong">www.nemeet.com/so...</a>, you will find it.');
  equal(urlize('When you go to www.nemeet.com/somethinglong, you will find it.', {autoescape: true, trim_url_limit: 20}),
   'When you go to <a href="http://www.nemeet.com/somethinglong">www.nemeet.com/so...</a>, you will find it.');
});

test('No target parameter', function () {
  equal(urlize('Open the following in the same window www.ljosa.com', true, false, 20),
   'Open the following in the same window <a href="http://www.ljosa.com" rel="nofollow">www.ljosa.com</a>');
  equal(urlize('Open the following in the same window www.ljosa.com', {nofollow: true, trim_url_limit: 20}),
   'Open the following in the same window <a href="http://www.ljosa.com" rel="nofollow">www.ljosa.com</a>');
});

test('target == _blank', function () {
  equal(urlize('Open the following in new window www.ljosa.com', true, false, 20, '_blank'),
   'Open the following in new window <a href="http://www.ljosa.com" rel="nofollow" target="_blank">www.ljosa.com</a>');
  equal(urlize('Open the following in new window www.ljosa.com', {nofollow: true, trim_url_limit: 20, target: '_blank'}),
   'Open the following in new window <a href="http://www.ljosa.com" rel="nofollow" target="_blank">www.ljosa.com</a>');
});

test('target == _self', function () {
  equal(urlize('Open the following in the same window www.ljosa.com', true, false, 20, '_self'),
   'Open the following in the same window <a href="http://www.ljosa.com" rel="nofollow" target="_self">www.ljosa.com</a>');
  equal(urlize('Open the following in the same window www.ljosa.com', {nofollow: true, trim_url_limit: 20, target: '_self'}),
   'Open the following in the same window <a href="http://www.ljosa.com" rel="nofollow" target="_self">www.ljosa.com</a>');
});

test('autoescape == False and ampersands', function () {
  equal(urlize('http://foo.bar/?a=1&b=2', false, false),
   '<a href="http://foo.bar/?a=1&b=2">http://foo.bar/?a=1&b=2</a>');
  equal(urlize('http://foo.bar/?a=1&b=2', {autoescape: false}),
   '<a href="http://foo.bar/?a=1&b=2">http://foo.bar/?a=1&b=2</a>');
});

test('autoescape == True and ampersands', function () {
  equal(urlize('http://foo.bar/?a=1&b=2', false, true),
   '<a href="http://foo.bar/?a=1&amp;b=2">http://foo.bar/?a=1&amp;b=2</a>');
  equal(urlize('http://foo.bar/?a=1&b=2', {autoescape: true}),
   '<a href="http://foo.bar/?a=1&amp;b=2">http://foo.bar/?a=1&amp;b=2</a>');
});

test('autoescape == False and troublesome ampersands', function () {
  equal(urlize('http://foo.bar/?a=1&amp;=2', false, false),
   '<a href="http://foo.bar/?a=1&amp;=2">http://foo.bar/?a=1&amp;=2</a>');
  equal(urlize('http://foo.bar/?a=1&amp;=2', {autoescape: false}),
   '<a href="http://foo.bar/?a=1&amp;=2">http://foo.bar/?a=1&amp;=2</a>');
});

test('autoescape == True and troublesome ampersands', function () {
  equal(urlize('http://foo.bar/?a=1&amp;=2', false, true),
   '<a href="http://foo.bar/?a=1&amp;amp;=2">http://foo.bar/?a=1&amp;amp;=2</a>');
  equal(urlize('http://foo.bar/?a=1&amp;=2', {autoescape: true}),
   '<a href="http://foo.bar/?a=1&amp;amp;=2">http://foo.bar/?a=1&amp;amp;=2</a>');
});

test('autoescape == True and double quotes', function () {
  equal(urlize('http://foo.bar/evilquote"/>script', false, true),
    '<a href="http://foo.bar/evilquote%22/%3Escript">http://foo.bar/evilquote&quot;/&gt;script</a>');
});

test('Mixed-case protocol', function () {
    equal(urlize('My Link Http://www.Example.com'),
          'My Link <a href="http://www.Example.com">Http://www.Example.com</a>');
});

test('Mixed-case TLD', function () {
    equal(urlize('My Link example.Com'),
          'My Link <a href="http://example.Com">example.Com</a>');
});

test('Mixed-case www', function () {
    equal(urlize('My Link Www.example.no'),
          'My Link <a href="http://Www.example.no">Www.example.no</a>');
});

QUnit.module('convert_arguments');

test('single argument', function () {
  deepEqual(urlize.test.convert_arguments(['foo']), {
   attrs: undefined,
   autoescape: undefined,
   nofollow: undefined,
   target: undefined,
   trim_url_limit: undefined,
   django_compatible: true
 });
});

test('two arguments, second is object', function () {
  var d = {nofollow: true};
  equal(urlize.test.convert_arguments(['foo', d]), d);
});

test('two arguments, second is boolean', function () {
  ok(!urlize.test.convert_arguments(['foo', false]).nofollow);
  equal(urlize.test.convert_arguments(['foo', true]).nofollow, true);
});

test('three arguments, third is boolean', function () {
  equal(urlize.test.convert_arguments(['foo', false, false]).autoescape, false);
  equal(urlize.test.convert_arguments(['foo', false, true]).autoescape, true);
});

test('four arguments, fourth is integer', function () {
  equal(urlize.test.convert_arguments(['foo', false, false, undefined]).trim_url_limit, undefined);
  equal(urlize.test.convert_arguments(['foo', false, false, 0]).trim_url_limit, 0);
  equal(urlize.test.convert_arguments(['foo', false, false, 10]).trim_url_limit, 10);
});

test('five arguments, fifth is string', function () {
  equal(urlize.test.convert_arguments(['foo', false, false, undefined, undefined]).target, undefined);
  equal(urlize.test.convert_arguments(['foo', false, false, undefined, '_blank']).target, '_blank');
});

test('django_compatible', function () {
  ok(urlize.test.convert_arguments(['foo']).django_compatible);
  ok(!urlize.test.convert_arguments(['foo', {django_compatible: false}]).django_compatible);
});



QUnit.module('Improvements over Django');

test('adjacent angle brackets', function () {
  equal(urlize('<b>http://example.com</b>'), '<b>http://example.com</b>');
  equal(urlize('<b>http://example.com</b>', {django_compatible: false}),
   '<b><a href="http://example.com">http://example.com</a></b>');
  equal(urlize('<b>www.example.com</b>'), '<b>www.example.com</b>');
  equal(urlize('<b>www.example.com</b>', {django_compatible: false}),
   '<b><a href="http://www.example.com">www.example.com</a></b>');
});

test('enclosing fancy double quotes', function () {
  equal(urlize('The link “http://example.com” is broken'),
   'The link “http://example.com” is broken');
  equal(urlize('The link “http://example.com” is broken', {django_compatible: false}),
   'The link “<a href="http://example.com">http://example.com</a>” is broken');
  equal(urlize('The link “www.example.com” is broken'),
   'The link “www.example.com” is broken');
  equal(urlize('The link “www.example.com” is broken', {django_compatible: false}),
   'The link “<a href="http://www.example.com">www.example.com</a>” is broken');
});

test('enclosing fancy single quotes', function () {
  equal(urlize('The link ‘http://example.com’ is broken'),
   'The link ‘http://example.com’ is broken');
  equal(urlize('The link ‘http://example.com’ is broken', {django_compatible: false}),
   'The link ‘<a href="http://example.com">http://example.com</a>’ is broken');
  equal(urlize('The link ‘www.example.com’ is broken'),
   'The link ‘www.example.com’ is broken');
  equal(urlize('The link ‘www.example.com’ is broken', {django_compatible: false}),
   'The link ‘<a href="http://www.example.com">www.example.com</a>’ is broken');
});

test('enclosing double quotes', function () {
  equal(urlize('The link "http://example.com" is broken'),
	  'The link "http://example.com" is broken');
  equal(urlize('The link "http://example.com" is broken', {django_compatible: false}),
	  'The link "<a href="http://example.com">http://example.com</a>" is broken');
  equal(urlize('The link "www.example.com" is broken'),
	  'The link "www.example.com" is broken');
  equal(urlize('The link "www.example.com" is broken', {django_compatible: false}),
	  'The link "<a href="http://www.example.com">www.example.com</a>" is broken');
});

test('autoescape = TRUE replaces "/" with "&#47;"', function() {
  equal(urlize('The link http://example.com with escaped / slashes', {autoescape: true}),
    'The link <a href="http://example.com">http://example.com</a> with escaped / slashes');
  equal(urlize('The link http://example.com with escaped / slashes', {django_compatible: false, autoescape: true}),
    'The link <a href=\"http://example.com\">http:&#47;&#47;example.com</a> with escaped &#47; slashes');
});

// PENDING
// test('Colon before', function () {
//   equal(urlize('Here is the link:http://example.com'),
// 	  'Here is the <a href="http://link:http://example.com">link:http://example.com</a>');
//   equal(urlize('Here is the link:http://example.com', {django_compatible: false}),
// 	  'Here is the link:<a href="http://example.com">http://example.com</a>');
//   equal(urlize('Here is the link:www.example.com'),
// 	  'Here is the <a href="http://link:www.example.com">link:www.example.com</a>');
//   equal(urlize('Here is the link:www.example.com', {django_compatible: false}),
// 	  'Here is the link:<a href="http://www.example.com">www.example.com</a>');
// });

test('End trim period and paren', function () {
  equal(urlize('(Go to http://www.ljosa.priv.no/foo.)', {django_compatible: false}),
	  '(Go to <a href="http://www.ljosa.priv.no/foo">http://www.ljosa.priv.no/foo</a>.)');
});


QUnit.module('TLDs');

test('ccTLDs', function () {
    equal(urlize('example.co, example.io', {top_level_domains: urlize.top_level_domains}),
          '<a href="http://example.co">example.co</a>, <a href="http://example.io">example.io</a>');
});
test('ccTLDs should not be recognized by default', function () {
    equal(urlize('example.co, example.io'),
          'example.co, example.io');
});
test('Recognize nothing if list of TLDs is empty', function () {
    equal(urlize('example.com, example.io', {top_level_domains: []}),
          'example.com, example.io');
});
test('Longer TLDs', function () {
    equal(urlize('about.museum', {top_level_domains: urlize.top_level_domains}),
          '<a href="http://about.museum">about.museum</a>');
});
test('Specific TLDs', function () {
    equal(urlize('example.co, example.io', {top_level_domains: ['io']}),
          'example.co, <a href="http://example.io">example.io</a>');
});

test('Non-existing TLDs', function () {
    equal(urlize('image.jpg, Mr.Smith'),
          'image.jpg, Mr.Smith');
    equal(urlize('image.jpg, Mr.Smith',
                 {top_level_domains: urlize.top_level_domains}),
          'image.jpg, Mr.Smith');
});


QUnit.module('Trimming');

test('trim: http', function () {
    equal(urlize('http://www.example.com/', {trim: "http"}),
          '<a href="http://www.example.com/">www.example.com/</a>');
});
test('trim: www', function () {
    equal(urlize('http://www.example.com/', {trim: "www"}),
          '<a href="http://www.example.com/">example.com/</a>');
});
test('no trim', function () {
    equal(urlize('http://www.example.com/'),
          '<a href="http://www.example.com/">http://www.example.com/</a>');
});


QUnit.module('Additional HTML Attributes');
	
test('add single additional attributes', function () {
    equal(urlize('http://www.example.com/', {attrs: {position: 'left'}}),
          '<a href="http://www.example.com/" position="left">http://www.example.com/</a>');
});
test('add several additional attributes', function () {
    equal(urlize('http://www.example.com/', {attrs: {position: 'left', 'open-in-app': true}}),
          '<a href="http://www.example.com/" position="left" open-in-app="true">http://www.example.com/</a>');
});
test('add additional attributes with illegal values', function () {
    equal(urlize('http://www.example.com/', {attrs: {position: 'left', 'open-in-app': '",true'}}),
          '<a href="http://www.example.com/" position="left" open-in-app="%22%2Ctrue">http://www.example.com/</a>');
});
test('add additional attributes with illegal keys', function () {
    equal(urlize('http://www.example.com/', {attrs: {position: 'left', '"open,-in-app': '",true'}}),
          '<a href="http://www.example.com/" position="left" open-in-app="%22%2Ctrue">http://www.example.com/</a>');
});

//module dance boilerplate
};
if (typeof define === 'function' && define.amd) {
  define(['./urlize_tlds'], tests);
} else if (typeof exports === 'object') {
  module.exports = tests(require('./urlize_tlds'));
} else {
  this.urlize = tests(this.urlize);
}
