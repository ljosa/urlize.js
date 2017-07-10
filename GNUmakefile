
VERSION = $(shell jq -r .version package.json)
BASENAME = urlize-js-$(VERSION)
DEST = dist/$(BASENAME)

release: $(DEST).tar.gz $(DEST).zip

dist/$(BASENAME).tar.gz: dist/$(BASENAME)
	tar -C dist -cvzf $@ $(BASENAME)

dist/$(BASENAME).zip: dist/$(BASENAME)
	(cd dist; zip -r $(BASENAME).zip $(BASENAME))

SOURCES = urlize.js README.md LICENSE test_urlize.js

$(DEST): urlize.min.js urlize_tlds.js $(SOURCES)
	test ! -e $(DEST)
	test ! -e $(DEST).tmp
	mkdir -p $(DEST).tmp
	cp $+ $(DEST).tmp/
	rm -rf $(DEST)
	mv $(DEST).tmp $(DEST)

maintainer-clean:
	rm -f urlize.min.js urlize_tlds.js README.html root.zone
	rm -rf dist

ALL = urlize.min.js README.html urlize_tlds.js

all: $(ALL)

%.min.js: %.js
	./node_modules/uglify-js/bin/uglifyjs $< > $@.tmp && mv $@.tmp $@ || rm -f $@

TLD_PREFIX = (function (r, f){if(typeof define=='function'\&\&define.amd){define('urlize_tlds',['urlize'],f)}else if(typeof exports=='object'){module.exports = f(require('.\/urlize'))}else{f(r.urlize)}}(this,function(urlize){urlize.top_level_domains=[

urlize_tlds.js: root.zone
	grep 'IN	NS	' root.zone | \
	cut -f1 | sort -u | \
	sed -e "s/^/'/" -e "s/\.$$/',/" | \
	tr -d '\n' | \
	sed -e "s/^'',/$(TLD_PREFIX)/" -e "s/,$$/\];return urlize}))/" > $@.tmp
	mv $@.tmp $@

root.zone:
	curl -O http://www.internic.net/domain/root.zone

README.html: README.md
	md2html $< > $@.tmp
	mv $@.tmp $@
