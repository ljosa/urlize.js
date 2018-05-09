var assert = require('assert');
var equal = assert.equal;
var deepEqual = assert.deepEqual;
var ok = assert.ok;
var urlize = require('./urlize.js');
require('./urlize_tlds.js');

describe('IE7', function() {
  it('two words, no URL', function () {
    assert.equal(urlize('foo bar'), 'foo bar');
  });

  it('split words', function () {
    assert.deepEqual(urlize.test.split('foo bar', /(\s+)/), ['foo', ' ', 'bar']);
  });
});

describe('Basic functionality', function () {
  it('bare', function () {
    assert.equal(urlize('The website www.ljosa.com is down', true),
                 'The website <a href="http://www.ljosa.com" rel="nofollow">www.ljosa.com</a> is down');
    assert.equal(urlize('The website www.ljosa.com is down', {nofollow: true}),
                 'The website <a href="http://www.ljosa.com" rel="nofollow">www.ljosa.com</a> is down');
  });

  it('Complete', function () {
    assert.equal(urlize('The website http://www.ljosa.com/ is down', true),
                 'The website <a href="http://www.ljosa.com/" rel="nofollow">http://www.ljosa.com/</a> is down');
    assert.equal(urlize('The website http://www.ljosa.com/ is down', {nofollow: true}),
                 'The website <a href="http://www.ljosa.com/" rel="nofollow">http://www.ljosa.com/</a> is down');
  });

  it('Beginning bare', function () {
    assert.equal(urlize('www.ljosa.com is down', true),
                 '<a href="http://www.ljosa.com" rel="nofollow">www.ljosa.com</a> is down');
    assert.equal(urlize('www.ljosa.com is down', {nofollow: true}),
                 '<a href="http://www.ljosa.com" rel="nofollow">www.ljosa.com</a> is down');
  });

  it('End complete', function () {
    assert.equal(urlize('Go to http://www.ljosa.com/', true),
                 'Go to <a href="http://www.ljosa.com/" rel="nofollow">http://www.ljosa.com/</a>');
    assert.equal(urlize('Go to http://www.ljosa.com/', {nofollow: true}),
                 'Go to <a href="http://www.ljosa.com/" rel="nofollow">http://www.ljosa.com/</a>');
  });

  it('End bare', function () {
    assert.equal(urlize('Go to www.ljosa.com', true),
                 'Go to <a href="http://www.ljosa.com" rel="nofollow">www.ljosa.com</a>');
    assert.equal(urlize('Go to www.ljosa.com', {nofollow: true}),
                 'Go to <a href="http://www.ljosa.com" rel="nofollow">www.ljosa.com</a>');
  });

  it('End bare non-com', function () {
    assert.equal(urlize('Go to www.ljosa.priv.no', true),
                 'Go to <a href="http://www.ljosa.priv.no" rel="nofollow">www.ljosa.priv.no</a>');
    assert.equal(urlize('Go to www.ljosa.priv.no', {nofollow: true}),
                 'Go to <a href="http://www.ljosa.priv.no" rel="nofollow">www.ljosa.priv.no</a>');
  });

  it('End bare non-com trim period', function () {
    assert.equal(urlize('Go to www.ljosa.priv.no.', true),
                 'Go to <a href="http://www.ljosa.priv.no" rel="nofollow">www.ljosa.priv.no</a>.');
    assert.equal(urlize('Go to www.ljosa.priv.no.', {nofollow: true}),
                 'Go to <a href="http://www.ljosa.priv.no" rel="nofollow">www.ljosa.priv.no</a>.');
  });

  it('End complete non-com', function () {
    assert.equal(urlize('Go to http://www.ljosa.priv.no', true),
                 'Go to <a href="http://www.ljosa.priv.no" rel="nofollow">http://www.ljosa.priv.no</a>');
    assert.equal(urlize('Go to http://www.ljosa.priv.no', {nofollow: true}),
                 'Go to <a href="http://www.ljosa.priv.no" rel="nofollow">http://www.ljosa.priv.no</a>');
  });

  it('End complete trim period', function () {
    assert.equal(urlize('Go to http://www.ljosa.priv.no.', true),
                 'Go to <a href="http://www.ljosa.priv.no" rel="nofollow">http://www.ljosa.priv.no</a>.');
    assert.equal(urlize('Go to http://www.ljosa.priv.no.', {nofollow: true}),
                 'Go to <a href="http://www.ljosa.priv.no" rel="nofollow">http://www.ljosa.priv.no</a>.');
  });

  it('Email', function () {
    assert.equal(urlize('Contact me at vebjorn@ljosa.com', true),
                 'Contact me at <a href="mailto:vebjorn@ljosa.com">vebjorn@ljosa.com</a>');
    assert.equal(urlize('Contact me at vebjorn@ljosa.com', {nofollow: true}),
                 'Contact me at <a href="mailto:vebjorn@ljosa.com">vebjorn@ljosa.com</a>');
  });

  it('Email trim period', function () {
    assert.equal(urlize('Contact me at vebjorn@ljosa.com.', true),
                 'Contact me at <a href="mailto:vebjorn@ljosa.com">vebjorn@ljosa.com</a>.');
    assert.equal(urlize('Contact me at vebjorn@ljosa.com.', {nofollow: true}),
                 'Contact me at <a href="mailto:vebjorn@ljosa.com">vebjorn@ljosa.com</a>.');
  });

// PENDING
// it('IDN', function () {
//     assert.equal(urlize(unescape('www.r%F8asenter.no')),
// 	            unescape('<a href="http%3A//www.xn--rasenter-54a.no">www.r%F8asenter.no</a>'));
//     assert.equal(urlize(unescape('www.r%F8asenter.no'), {}),
// 	            unescape('<a href="http%3A//www.xn--rasenter-54a.no">www.r%F8asenter.no</a>'));
// });

  it('Bare parens', function () {
    assert.equal(urlize('My web site (www.ljosa.com)', true),
                 'My web site (<a href="http://www.ljosa.com" rel="nofollow">www.ljosa.com</a>)');
    assert.equal(urlize('My web site (www.ljosa.com)', {nofollow: true}),
                 'My web site (<a href="http://www.ljosa.com" rel="nofollow">www.ljosa.com</a>)');
  });

  it('No autoescape parameter', function () {
    assert.equal(urlize('This <b>is</b> www.ljosa.com', true),
                 'This <b>is</b> <a href="http://www.ljosa.com" rel="nofollow">www.ljosa.com</a>');
    assert.equal(urlize('This <b>is</b> www.ljosa.com', {nofollow: true}),
                 'This <b>is</b> <a href="http://www.ljosa.com" rel="nofollow">www.ljosa.com</a>');
  });

  it('autoescape == false', function () {
    assert.equal(urlize('This <b>is</b> www.ljosa.com', true, false),
                 'This <b>is</b> <a href="http://www.ljosa.com" rel="nofollow">www.ljosa.com</a>');
    assert.equal(urlize('This <b>is</b> www.ljosa.com', true, false),
                 'This <b>is</b> <a href="http://www.ljosa.com" rel="nofollow">www.ljosa.com</a>');
  });

  it('autoescape == true', function () {
    assert.equal(urlize('This <b>is</b> www.ljosa.com', true, true),
                 'This &lt;b&gt;is&lt;/b&gt; <a href="http://www.ljosa.com" rel="nofollow">www.ljosa.com</a>');
    assert.equal(urlize('This <b>is</b> www.ljosa.com', {nofollow: true, autoescape: true}),
                 'This &lt;b&gt;is&lt;/b&gt; <a href="http://www.ljosa.com" rel="nofollow">www.ljosa.com</a>');
  });

  it('trim_url_limit', function () {
    assert.equal(urlize('When you go to www.nemeet.com/somethinglong, you will find it.', false, true, 20),
                 'When you go to <a href="http://www.nemeet.com/somethinglong">www.nemeet.com/so...</a>, you will find it.');
    assert.equal(urlize('When you go to www.nemeet.com/somethinglong, you will find it.', {autoescape: true, trim_url_limit: 20}),
                 'When you go to <a href="http://www.nemeet.com/somethinglong">www.nemeet.com/so...</a>, you will find it.');
  });

  it('No target parameter', function () {
    assert.equal(urlize('Open the following in the same window www.ljosa.com', true, false, 20),
                 'Open the following in the same window <a href="http://www.ljosa.com" rel="nofollow">www.ljosa.com</a>');
    assert.equal(urlize('Open the following in the same window www.ljosa.com', {nofollow: true, trim_url_limit: 20}),
                 'Open the following in the same window <a href="http://www.ljosa.com" rel="nofollow">www.ljosa.com</a>');
  });

  it('target == _blank', function () {
    assert.equal(urlize('Open the following in new window www.ljosa.com', true, false, 20, '_blank'),
                 'Open the following in new window <a href="http://www.ljosa.com" rel="nofollow" target="_blank">www.ljosa.com</a>');
    assert.equal(urlize('Open the following in new window www.ljosa.com', {nofollow: true, trim_url_limit: 20, target: '_blank'}),
                 'Open the following in new window <a href="http://www.ljosa.com" rel="nofollow" target="_blank">www.ljosa.com</a>');
  });

  it('target == _self', function () {
    assert.equal(urlize('Open the following in the same window www.ljosa.com', true, false, 20, '_self'),
                 'Open the following in the same window <a href="http://www.ljosa.com" rel="nofollow" target="_self">www.ljosa.com</a>');
    assert.equal(urlize('Open the following in the same window www.ljosa.com', {nofollow: true, trim_url_limit: 20, target: '_self'}),
                 'Open the following in the same window <a href="http://www.ljosa.com" rel="nofollow" target="_self">www.ljosa.com</a>');
  });

  it('autoescape == False and ampersands', function () {
    assert.equal(urlize('http://foo.bar/?a=1&b=2', false, false),
          '<a href="http://foo.bar/?a=1&b=2">http://foo.bar/?a=1&b=2</a>');
    assert.equal(urlize('http://foo.bar/?a=1&b=2', {autoescape: false}),
          '<a href="http://foo.bar/?a=1&b=2">http://foo.bar/?a=1&b=2</a>');
  });

  it('autoescape == True and ampersands', function () {
    assert.equal(urlize('http://foo.bar/?a=1&b=2', false, true),
          '<a href="http://foo.bar/?a=1&amp;b=2">http://foo.bar/?a=1&amp;b=2</a>');
    assert.equal(urlize('http://foo.bar/?a=1&b=2', {autoescape: true}),
          '<a href="http://foo.bar/?a=1&amp;b=2">http://foo.bar/?a=1&amp;b=2</a>');
  });

  it('autoescape == False and troublesome ampersands', function () {
    assert.equal(urlize('http://foo.bar/?a=1&amp;=2', false, false),
          '<a href="http://foo.bar/?a=1&amp;=2">http://foo.bar/?a=1&amp;=2</a>');
    assert.equal(urlize('http://foo.bar/?a=1&amp;=2', {autoescape: false}),
          '<a href="http://foo.bar/?a=1&amp;=2">http://foo.bar/?a=1&amp;=2</a>');
  });

  it('autoescape == True and troublesome ampersands', function () {
    assert.equal(urlize('http://foo.bar/?a=1&amp;=2', false, true),
          '<a href="http://foo.bar/?a=1&amp;amp;=2">http://foo.bar/?a=1&amp;amp;=2</a>');
    assert.equal(urlize('http://foo.bar/?a=1&amp;=2', {autoescape: true}),
          '<a href="http://foo.bar/?a=1&amp;amp;=2">http://foo.bar/?a=1&amp;amp;=2</a>');
  });

  it('autoescape == True and double quotes', function () {
    assert.equal(urlize('http://foo.bar/evilquote"/>script', false, true),
          '<a href="http://foo.bar/evilquote%22/%3Escript">http://foo.bar/evilquote&quot;/&gt;script</a>');
  });

  it('Mixed-case protocol', function () {
    assert.equal(urlize('My Link Http://www.Example.com'),
          'My Link <a href="http://www.Example.com">Http://www.Example.com</a>');
  });

  it('Mixed-case TLD', function () {
    assert.equal(urlize('My Link example.Com'),
          'My Link <a href="http://example.Com">example.Com</a>');
  });

  it('Mixed-case www', function () {
    assert.equal(urlize('My Link Www.example.no'),
          'My Link <a href="http://Www.example.no">Www.example.no</a>');
  });

  it('Consecutive dots', function () {
    assert.equal(urlize('something...edu'), '<a href="http://something...edu">something...edu</a>')
    assert.equal(urlize('something...edu', {django_compatible: false}), 'something...edu')
  })
});

