M=update

update:
	git add -A;
	git commit -m "$(M)";
	git push origin master;
	git push heroku master;
