@RestResource(urlMapping='/contactapi/*')
global with sharing class DeleteContactResourceWithSingleParameter {
	@HTTPDelete
	global static Map<String, String> doDelete() {
		Map<String, String> responseMap = new Map<String, String>();
		RestRequest request = RestContext.request;
		String requestURI = request.requestURI;

		Id contactId = Id.valueOf(requestURI.substring(requestURI.lastIndexOf('/') + 1));
		Contact contact = new Contact(Id = contactId);

		try {
			delete contact;
			responseMap.put('success', '1');
			responseMap.put('message', '1');
		} catch (DmlException ex) {
			responseMap.put('success', '0');
			responseMap.put('message', ex.getMessage());
		}

		return responseMap;
	}
}
