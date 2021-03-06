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
                     database.DatabaseBill.user == user.nickname()).order(-database.DatabaseBill.date).fetch(),
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
        time.sleep(.1)

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
        goals_list = database.DatabaseGoal.query(           \
                                                database.DatabaseGoal.user == user.nickname()).order(database.DatabaseGoal.date).fetch()
        user_list = database.DatabaseUser.query(database.DatabaseBill.user == user.nickname()).fetch()
        user_zip = ""
        if user_list == []:
            user_zip = "no zipcode entered"
        else:
            user_zip = user_list[0].zipcode

        values = {
            'logoutUrl': users.create_logout_url('/'),
            'userName': user.nickname(),
            'goals': goals_list,
            'zipcode': user_zip
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
        time.sleep(.1)

class LoadData(webapp2.RequestHandler):
    def get(self):
        user = users.get_current_user()
        self.response.headers['Content-Type'] = 'application/json'
        bills_list = database.DatabaseBill.query(       \
                     database.DatabaseBill.user == user.nickname()).order(-database.DatabaseBill.date).fetch()
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
        key = ndb.Key(urlsafe=self.request.get('bill_id'))
        key.delete()
        time.sleep(.1)
        logging.info('tried to delete')
        self.redirect("/data")

class ShowSettings(webapp2.RequestHandler):
    def get(self):
        user = users.get_current_user()
        self.response.headers['Content-Type'] = 'text/html'
        template = jinja_env.get_template('templates/settings.html')
        values = {
            'logoutUrl': users.create_logout_url('/'),
        }
        self.response.write(template.render(values))

    def post(self):
        user = users.get_current_user()
        prof_url = self.request.get('prof_url')
        zipcode = self.request.get('zipcode')
        logging.info('info is:')
        logging.info(zipcode)
        logging.info(prof_url)
        user_list = database.DatabaseUser.query(database.DatabaseBill.user == user.nickname()).fetch()
        if user_list != []:
            for user in user_list:
                user_info = user.key.get()
                user_info.profpic_url = prof_url
                user_info.zipcode = int(zipcode)
                user_info.put()
        else:
            stored_user = database.DatabaseUser(user=user.nickname(), zipcode=int(zipcode), profpic_url=prof_url)
            stored_user.put()
        time.sleep(.1)

class DefaultPage(webapp2.RequestHandler):
    def get(self):
        user = users.get_current_user()
        if user:
            self.redirect('/home')
        else:
            self.redirect('/static/landing.html')

class DeleteGoal(webapp2.RequestHandler):
    def get(self):
        key = ndb.Key(urlsafe=self.request.get('goal_id'))
        key.delete()
        time.sleep(.1)
        self.redirect("/home")

app = webapp2.WSGIApplication([
    ('/', DefaultPage),
    ('/data', ShowData),
    ('/calc', ShowCalc),
    ('/home', ShowHome),
    ('/get_data', LoadData),
    ('/delete_bill', DeleteBill),
    ('/delete_goal', DeleteGoal),
    ('/settings', ShowSettings),
], debug=True)
