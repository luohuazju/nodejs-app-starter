IMAGE=nodejs-app-starter
TAG=1.1
NAME=nodejs-app-starter
REPOSITORY=027622085883.dkr.ecr.us-west-1.amazonaws.com

docker-context:

build: docker-context
	docker build -t $(REPOSITORY)/$(IMAGE):$(TAG) .

run:
	docker run -d -p 8021:80 -e NODE_ENV=production -v /etc/hosts:/etc/hosts --name $(NAME) $(REPOSITORY)/$(IMAGE):$(TAG)

debug:
	docker run -ti -p 8021:80 -e NODE_ENV=development -v /etc/hosts:/etc/hosts --name $(NAME) $(REPOSITORY)/$(IMAGE):$(TAG) /bin/bash

clean:
	docker stop ${NAME}
	docker rm ${NAME}

logs:
	docker logs ${NAME}

publish:
	docker push  $(REPOSITORY)/$(IMAGE):$(TAG) 