describe('convert_arguments', function () {
  it('single argument', function () {
    deepEqual(urlize.test.convert_arguments(['foo']), {
      autoescape: undefined,
      nofollow: undefined,
      target: undefined,
      trim_url_limit: undefined,
      django_compatible: true
    });
  });

  it('two arguments, second is object', function () {
    var d = {nofollow: true};
    equal(urlize.test.convert_arguments(['foo', d]), d);
  });

  it('two arguments, second is boolean', function () {
    ok(!urlize.test.convert_arguments(['foo', false]).nofollow);
    equal(urlize.test.convert_arguments(['foo', true]).nofollow, true);
  });

  it('three arguments, third is boolean', function () {
    equal(urlize.test.convert_arguments(['foo', false, false]).autoescape, false);
    equal(urlize.test.convert_arguments(['foo', false, true]).autoescape, true);
  });

  it('four arguments, fourth is integer', function () {
    equal(urlize.test.convert_arguments(['foo', false, false, undefined]).trim_url_limit, undefined);
    equal(urlize.test.convert_arguments(['foo', false, false, 0]).trim_url_limit, 0);
    equal(urlize.test.convert_arguments(['foo', false, false, 10]).trim_url_limit, 10);
  });

  it('five arguments, fifth is string', function () {
    equal(urlize.test.convert_arguments(['foo', false, false, undefined, undefined]).target, undefined);
    equal(urlize.test.convert_arguments(['foo', false, false, undefined, '_blank']).target, '_blank');
  });

  it('django_compatible', function () {
    ok(urlize.test.convert_arguments(['foo']).django_compatible);
    ok(!urlize.test.convert_arguments(['foo', {django_compatible: false}]).django_compatible);
  });
});

