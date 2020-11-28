@RestResource(urlMapping='/contactapi/*')
global with sharing class DeleteResourceWithMultipleParameter {
	global class ResponseWrapper {
		String success { get; set; }
		String message { get; set; }
	}

	@HttpDelete
	global static List<ResponseWrapper> doDeletes() {
		List<ResponseWrapper> wrappers = new List<ResponseWrapper>();
		RestRequest request = RestContext.request;

		String reqURI = request.requestURI;
		String[] contactIds = (reqURI.substring(reqURI.lastIndexOf('/') + 1)).split(',');

		List<Contact> deleteContacts = new List<Contact>();
		for (String contactId : contactIds) {
			Contact contact = new Contact(Id = contactId);
			deleteContacts.add(contact);
		}

		Database.DeleteResult[] deleteResults = Database.delete(deleteContacts, false);
		for (Database.DeleteResult deleteResult : deleteResults) {
			ResponseWrapper wrapper = new ResponseWrapper();
			if (deleteResult.isSuccess()) {
				wrapper.success = '1';
				wrapper.message = 'Successfully delete contact with Id::' + deleteResult.getId();
			} else {
				wrapper.success = '0';

				for (Database.Error error : deleteResult.getErrors()) {
					wrapper.message =
						'The following error has occurred for contact with Id::' +
						deleteResult.getId() +
						'. ';
					wrapper.message += error.getStatusCode() + ': ' + error.getMessage() + '. ';
					wrapper.message += 'Contact fields that affected this error: ' + error.getFields();
				}
			}

			wrappers.add(wrapper);
		}
		return wrappers;
	}
}
