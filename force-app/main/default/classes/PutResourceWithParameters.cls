@RestResource(urlMapping='/contactapi/*')
global with sharing class ContactBasicResouce {
	@HttpPut
	global static Contact doPut(String firstName, String lastName, String leadSource) {
		RestRequest request = RestContext.request;
		String reqURI = request.requestURI;
		String contactId = reqURI.substring(reqURI.lastIndexOf('/') + 1);

		//need to take care with URL
		//https://resilient-panda-jez4nx-dev-ed.my.salesforce.com/services/apexrest/contactapi3/
		//at the end, URL must have the slash(/)
		Contact contact = new Contact();
		if (String.isNotEmpty(contactId)) {
			contact.Id = contactId;
		}

		contact.FirstName = firstName;
		contact.LastName = lastName;
		contact.LeadSource = leadSource;

		upsert contact;
		//put contact;

		return contact;
	}
}
