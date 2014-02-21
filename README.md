urlize.js
=========

Converts any URLs in text into clickable links.

Works on http://, https://, www. links, and also on links ending in
one of the original seven gTLDs (.com, .edu, .gov, .int, .mil, .net,
and .org).  Links can have trailing punctuation (periods, commas,
close-parens) and leading punctuation (opening parens) and it'll still
do the right thing.

Usage
-----

> `urlize(`*text*`, `*options*`)`
> &#x21D2; *html*

*Text* is the text in which to identify URLs.

*Options* is optional. If present, it should be an object with some of
 the following attributes, all of which default to `undefined`:

- *nofollow*: Set to true in order to add the attribute
`rel="nofollow"` to the generated `A` elements.

- *autoescape*: Set to true in order to have urlize.js escape
characters that have meaning in HTML (&amp;&lt;&gt;&quot;&#39;). You
will almost certainly want to use this option when rendering text
entered by a user in order to avoid spam links and cross-site
scripting attacks.

- *trim\_url\_limit*: Set to a positive integer not less than 3 in order
to truncate the displayed URLs (contents of the A elements) to three
characters less than the specified length and add three periods (...).

- *target*: Set to a string in order to add a `target=""` attribute
to the generated `A` elements. For example, to make generate links
that open in a new window, set to `_blank`.

- *django\_compatible*: Set to false in order to enable URL-detection
  improvements over Django's implementation. This option is true by
  default so that urlize.js in its default mode behaves exactly like
  Django's urlize function. See the section *Compatibility with Django*.

- *top\_level\_domains*: A list of top-level-domains (TLDs) for which
   URLs should be recognized. See the *Top-level domains* section below.

- *trim*: Set to "http" in order to remove the "http://" or "https://"
   from the beginning of the rendered form of the link. Set to "www"
   to also remove "www." if the hostname portion of the URI starts
   with that. Setting this option breaks Django compatibility.

### Top-level domains

By default, urlize.js acts the way Django does: it recognizes URLs
that don't start with "http" or "www" only if their top-level domain
is one of the following: com, edu, gov, int, mil, net, org.

You can give your own list of top-level domains to recognize using the
*top\_level\_domains* option. For instance, if your site is mostly used
in one or a few countries, it may make sense to add their country code
top-level domains—unless you need Django compatibility, of course.

If you would like urlize.js to recognize *all* top-level domains, you
can load the file `top-level-domains.js` after you load
`urlize.js`. This sets `urlize.top_level_domains` to the complete list
of top-level domains. You can then pass its value to the
*top_level_domains* option:

```html
<script type="text/javascript" src="urlize.js"></script>
<script type="text/javascript" src="urlize_tlds.js"></script>
…

urlize('example.museum', {top_level_domains: urlize.top_level_domains})

```


### Options as positional arguments (deprecated)

> `urlize(`*text*`, `*nofollow*`, `*autoescape*`, `*trim_url_limit*`, `*target*` )`
> &#x21D2; *html*

*Text* is the text in which to identify URLs.

The remaining arguments are optional (if not given, they are
`undefined`, which is false). If *nofollow* is true, the attribute
`rel="nofollow"` will be set on the generated `A` elements. If
*autoescape* is true, characters that have meaning in HTML
(&amp;&lt;&gt;&quot;&#39;) will be escaped. If given, *trim_url_limit*
should be a positive integer. The displayed URLs (contents of the A
elements) will be truncated to three characters less than the
specified length, and three periods (...) will be added. `target`
parameter allows you to specify html `target=""` parameter. For 
example, to make generate links that open in a new window, use 
`_blank` as `target` parameter.

Raison d'&ecirc;tre
-------------

Web applications frequently need to identify URLs in text that a user
has entered and render those URLs as clickable hyperlinks. Identifying
URLs is tricky because they are often surrounded by punctuation marks
and because users frequently do not use the full form of the URL.

Many JavaScript functions exist for replacing URLs with hyperlinks,
but I was unable to find one that works as well as the `urlize` filter
in the Python-based web framework [Django](https://www.djangoproject.com/). I therefore ported Django's
`urlize` filter to JavaScript.

Compatibility with Django
-------------------------

It is a goal for urlize.js to, in the default mode, always produce the
same results as the
[`django.utils.html.urlize`](https://docs.djangoproject.com/en/1.4/ref/templates/builtins/)
function in the latest release of
[Django](https://www.djangoproject.com/). That way, a Django
application can render text both on the server side (using Django's
[`urlize`](https://docs.djangoproject.com/en/1.4/ref/templates/builtins/#urlize)
or
[`urlizetrunc`](https://docs.djangoproject.com/en/1.4/ref/templates/builtins/#urlizetrunc)
filter) or on the client side (using this port, e.g., in order to show
a dynamic preview while the text is being entered). Any difference
between the two implementations is considered a bug. See the option
*django_compatible* in the *Usage* section.


