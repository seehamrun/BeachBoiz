from google.appengine.ext import ndb
import datetime

class DatabaseBill(ndb.Model):
    util_qty = ndb.FloatProperty()
    util_cost = ndb.FloatProperty()
    date = ndb.DateProperty()
    user = ndb.StringProperty()
