import webapp2
import logging
import jinja2
import os
import datetime
import json
import time

from google.appengine.api import users
from google.appengine.ext import ndb

import database

jinja_env = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

class ShowData(webapp2.RequestHandler):
    def get(self):
        user = users.get_current_user()
        logging.info('current user is %s' % (user.nickname()))
        self.response.headers['Content-Type'] = 'text/html'
        template = jinja_env.get_template('templates/data.html')
        bill_values = {
            'bills': database.DatabaseBill.query(       \
                     database.DatabaseBill.user == user.nickname()).order(database.DatabaseBill.date).fetch(),
            'logoutUrl': users.create_logout_url('/'),
            'user_nickname': user.nickname(),
        }
        self.response.write(template.render(bill_values))

    def post(self):
        user = users.get_current_user()
        qty = self.request.get('bill_qty')
        cost = self.request.get('bill_cost')
        date = str(self.request.get('bill_date'))
        year = int(date[:4])
        month = int(date[5:7])
        day = int(date[8:10])
        stored_date = datetime.date(year,month,day)
        logging.info(date)
        stored_bill = database.DatabaseBill(util_qty=float(qty), util_cost=float(cost),
                                            date=stored_date, user=user.nickname())
        stored_bill.put()

        response_html = jinja_env.get_template('templates/data_submitted.html')
        values = {
            'bill': stored_bill,
            'logoutUrl': users.create_logout_url('/'),
        }
        self.response.write(response_html.render(values))

class ShowCalc(webapp2.RequestHandler):
    def get(self):
        user = users.get_current_user()
        self.response.headers['Content-Type'] = 'text/html'
        template = jinja_env.get_template('templates/calc.html')
        values = {
            'logoutUrl': users.create_logout_url('/'),
        }
        self.response.write(template.render(values))

class ShowHome(webapp2.RequestHandler):
    def get(self):
        user = users.get_current_user()
        self.response.headers['Content-Type'] = 'text/html'
        template = jinja_env.get_template('templates/home.html')
        goals_list = database.DatabaseGoal.query(database.DatabaseBill.user == user.nickname()).fetch()
        values = {
            'logoutUrl': users.create_logout_url('/'),
            'userName': user.nickname(),
            'goals': goals_list,
        }
        self.response.write(template.render(values))

    def post(self):
        user = users.get_current_user()
        qty = self.request.get('goal_qty')
        cost = self.request.get('goal_cost')
        date = str(self.request.get('goal_date'))
        year = int(date[:4])
        month = int(date[5:7])
        day = int(date[8:10])
        stored_date = datetime.date(year,month,day)
        logging.info(date)
        stored_goal = database.DatabaseGoal(goal_qty=float(qty), goal_cost=float(cost),
                                            date=stored_date, user=user.nickname())
        stored_goal.put()

        response_html = jinja_env.get_template('templates/goal_submitted.html')
        values = {
            'goal': stored_goal,
            'logoutUrl': users.create_logout_url('/'),
        }
        self.response.write(response_html.render(values))

class LoadData(webapp2.RequestHandler):
    def get(self):
        user = users.get_current_user()
        self.response.headers['Content-Type'] = 'application/json'
        bills_list = database.DatabaseBill.query(       \
                     database.DatabaseBill.user == user.nickname()).order(database.DatabaseBill.date).fetch()
        json_entries = []
        for bill in bills_list:
            e = {}
            e['qty'] = bill.util_qty
            e['cost'] = bill.util_cost
            e['date'] = bill.date
            json_entries.append(e)
        self.response.write(json.dumps(json_entries, default=str))

class DeleteBill(webapp2.RequestHandler):
    def get(self):
        bill_to_delete = self.request.get('bill_id')
        response_html = jinja_env.get_template('templates/delete_confirm.html')
        key = ndb.Key(urlsafe=bill_to_delete)
        the_bill = key.get()
        data = {
            'bill_id': the_bill.key.urlsafe(),
            'bill': the_bill
        }
        self.response.write(response_html.render(data))

    def post(self):
        key = ndb.Key(urlsafe=self.request.get('bill_id'))
        key.delete()
        time.sleep(.1)
        self.redirect("/data")


class ShowSettings(webapp2.RequestHandler):
    def get(self):
        # user = users.get_current_user()
        self.response.headers['Content-Type'] = 'text/plain'
        #template = jinja_env.get_template('templates/home.html')
        # values = {
        #     'logoutUrl': users.create_logout_url('/'),
        # }
        self.response.write('there are no settings here yet. sorry')

class DefaultPage(webapp2.RequestHandler):
    def get(self):
        user = users.get_current_user()
        if user:
            self.redirect('/home')
        else:
            self.redirect('/static/landing.html')

app = webapp2.WSGIApplication([
    ('/', DefaultPage),
    ('/data', ShowData),
    ('/calc', ShowCalc),
    ('/home', ShowHome),
    ('/get_data', LoadData),
    ('/delete_bill', DeleteBill),
    ('/settings', ShowSettings),
], debug=True)
