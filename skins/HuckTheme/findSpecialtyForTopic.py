#  Script (Python) "findSpecialtyForTopic"
#
#  Created by: Eric Steele / Paul Rentschler
#  Description: used to look up and return the specialty specified
#                in the criteria of the topic
#

if (u'crit__getRawSpecialties_ATReferenceCriterion' in [c.id for c in context.listCriteria()]):
  specialtyUID= context.getCriterion('getRawSpecialties_ATReferenceCriterion').getCriteriaItems()[0][1]['query'][0]
  return context.archetype_tool.lookupObject(specialtyUID)

else:
  return None
