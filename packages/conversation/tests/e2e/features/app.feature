Feature: [Conversation][Apps]
  E2E test for Conversation/Apps API

  Scenario: [Create App] create an app
    Given the Conversation service "Apps" is available
    When I send a request to create an app
    Then the conversation app is created

  Scenario: [List] list all the apps
    Given the Conversation service "Apps" is available
    When I send a request to list all the apps
    Then the apps list contains 2 apps

  Scenario: [Get App] retrieve an app
    Given the Conversation service "Apps" is available
    When I send a request to retrieve an app
    Then the response contains the app details

  Scenario: [Update App] update an app
    Given the Conversation service "Apps" is available
    When I send a request to update an app
    Then the response contains the app details with updated properties

  Scenario: [Delete App] delete an app
    Given the Conversation service "Apps" is available
    When I send a request to delete an app
    Then the delete app response contains no data
