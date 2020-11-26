@RestResource(urlMapping='/contactApiWithLimit/*')
global with sharing class ContactResouece {
	@HttpGet
	global static List<Contact> getContactIdNameLeadSource() {
		RestRequest request = RestContext.request;
		Map<String, String> requestParams = request.params;

		Integer queryLimit = Integer.valueOf(requestParams.get('limit'));
		String leadSource = requestParams.get('leadsource');

		List<Contact> contacts = [
			SELECT Id, Name, LeadSource
			FROM Contact
			WHERE leadSource = :leadSource
			LIMIT :queryLimit
		];

		return contacts;
	}
}