describe('Improvements over Django', function () {

  it('adjacent angle brackets', function () {
    equal(urlize('<b>http://example.com</b>'), '<b>http://example.com</b>');
    equal(urlize('<b>http://example.com</b>', {django_compatible: false}),
          '<b><a href="http://example.com">http://example.com</a></b>');
    equal(urlize('<b>www.example.com</b>'), '<b>www.example.com</b>');
    equal(urlize('<b>www.example.com</b>', {django_compatible: false}),
          '<b><a href="http://www.example.com">www.example.com</a></b>');
  });

  it('enclosing fancy double quotes', function () {
    equal(urlize('The link “http://example.com” is broken'),
          'The link “http://example.com” is broken');
    equal(urlize('The link “http://example.com” is broken', {django_compatible: false}),
          'The link “<a href="http://example.com">http://example.com</a>” is broken');
    equal(urlize('The link “www.example.com” is broken'),
          'The link “www.example.com” is broken');
    equal(urlize('The link “www.example.com” is broken', {django_compatible: false}),
          'The link “<a href="http://www.example.com">www.example.com</a>” is broken');
  });

  it('enclosing fancy single quotes', function () {
    equal(urlize('The link ‘http://example.com’ is broken'),
          'The link ‘http://example.com’ is broken');
    equal(urlize('The link ‘http://example.com’ is broken', {django_compatible: false}),
          'The link ‘<a href="http://example.com">http://example.com</a>’ is broken');
    equal(urlize('The link ‘www.example.com’ is broken'),
          'The link ‘www.example.com’ is broken');
    equal(urlize('The link ‘www.example.com’ is broken', {django_compatible: false}),
          'The link ‘<a href="http://www.example.com">www.example.com</a>’ is broken');
  });

  it('enclosing double quotes', function () {
    equal(urlize('The link "http://example.com" is broken'),
	  'The link "http://example.com" is broken');
    equal(urlize('The link "http://example.com" is broken', {django_compatible: false}),
	  'The link "<a href="http://example.com">http://example.com</a>" is broken');
    equal(urlize('The link "www.example.com" is broken'),
	  'The link "www.example.com" is broken');
    equal(urlize('The link "www.example.com" is broken', {django_compatible: false}),
	  'The link "<a href="http://www.example.com">www.example.com</a>" is broken');
  });

  it('autoescape = TRUE replaces "/" with "&#47;"', function() {
    equal(urlize('The link http://example.com with escaped / slashes', {autoescape: true}),
          'The link <a href="http://example.com">http://example.com</a> with escaped / slashes');
    equal(urlize('The link http://example.com with escaped / slashes', {django_compatible: false, autoescape: true}),
          'The link <a href=\"http://example.com\">http:&#47;&#47;example.com</a> with escaped &#47; slashes');
  });

  // PENDING
  // it('Colon before', function () {
  //   equal(urlize('Here is the link:http://example.com'),
  // 	  'Here is the <a href="http://link:http://example.com">link:http://example.com</a>');
  //   equal(urlize('Here is the link:http://example.com', {django_compatible: false}),
  // 	  'Here is the link:<a href="http://example.com">http://example.com</a>');
  //   equal(urlize('Here is the link:www.example.com'),
  // 	  'Here is the <a href="http://link:www.example.com">link:www.example.com</a>');
  //   equal(urlize('Here is the link:www.example.com', {django_compatible: false}),
  // 	  'Here is the link:<a href="http://www.example.com">www.example.com</a>');
  // });

  it('End trim period and paren', function () {
    equal(urlize('(Go to http://www.ljosa.priv.no/foo.)', {django_compatible: false}),
	  '(Go to <a href="http://www.ljosa.priv.no/foo">http://www.ljosa.priv.no/foo</a>.)');
  });
});

