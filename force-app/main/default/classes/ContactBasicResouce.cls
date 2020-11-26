@RestResource(urlMapping='/contactAPI/*')
global with sharing class ContactBasicResouce {
	@HTTPGET
	global static List<Contact> getContactsIdName() {
		RestRequest request = RestContext.request;

		String requestUri = getURIFromRequest(request);

		Integer contactLimit = getParameterFromURI(requestUri);

		List<Contact> contactList = [SELECT Id, Name FROM Contact LIMIT :contactLimit];

		return contactList;
	}

	private static String getURIFromRequest(RestRequest request) {
		return request.requestURI;
	}

	private static Integer getParameterFromURI(String uri) {
		return Integer.valueOf(uri.substring(uri.lastIndexOf('/') + 1));
	}
}
