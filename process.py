with open ('./raw.txt') as file:
  text = file.read().split('\n')

data = [ text[i].split('\t') for i in range(len(text))]

string = "const data = [ \n"

for i in range(len(data)):
  line = data[i]
  string += "{id:"+line[0]+", reading:'"+line[1]+"', kanjis:'"+line[2]+"', type:'"+line[3]+"', meaning:'"+line[4]+"'}, \n"

string = string[:-3]+"\n]"
print(string)