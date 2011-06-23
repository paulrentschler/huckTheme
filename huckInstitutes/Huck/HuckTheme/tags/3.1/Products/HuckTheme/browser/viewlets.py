from zope.component import getMultiAdapter
from Products.Five.browser.pagetemplatefile import ViewPageTemplateFile
from plone.app.layout.viewlets.common import ViewletBase
from plone.app.layout.viewlets import common, content
from Products.CMFCore.utils import getToolByName

class LogoViewlet(ViewletBase):
    index = ViewPageTemplateFile('templates/logo.pt')

    def update(self):
        portal_state = getMultiAdapter((self.context, self.request),
                                            name=u'plone_portal_state')
        self.navigation_root_url = portal_state.navigation_root_url()

class SearchBoxViewlet(common.SearchBoxViewlet):
    index = ViewPageTemplateFile('templates/searchbox.pt')

class SiteActionsViewlet(common.SiteActionsViewlet):
    index = ViewPageTemplateFile('templates/site_actions.pt')

class PersonalBarViewlet(common.PersonalBarViewlet):
    index = ViewPageTemplateFile('templates/personal_bar.pt')

    def update(self):
        common.PersonalBarViewlet.update(self)
        mt = getToolByName(self.context, 'portal_membership')
        self.canManagePortlets = mt.checkPermission('Portlets: Manage portlets', self.context)
        self.canManagePortal = mt.checkPermission('Manage portal', self.context)
        
        # get the current page's url for the manage portlet links
        self.contextUrl = self.context.absolute_url
        
        # change the homelink_url property to point to the user's FSD profile (if they have one)
        if (not self.anonymous and self.context.facultystaffdirectory_tool.fsdMyFolder() != ''):
            self.homelink_url = self.context.facultystaffdirectory_tool.fsdMyFolder()

class DocumentBylineViewlet(content.DocumentBylineViewlet):
    index = ViewPageTemplateFile('templates/document_byline.pt')

    def update(self):
        content.DocumentBylineViewlet.update(self)
        mt = getToolByName(self.context, 'portal_membership')
        self.canManagePortal = mt.checkPermission('Manage portal', self.context)
