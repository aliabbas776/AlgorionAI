import os
import django
from pymongo import MongoClient

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'main.settings')
django.setup()

client = MongoClient('127.0.0.1', 27017)
db = client['algorianAI']

print("Collections:")
for coll in db.list_collection_names():
    print(f"- {coll}")
    first = db[coll].find_one()
    if first:
        print(f"  Example ID: {first.get('_id')} (Type: {type(first.get('_id'))})")
    else:
        print("  Empty")
