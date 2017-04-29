from autonomio.commands import data,train
from html_template import result, create
import pandas as pd
import sys
import json

j = json.load(open('data_temp/result.json'))

x = str(j['x_var']).strip("'")
y = str(j['y_var']).strip("'")
flatten = str(j['flatten'])
epoch = int(j['epoch'])
dims = int(j['dims'])
batch_size = int(j['batch_size'])
layers = int(j['layers'])
neuron_first = int(j['neuron_first'])
neuron_last = int(j['neuron_last'])
shape = str(j['shape']).strip("'")
loss = str(j['loss'])
optimizer = str(j['optimizer'])
activation = str(j['activation'])
activation_out = str(j['activation_out'])

data = pd.read_csv('data_temp/data.csv')

tr = train(x,y,data,flatten=flatten,epoch=epoch,dims=dims,
			batch_size=batch_size,layers=layers,neuron_first=neuron_first,
			neuron_last=neuron_last,loss=loss,optimizer=optimizer,
			activation=activation,activation_out=activation_out)

train_acc = tr[1].history['acc'][-1]
test_acc = tr[1].history['val_acc'][-1]
train_loss = tr[1].history['loss'][-1]
test_loss = tr[1].history['val_loss'][-1]

train_acc = round(train_acc,3)
test_acc = round(test_acc,3)
train_loss = round(train_loss,3)
test_loss = round(test_loss,3)

html = result(train_acc,test_acc,train_loss,test_loss)
html_out = html[0] + "\n" + html[1] + "\n" + html[2] + "\n" + html[3]
f = open('result.html','w') 
f.write(html_out)
f.close()