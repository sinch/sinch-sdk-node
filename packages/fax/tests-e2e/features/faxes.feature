Feature: [Fax][Faxes]
  E2E test for Fax/Faxes API

  Scenario: [Send] send a fax
    Given the Fax service is available
    When I send a request to send a fax
    Then the response contains a fax object

  Scenario: [Get] retrieve a fax
    Given the Fax service is available
    When I send a request to retrieve a fax
    Then the response contains a fax object

  Scenario: [List] lists faxes
    Given the Fax service is available
    When I send a request to list faxes
    Then the response contains "2" faxes

  Scenario: [List] lists all faxes
    Given the Fax service is available
    When I send a request to list all the faxes
    Then the faxes list contains "3" faxes

  Scenario: [DownloadContent] download a fax content
    Given the Fax service is available
    When I send a request to download a fax content as PDF
    Then the response contains a PDF document

  Scenario: [DeleteContent] delete a fax content
    Given the Fax service is available
    When I send a request to delete a fax content on the server
    Then the response contains no data