describe('TLDs', function () {

  it('ccTLDs', function () {
    equal(urlize('example.co, example.io', {top_level_domains: urlize.top_level_domains}),
          '<a href="http://example.co">example.co</a>, <a href="http://example.io">example.io</a>');
  });
  it('ccTLDs should not be recognized by default', function () {
    equal(urlize('example.co, example.io'),
          'example.co, example.io');
  });
  it('Recognize nothing if list of TLDs is empty', function () {
    equal(urlize('example.com, example.io', {top_level_domains: []}),
          'example.com, example.io');
  });
  it('Longer TLDs', function () {
    equal(urlize('about.museum', {top_level_domains: urlize.top_level_domains}),
          '<a href="http://about.museum">about.museum</a>');
  });
  it('Specific TLDs', function () {
    equal(urlize('example.co, example.io', {top_level_domains: ['io']}),
          'example.co, <a href="http://example.io">example.io</a>');
  });

  it('Non-existing TLDs', function () {
    equal(urlize('image.jpg, Mr.Smith'),
          'image.jpg, Mr.Smith');
    equal(urlize('image.jpg, Mr.Smith',
                 {top_level_domains: urlize.top_level_domains}),
          'image.jpg, Mr.Smith');
  });
});

describe('Trimming', function () {
  it('trim: http', function () {
    equal(urlize('http://www.example.com/', {trim: "http"}),
          '<a href="http://www.example.com/">www.example.com/</a>');
  });
  it('trim: www', function () {
    equal(urlize('http://www.example.com/', {trim: "www"}),
          '<a href="http://www.example.com/">example.com/</a>');
  });
  it('no trim', function () {
    equal(urlize('http://www.example.com/'),
          '<a href="http://www.example.com/">http://www.example.com/</a>');
  });
});
