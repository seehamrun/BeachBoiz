import webapp2
import logging
import jinja2
import os
import datetime
import json

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
        bill_values = {
            'bills': database.DatabaseBill.query().fetch()
        }
        self.response.write(template.render(bill_values))

    def post(self):
        qty = self.request.get('bill_qty')
        cost = self.request.get('bill_cost')
        date = str(self.request.get('bill_date'))
        year = int(date[:4])
        month = int(date[5:7])
        day = int(date[8:10])
        stored_date = datetime.date(year,month,day)
        logging.info(date)
        stored_bill = database.DatabaseBill(util_qty=float(qty), util_cost=float(cost),
                                            date=stored_date)
        stored_bill.put()

        response_html = jinja_env.get_template('templates/data_submitted.html')
        values = {
            'bill': stored_bill
        }
        self.response.write(response_html.render(values))

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

# class LoadData(webapp2.RequestHandler):
#     def get(self):
#         self.response.headers['Content-Type'] = 'application/json'
#         'bills' = database.DatabaseBill.query().fetch()
#         values = {
#
#         }
#         self.response.write(json.dumps(values))
#         #for value in values:
#         #    self.response.write(json.dumps(value))

app = webapp2.WSGIApplication([
    ('/data', ShowData),
    ('/calc', ShowCalc),
    ('/home', ShowHome),
#    ('/get_data', LoadData),
], debug=True)
