from plone.portlet.collection.collection import Renderer

from Products.Five.browser.pagetemplatefile import ViewPageTemplateFile


class myCollectionRenderer(Renderer):

     _template = ViewPageTemplateFile('templates/collection.pt')
