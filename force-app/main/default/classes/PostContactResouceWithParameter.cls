@RestResource(urlMapping='/contactapi/*')
global with sharing class PostContactResouceWithParameter {
	@HttpPost
	global static Contact createNewContact(String firstName, String lastName, String birthDate, String leadSource) {
		// Initializing New Contact
		Contact contact = new Contact();
		contact.FirstName = firstName;
		contact.LastName = lastName;
		contact.Birthdate = Date.parse(birthDate);
		contact.LeadSource = leadSource;
		// Inserting Contact
		//insert contact;
		// Returning the contact in the response
		return contact;
	}
}
