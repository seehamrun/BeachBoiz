import webapp2
import logging
import jinja2
import os

from google.appengine.ext import ndb

import database

jinja_env = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

class ShowData(webapp2.RequestHandler):
    def get(self):
        self.response.headers['Content-Type'] = 'text/html'
        template = jinja_env.get_template('templates/data.html')
        values = {
            'bills': database.DatabaseBill.query().fetch()
        }
        self.response.write(template.render(values))

    def post(self):
        qty = self.request.get('bill_qty')
        cost = self.request.get('bill_cost')
        date = self.request.get('bill_date')
        stored_bill = database.DatabaseBill(util_qty=float(qty), util_cost=float(cost),
                                            date=int(date))
        stored_bill.put()

class ShowCalc(webapp2.RequestHandler):
    def get(self):
        self.response.headers['Content-Type'] = 'text/html'
        template = jinja_env.get_template('templates/calc.html')
        # values = {
        # }
        self.response.write(template.render())

class ShowHome(webapp2.RequestHandler):
    def get(self):
        self.response.headers['Content-Type'] = 'text/html'
        template = jinja_env.get_template('templates/home.html')
        # values = {
        # }
        self.response.write(template.render())

app = webapp2.WSGIApplication([
    ('/data', ShowData),
    ('/calc', ShowCalc),
    ('/home', ShowHome),
], debug=True)
