@RestResource(urlMapping='/contactapi/*')
global with sharing class PostContactResouceWithParameter {
	public class ContactWrapper {
		public string firstName { get; set; }
		public string lastName { get; set; }
		public Date birthDate { get; set; }
		public string leadSource { get; set; }
	}

	@HttpPost
	global static Contact doPost() {
		RestRequest request = RestContext.request;
		String requestBody = request.requestBody.toString();

		ContactWrapper contact = (ContactWrapper) JSON.deserialize(requestBody, ContactWrapper.class);

		Contact newContact = new Contact();
		newContact.FirstName = contact.firstName;
		newContact.LastName = contact.lastName;
		newContact.BirthDate = contact.birthDate;
		newContact.LeadSource = contact.leadSource;

		//insert newContact;

		return newContact;
	}
}
