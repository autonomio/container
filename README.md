# Autonomio Deep Learning Workbench

A single docker container that inititalizes on any system to Autonomio Augmented intelligence dashboard. 

### Minimum features

- upload data or pick one of the datasets
- perform train and save model
- load model and make predictions 
- GUI and Notebook options

## Docker container contents

As a base image for the container we are using [phusion/baseimage](http://phusion.github.io/baseimage-docker/). You can find all the additions in the docker file. In addition to that there is a simplified access to container management. 

## Use of container management command

To simplify use in comparison to regular docker container user interface, we provide our own signle command and argument namespace. New creates a file 'current.id' which is then over-written by all the other commands so as long as destroy or new is called, the commands are "stuck" in the same container. This should minimize the possibility of deleting other containers by accident. 

NOTE: you can only use this once you already have the autonomio image built, which you do by: 

   docker build -t autonomio .
   
Once that is done, you can move on to using the provided ./container command. 

To create a new container from image: 

    ./container new
    
To stop a running container: 

    ./container stop

To start a stopped container: 

    ./container start
    
To restart a container: 

    ./container restart 
    
To decomission a container: 

    ./container destroy
    
## From repo to container
  
**step 1)** Include in one folder the autonomio module folder, setup.py and requirements.txt 

**step 2)** Combine it with everything in this repo

**step 3)** Inside the folder from command line run: 
      
      docker build -t autonomio .
     
**step 4)** Once the build completes, to test: 
  
      ./container new
      
**step 5)** Open your browser and go to http://localhost:4141
