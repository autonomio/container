from autonomio.commands import data,train
from html_template import result, create
import pandas as pd

# making of the create.html for next step 
html = create()
html_out = html[0] + "\n" + html[1] + "\n" + html[2] + "\n" + html[3] + "\n" + html[4]
f = open('create.html','w') 
f.write(html_out)
f.close()
