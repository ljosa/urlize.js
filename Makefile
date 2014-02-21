

ALL = urlize.min.js README.html urlize_tlds.js

all: $(ALL)

%.min.js: %.js
	uglifyjs $< > $@.tmp && mv $@.tmp $@ || rm -f $@

urlize_tlds.js: root.zone
	grep 'IN\tNS\t' root.zone | \
	cut -f1 | sort -u | \
	sed -e "s/^/'/" -e "s/\.$$/',/" | \
	tr -d '\n' | \
	sed -e "s/^'',/urlize.top_level_domains = [/" -e "s/,$$/\]\;/" > $@.tmp
	mv $@.tmp $@

root.zone:
	curl -O http://www.internic.net/domain/root.zone

README.html: README.md
	md2html $< > $@.tmp
	mv $@.tmp $@
