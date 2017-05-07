FROM phusion/baseimage
CMD ["/sbin/my_init"]

WORKDIR /var/www/html/
ADD . /var/www/html/

RUN mkdir -p /var/www/html/data_temp
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
RUN pip install git+https://github.com/autonomio/core-module.git

RUN python -m spacy download en

RUN chown www-data:www-data -R /var/www/html/
RUN service apache2 restart
RUN update-rc.d apache2 defaults

EXPOSE 80 8123
ENV NAME World

RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN adduser --disabled-password --gecos "" autonomio
RUN su autonomio
RUN cd

# Add Tini. Tini operates as a process subreaper for jupyter. This prevents
# kernel crashes.
ENV TINI_VERSION v0.6.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /usr/bin/tini
RUN chmod +x /usr/bin/tini
ENTRYPOINT ["/usr/bin/tini", "--"]

CMD ["jupyter", "notebook", "--port=8123", "--no-browser", "--ip=0.0.0.0", "--NotebookApp.token=''", "--NotebookApp.disable_check_xsrf=True", "--allow-root", "--NotebookApp.base_url=./data_temp"]

#CMD ["service", "apache2", "start"]
