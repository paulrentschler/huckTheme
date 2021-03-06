#  Script (Python) "findSectionLogo"
#
#  Created by: Paul Rentschler
#  Description: based on the current url and the availability of images,
#                the script determines what image should be used for
#                the section logo image and returns the object for display
#

# set the default alt text
altText = "Graphic logo for the current section of the website"

# define the default logo
try:
    defaultLogo = context.logos['section-logo-default.jpg']
    logoResult = defaultLogo.absolute_url()
    altText = "Students walk past the Life Sciences building on the Shortledge Mall"
except:
    defaultLogo = 'http://www.huck.psu.edu/_images/section-logo-default.jpg'
    logoResult = defaultLogo
    altText = "Students walk past the Life Sciences building on the Shortledge Mall"


# break the absolute url into pieces at the slash (/)
urlParts = context.absolute_url().split('/')

# determine the section we are in based on the url
section = context.getSectionFromURL().replace('section-', '')


# if there is a section, look for a logo
if section <> "":
    try:
        sectionIndex = urlParts.index(section)
    
        # make sure the url goes beyond the major section
        if (len(urlParts) - 1) > sectionIndex:
            # define the name of the section logo
            sectionId = urlParts[sectionIndex + 1]
            sectionLogoName = sectionId + '-logo.jpg'


            # see if a section logo exists in the site
            logoObjs = context.portal_catalog(id = sectionLogoName)
            if len(logoObjs) > 0:
                try:
                    altText = logoObjs[0].Description
                except:
                    pass
                    
                #logoResult = logoObjs[0].getObject()
                logoResult = ""
                for i in range(0, sectionIndex + 2):
                    logoResult += urlParts[i] + "/"
        
                logoResult += sectionLogoName

            else:
                # see if a default section logo exists
                defaultSectionLogoName = section + '-' + sectionLogoName
                try:
                    if defaultSectionLogoName in context.logos:
                        logoResult = context.logos[defaultSectionLogoName].absolute_url()
                except:
                    pass
    except:
        pass

# return the logo object
return (logoResult, altText)
