import webapp2
import logging
import jinja2
import os

from google.appengine.ext import ndb

jinja_env = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

class ShowData(webapp2.RequestHandler):
    def get(self):
        template = jinja_env.get_template('templates/data.html')
        # values = {
        # }
        self.response.write(template.render())

app = webapp2.WSGIApplication([
    ('/data', ShowData),
], debug=True)
