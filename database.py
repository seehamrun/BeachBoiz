from google.appengine.ext import ndb

class DatabaseBill(ndb.Model):
    util_qty = ndb.IntegerProperty()
    util_cost = ndb.IntegerProperty()
    date = ndb.IntegerProperty()
    user = ndb.StringProperty()
