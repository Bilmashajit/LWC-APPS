public with sharing class RestCountryController {
	public class WrapperCountry {
		@AuraEnabled
		public String name { get; set; }
		@AuraEnabled
		public List<String> topLevelDomain { get; set; }
		@AuraEnabled
		public String alpha2Code { get; set; }
		@AuraEnabled
		public String alpha3Code { get; set; }
		@AuraEnabled
		public List<String> callingCodes { get; set; }
		@AuraEnabled
		public String capital { get; set; }
		@AuraEnabled
		public List<String> altSpellings { get; set; }
		@AuraEnabled
		public String region { get; set; }
		@AuraEnabled
		public String subregion { get; set; }
		@AuraEnabled
		public Integer population { get; set; }
		@AuraEnabled
		public List<String> latlng { get; set; }
		@AuraEnabled
		public String demonym { get; set; }
		@AuraEnabled
		public Integer area { get; set; }
		@AuraEnabled
		public Decimal gini { get; set; }
		@AuraEnabled
		public List<String> timezones { get; set; }
		@AuraEnabled
		public List<String> borders { get; set; }
		@AuraEnabled
		public String nativeName { get; set; }
		@AuraEnabled
		public String numericCode { get; set; }
		@AuraEnabled
		public List<CountryCurrency> currencies { get; set; }
		@AuraEnabled
		public List<Language> languages { get; set; }
		@AuraEnabled
		public Translation translations { get; set; }
		@AuraEnabled
		public String flag { get; set; }
		@AuraEnabled
		public List<RegionalBlocs> regionalBlocs { get; set; }
		@AuraEnabled
		public String cioc { get; set; }
	}

	public class CountryCurrency {
		@AuraEnabled
		public String code { get; set; }
		@AuraEnabled
		public String name { get; set; }
		@AuraEnabled
		public String symbol { get; set; }
	}

	public class Language {
		@AuraEnabled
		public String iso639_1 { get; set; }
		@AuraEnabled
		public String iso639_2 { get; set; }
		@AuraEnabled
		public String name { get; set; }
		@AuraEnabled
		public String nativeName { get; set; }
	}
	public class Translation {
		@AuraEnabled
		public String Name { get; set; }
		@AuraEnabled
		public String Value { get; set; }
	}
	public class RegionalBlocs {
		@AuraEnabled
		public String acronym { get; set; }
		@AuraEnabled
		public String name { get; set; }
		@AuraEnabled
		public List<String> otherAcronyms { get; set; }
		@AuraEnabled
		public List<String> otherNames { get; set; }
	}

	//@future
	//@future(callout=true)
	@AuraEnabled
	public static List<WrapperCountry> getRestCountries() {
		List<WrapperCountry> wrapperCountryObjs = new List<WrapperCountry>();

		for (RestCountry__c myCountry : [
			SELECT
				Id,
				Name,
				Top_Level_Domain__c,
				Alpha_3_Code__c,
				Alpha_2_Code__c,
				Calling_Codes__c,
				Capital__c,
				Alt_Spellings__c,
				Region__c,
				Sub_Region__c,
				Population__c,
				Demonym__c,
				Latlng__c,
				Area__c,
				Gini__c,
				Time_Zones__c,
				Borders__c,
				Native_Name__c,
				Numeric_Code__c,
				Flag__c,
				Cioc__c,
				(SELECT Id, Name, Code__c, Symbol__c, RestCountry__c FROM Currencies__r),
				(SELECT Id, Name, Iso639_1__c, Iso639_2__c, Native_Name__c, RestCountry__c FROM Languages__r),
				(SELECT Id, Name, Acronym__c, Other_Acronyms__c, Other_Names__c, RestCountry__c FROM RegionalBlocks__r)
			FROM RestCountry__c
		]) {
			WrapperCountry myWrapperCountry = new WrapperCountry();

			myWrapperCountry = formatRestCountryData(myCountry);

			myWrapperCountry.currencies = formatCountryCurrencyData(myCountry.Currencies__r);
			myWrapperCountry.languages = formatCountryLanguageData(myCountry.Languages__r);
			if (myCountry.RegionalBlocks__r != null) {
				myWrapperCountry.regionalBlocs = formatCountryRegionalData(myCountry.RegionalBlocks__r);
			}

			wrapperCountryObjs.add(myWrapperCountry);
		}

		System.debug(wrapperCountryObjs);

		return wrapperCountryObjs;
	}

	public static List<CountryCurrency> formatCountryCurrencyData(List<Currency__c> myCurrencies) {
		List<CountryCurrency> myWrapperCurrencies = new List<CountryCurrency>();

		for (Currency__c myCurrency : myCurrencies) {
			CountryCurrency myWrapperCurrency = new CountryCurrency();

			myWrapperCurrency.name = myCurrency.Name;
			myWrapperCurrency.code = myCurrency.Code__c;
			myWrapperCurrency.symbol = myCurrency.Symbol__c;

			myWrapperCurrencies.add(myWrapperCurrency);
		}

		return myWrapperCurrencies;
	}

	public static List<Language> formatCountryLanguageData(List<Language__c> myLanguages) {
		List<Language> myWrapperLanguages = new List<Language>();

		for (Language__c myLanguage : myLanguages) {
			Language myWrapeLanguage = new Language();

			myWrapeLanguage.name = myLanguage.Name;
			myWrapeLanguage.nativeName = myLanguage.Native_Name__c;
			myWrapeLanguage.iso639_1 = myLanguage.Iso639_1__c;
			myWrapeLanguage.iso639_2 = myLanguage.Iso639_2__c;

			myWrapperLanguages.add(myWrapeLanguage);
		}

		return myWrapperLanguages;
	}
	public static List<RegionalBlocs> formatCountryRegionalData(List<Regional_Block__c> myRegionalBlocks) {
		List<RegionalBlocs> myWrapperRegionalBlocks = new List<RegionalBlocs>();

		for (Regional_Block__c myRegionalBlock : myRegionalBlocks) {
			RegionalBlocs myWrapeRegionalBlock = new RegionalBlocs();

			myWrapeRegionalBlock.name = myRegionalBlock.Name;
			myWrapeRegionalBlock.acronym = myRegionalBlock.Acronym__c;
			myWrapeRegionalBlock.otherAcronyms = formatStringToArray(myRegionalBlock.Other_Acronyms__c);
			myWrapeRegionalBlock.otherNames = formatStringToArray(myRegionalBlock.Other_Names__c);

			myWrapperRegionalBlocks.add(myWrapeRegionalBlock);
		}

		return myWrapperRegionalBlocks;
	}

	public static WrapperCountry formatRestCountryData(RestCountry__c myCountry) {
		WrapperCountry myWrapperCountry = new WrapperCountry();
		myWrapperCountry.name = myCountry.Name;
		myWrapperCountry.nativeName = myCountry.Native_Name__c;
		myWrapperCountry.alpha2Code = myCountry.Alpha_2_Code__c;
		myWrapperCountry.altSpellings = formatStringToArray(myCountry.Alt_Spellings__c);
		myWrapperCountry.alpha3Code = myCountry.Alpha_3_Code__c;
		myWrapperCountry.area = (Integer) myCountry.Area__c;
		myWrapperCountry.borders = formatStringToArray(myCountry.Borders__c);
		myWrapperCountry.callingCodes = formatStringToArray(myCountry.Calling_Codes__c);
		myWrapperCountry.capital = myCountry.Capital__c;
		myWrapperCountry.cioc = myCountry.Cioc__c;
		//myWrapperCountry.currencies=myCountry.xx;
		myWrapperCountry.demonym = myCountry.Demonym__c;
		myWrapperCountry.flag = myCountry.Flag__c;
		myWrapperCountry.gini = myCountry.Gini__c;
		//myWrapperCountry.languages=myCountry.xx;
		myWrapperCountry.latlng = formatStringToArray(myCountry.Latlng__c);
		myWrapperCountry.numericCode = myCountry.Numeric_Code__c;
		myWrapperCountry.population = (Integer) myCountry.Population__c;
		myWrapperCountry.region = myCountry.Region__c;
		// myWrapperCountry.regionalBlocs=myCountry.xx;
		myWrapperCountry.subregion = myCountry.Sub_Region__c;
		myWrapperCountry.timezones = formatStringToArray(myCountry.Time_Zones__c);
		myWrapperCountry.topLevelDomain = formatStringToArray(myCountry.Top_Level_Domain__c);
		//myWrapperCountry.translations=myCountry.xx;

		return myWrapperCountry;
	}

	public static List<String> formatStringToArray(String pyaload) {
		if (String.isBlank(pyaload))
			return new List<String>();

		return pyaload.split(',');
	}

	public static String formatArrayToString(List<String> pyaload) {
		if (pyaload == null)
			return '';
		if (pyaload.size() == 0)
			return '';

		return String.join(pyaload, ',');
	}

	@AuraEnabled
	public static List<Object> fetchRestCountries(String strEndPointURL) {
		List<Object> mapJsonData = new List<Object>();
		String strResponse = null;

		if (String.isNotBlank(strEndPointURL)) {
			HttpRequest httpRequest = new HttpRequest();
			httpRequest.setEndpoint(strEndPointURL);

			httpRequest.setMethod('GET');
			httpRequest.setHeader('Authorization', 'OAuth ' + UserInfo.getSessionId());
			httpRequest.setHeader('Authorization', 'Bearer ' + UserInfo.getSessionId());

			try {
				Http http = new Http();
				HttpResponse httpResponse = http.send(httpRequest);

				while (httpResponse.getStatusCode() == 302) {
					httpRequest.setEndpoint(httpResponse.getHeader('Location'));
					httpResponse = new Http().send(httpRequest);
				}

				if (httpResponse.getStatusCode() == 200) {
					strResponse = httpResponse.getBody();
				} else {
					throw new CalloutException(httpResponse.getBody());
				}
			} catch (Exception ex) {
				throw ex;
			}
		}

		if (!String.isBlank(strResponse)) {
			mapJsonData = (List<Object>) JSON.deserializeUntyped(strResponse);
		}

		if (!mapJsonData.isEmpty()) {
			return mapJsonData;
		} else {
			return null;
		}
	}

	@AuraEnabled
	public static void pushCountriesBulks(String payload) {
		List<WrapperCountry> payloadObject = new List<WrapperCountry>();

		//System.debug(countries);
		try {
			if (!String.isBlank(payload)) {
				payloadObject = (List<WrapperCountry>) JSON.deserialize(payload, List<WrapperCountry>.class);
			}

			for (WrapperCountry myWrpCountry : payloadObject) {
				RestCountry__c myCountry = new RestCountry__c();

				myCountry = RestCountryController.pushContry(myWrpCountry);
				insert myCountry;
				System.debug('myCountry inserted ::: ');

				if (myWrpCountry.currencies != null) {
					List<Currency__c> myCountryCurrency = new List<Currency__c>();
					myCountryCurrency = RestCountryController.pushCurrencies(myWrpCountry, myCountry.Id);
					insert myCountryCurrency;
					System.debug('myCountryCurrency inserted ::: ');
				}

				if (myWrpCountry.languages != null) {
					List<Language__c> languages = new List<Language__c>();
					languages = RestCountryController.pushLanguages(myWrpCountry, myCountry.Id);
					insert languages;
					System.debug('languages inserted ::: ');
				}

				if (myWrpCountry.regionalBlocs != null) {
					List<Regional_Block__c> rBlocks = new List<Regional_Block__c>();
					rBlocks = RestCountryController.pushRegionalBlocks(myWrpCountry, myCountry.Id);
					insert rBlocks;
					System.debug('rBlocks inserted ::: ');
				}
			}
		} catch (Exception ex) {
			System.debug('ERROR ::: ' + ex.getMessage());
		}
	}

	public static List<Regional_Block__c> pushRegionalBlocks(WrapperCountry myWrpCountry, Id countryId) {
		List<Regional_Block__c> regionalBlocks = new List<Regional_Block__c>();

		for (RegionalBlocs myWrpRBlock : myWrpCountry.regionalBlocs) {
			Regional_Block__c myRBlock = new Regional_Block__c();

			myRBlock.Name = myWrpRBlock.name;
			myRBlock.Acronym__c = myWrpRBlock.acronym;
			myRBlock.Other_Names__c = formatArrayToString(myWrpRBlock.otherNames);
			myRBlock.Other_Acronyms__c = formatArrayToString(myWrpRBlock.otherAcronyms);

			myRBlock.RestCountry__c = countryId;

			regionalBlocks.add(myRBlock);
		}

		return regionalBlocks;
	}

	public static List<Language__c> pushLanguages(WrapperCountry myWrpCountry, Id countryId) {
		List<Language__c> languages = new List<Language__c>();

		for (Language myWrpLanguage : myWrpCountry.languages) {
			Language__c myLanguage = new Language__c();

			myLanguage.Name = myWrpLanguage.name;
			myLanguage.Native_Name__c = myWrpLanguage.nativeName;
			myLanguage.Iso639_1__c = myWrpLanguage.iso639_1;
			myLanguage.Iso639_2__c = myWrpLanguage.iso639_2;

			myLanguage.RestCountry__c = countryId;

			languages.add(myLanguage);
		}

		return languages;
	}

	public static List<Currency__c> pushCurrencies(WrapperCountry myWrpCountry, Id countryId) {
		List<Currency__c> myCountryCurrency = new List<Currency__c>();

		for (CountryCurrency myWrpCurrency : myWrpCountry.currencies) {
			Currency__c myCurrency = new Currency__c();

			myCurrency.Name = myWrpCurrency.name;
			myCurrency.Code__c = myWrpCurrency.code;
			myCurrency.Symbol__c = myWrpCurrency.symbol;
			myCurrency.RestCountry__c = countryId;

			myCountryCurrency.add(myCurrency);
		}

		return myCountryCurrency;
	}

	public static RestCountry__c pushContry(WrapperCountry myWrpCountry) {
		RestCountry__c myCountry = new RestCountry__c();

		myCountry.Name = myWrpCountry.name;
		myCountry.Top_Level_Domain__c = formatArrayToString(myWrpCountry.topLevelDomain);

		myCountry.Alpha_2_Code__c = myWrpCountry.alpha2Code;
		myCountry.Alpha_3_Code__c = myWrpCountry.alpha3Code;
		myCountry.Calling_Codes__c = formatArrayToString(myWrpCountry.callingCodes);
		myCountry.Capital__c = myWrpCountry.capital;
		myCountry.Alt_Spellings__c = formatArrayToString(myWrpCountry.altSpellings);
		myCountry.Region__c = myWrpCountry.region;
		myCountry.Sub_Region__c = myWrpCountry.subregion;
		myCountry.Population__c = myWrpCountry.population;
		myCountry.Latlng__c = formatArrayToString(myWrpCountry.latlng);
		myCountry.Demonym__c = myWrpCountry.demonym;
		myCountry.Area__c = myWrpCountry.area;
		myCountry.Gini__c = myWrpCountry.gini;
		myCountry.Time_Zones__c = formatArrayToString(myWrpCountry.timezones);
		myCountry.Borders__c = formatArrayToString(myWrpCountry.borders);
		myCountry.Native_Name__c = myWrpCountry.nativeName;
		myCountry.Numeric_Code__c = myWrpCountry.numericCode;
		myCountry.Flag__c = myWrpCountry.flag;
		myCountry.Cioc__c = myWrpCountry.cioc;

		return myCountry;
	}
}
