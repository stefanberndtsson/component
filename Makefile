DISTDIR=dist
DESTSRV=component.nocrew.org
DESTDIR=/var/www/sites/component
APPENV=production

all: build deploy

build:
	ember build --environment $(APPENV)

deploy:	build
	scp -r $(DISTDIR)/* $(DESTSRV):$(DESTDIR)/
