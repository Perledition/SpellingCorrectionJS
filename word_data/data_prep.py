import re
import json
from collections import Counter


def words(text): return re.findall(r'\w+', text.lower())


def cleaner(word): return re.sub('[^A-Za-z]+', '', word)


WORDS = Counter(words(open('word_data/big.txt', 'r').read()))
WORDS = dict(WORDS)

DATA = dict()
print(f'word counts before cleansing: {len(WORDS)}')
for k, v in dict(WORDS).items():
    key = cleaner(k)
    if not key.isnumeric() and key not in DATA:
        DATA[key] = v
    elif key in DATA:
        DATA[key] = DATA[key] + v

print(f'word counts before cleansing: {len(DATA)}')

with open('word_proba.json', 'w') as json_file:
    json.dump(DATA, json_file)
