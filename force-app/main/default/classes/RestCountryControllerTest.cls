@isTest
private class RestCountryControllerTest {
	@TestSetup
	static void makeData() {
		RestCountry__c myCountry1 = new RestCountry__c(Name = 'TestRestCountry1');
		insert (myCountry1);

		Currency__c myCurrency1 = new Currency__c(Name = 'myCurrency', RestCountry__c = myCountry1.Id);
		insert (myCurrency1);

		Language__c myLanguage1 = new Language__c(Name = 'myLanguage', RestCountry__c = myCountry1.Id);
		insert (myLanguage1);

		Regional_Block__c myRegBlock1 = new Regional_Block__c(Name = 'myRegBlock', RestCountry__c = myCountry1.Id);
		insert (myRegBlock1);

		RestCountry__c myCountry2 = new RestCountry__c(Name = 'TestRestCountry2');
		insert (myCountry2);

		Currency__c myCurrency2 = new Currency__c(Name = 'myCurrency', RestCountry__c = myCountry2.Id);
		insert (myCurrency2);

		Language__c myLanguage2 = new Language__c(Name = 'myLanguage', RestCountry__c = myCountry2.Id);
		insert (myLanguage2);

		Regional_Block__c myRegBlock2 = new Regional_Block__c(Name = 'myRegBlock', RestCountry__c = myCountry2.Id);
		insert (myRegBlock2);
	}

	@isTest
	static void getRestCountriesTest() {
		RestCountry__c resCountryObj = [SELECT Id FROM RestCountry__c LIMIT 1];
		List<RestCountryController.WrapperCountry> mywrape = new List<RestCountryController.WrapperCountry>();

		Test.startTest();
		mywrape = RestCountryController.getRestCountries();
		Test.stopTest();

		System.assertEquals(2, mywrape.size(), 'Wrapper Country size should be 2');
		System.assertEquals('TestRestCountry1', mywrape[0].Name, 'Name must be TestRestCountry1');
	}

	@isTest
	static void fetchRestCountriesTest() {
		Test.setMock(HttpCalloutMock.class, new MockHttpResponseGenerator());
		Test.startTest();
		List<Object> res = RestCountryController.fetchRestCountries('test');
		Test.stopTest();
		System.assertEquals(null, res, 'Name must be TestRestCountry1');
	}

	@isTest
	static void pushCountriesBulksTest() {
		RestCountry__c resCountryObj = [SELECT Id, Name FROM RestCountry__c LIMIT 1];

		Test.startTest();
		//RestCountryController.pushCountriesBulks('[{"name":"Afghanistan","topLevelDomain":[".af"],"alpha2Code":"AF","alpha3Code":"AFG","callingCodes":["93","94","95"]}]"');
		RestCountryController.pushCountriesBulks(
			'[{"name":"Afghanistan","topLevelDomain":[".af"],"alpha2Code":"AF","alpha3Code":"AFG","callingCodes":["93"],"currencies":[{"code":"AFN","name":"Afghan afghani","symbol":"؋"}]}]"'
		);
		Test.stopTest();

		System.assertEquals('TestRestCountry1', resCountryObj.Name, 'Name must be TestRestCountry1');
	}
}
