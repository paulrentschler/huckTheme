Description

    A Plone product to provide a Plone 3.x compatible theme 
    for the Huck Institutes web site.

Installation

    On the file system:
        - Place HuckTheme in the src/Products.HuckTheme directory
           of your Zope instance.
        - Edit your buildout.cfg file and add Products.HuckTheme to
           the eggs= directive and add src/Products.HuckTheme to the
           develop= directive
        - Rerun buildout (suggest: ./bin/buildout -N)
        - Start your Plone instance

    In the Plone Web Interface:
        - As portal manager, go to 'Portal > Site Setup > Add-on Products'.
        - Select 'HuckTheme' and click the *Install* button.

    Uninstall -- Can be done from the same page.

Written by

    Paul Rentschler <par117@psu.edu>
