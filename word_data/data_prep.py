import re
import json
from collections import Counter


def words(text): return re.findall(r'\w+', text.lower())


WORDS = Counter(words(open('big.txt', 'r').read()))
print(dict(WORDS))

with open('word_proba.json', 'w') as json_file:
    json.dump(dict(WORDS), json_file)
