Feature: Available Regions API

  Scenario: List available regions successfully
    Given the Numbers Service is instantiated
    When I send a request to list available regions
    Then the response status should be 200
    And the response body should contain available regions

#  Scenario: List available regions with invalid project ID
#    Given the API server is running
#    When I send a request to list available regions with invalid project ID
#    Then the response status should be 404
#
#  Scenario: List available regions with server error
#    Given the API server is running
#    When I send a request to list available regions and the server encounters an error
#    Then the response status should be 500
