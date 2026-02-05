from pymongo import MongoClient
import sys

try:
    client = MongoClient('localhost', 27017, serverSelectionTimeoutMS=2000)
    # The ismaster command is cheap and does not require auth.
    client.admin.command('ismaster')
    print("Connection Successful")
except Exception as e:
    print(f"Connection Failed: {e}")
    sys.exit(1)
