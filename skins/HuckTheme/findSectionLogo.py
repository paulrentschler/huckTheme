#  Script (Python) "findSectionLogo"
#
#  Created by: Paul Rentschler
#  Description: based on the current url and the availability of images,
#                the script determines what image should be used for
#                the section logo image and returns the object for display
#

# define the default logo
defaultLogo = context.logos['home-logo.jpg']

# define the resulting logo
logoResult = defaultLogo.absolute_url()


# break the absolute url into pieces at the slash (/)
urlParts = context.absolute_url().split('/')

# determine the section we are in based on the url
section = context.getSectionFromURL().replace('section-', '')


# if there is a section, look for a logo
if section <> "":
  sectionIndex = urlParts.index(section)
  
  # make sure the url goes beyond the major section
  if (len(urlParts) - 1) > sectionIndex:
    # define the name of the section logo
    sectionId = urlParts[sectionIndex + 1]
    sectionLogoName = sectionId + '-logo.jpg'


    # see if a section logo exists in the site
    logoObjs = context.portal_catalog(id = sectionLogoName)
    if len(logoObjs) > 0:
      #logoResult = logoObjs[0].getObject()
      logoResult = ""
      for i in range(0, sectionIndex + 2):
        logoResult += urlParts[i] + "/"
        
      logoResult += sectionLogoName

    else:
      # see if a default section logo exists
      defaultSectionLogoName = section + '-' + sectionLogoName
      if defaultSectionLogoName in context.logos:
        logoResult = context.logos[defaultSectionLogoName].absolute_url()

# return the logo object
return logoResult
