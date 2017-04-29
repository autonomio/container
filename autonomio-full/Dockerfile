FROM phusion/baseimage
CMD ["/sbin/my_init"]

WORKDIR /var/www/html/
ADD . /var/www/html/

RUN apt-get update
RUN apt-get -y install git
RUN apt-get -y install python-pip
RUN apt-get -y install apache2
RUN apt-get -y install php libapache2-mod-php php-mcrypt
RUN apt-get -y install python-tk
RUN apt-get -y install tmux
RUN apt-get -y install locate

RUN pip install --upgrade pip
RUN pip install -r requirements.txt
RUN pip install jinja2
RUN pip install jupyter

RUN python -m spacy download en

RUN chown www-data:www-data -R /var/www/html/
RUN service apache2 restart

EXPOSE 80
ENV NAME World

RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN adduser --disabled-password --gecos "" autonomio
RUN su autonomio
RUN cd

RUN cp -r /var/www/html/autonomio /home/autonomio/autonomio