from google.appengine.ext import ndb

class DatabaseBill(ndb.Model):
    util_qty = ndb.FloatProperty()
    util_cost = ndb.FloatProperty()
    date = ndb.IntegerProperty()
    user = ndb.StringProperty()
