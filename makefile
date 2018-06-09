NAME=chao

start:
	sudo service mongod start
	node ./bin/www
	
serve:
	node ./bin/www

stop:
	sudo service mongod stop