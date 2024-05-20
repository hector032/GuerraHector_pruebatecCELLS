@dashboard
Feature: As a logged user, I want to access to dashboard

  Scenario: As a User I should be able to see the Dashboard
    Given I'm a logged user
    Then  I should see the dashboard
    Then  I should see at least 1 movements with a title
    Then  It should pass accessibility validations

  Scenario: As a User I should be able to logout
    Given I'm a logged user
    When  I log out
    Then  I should see the login page
  
  Scenario: As a User I should be able to see the movement's detail
    Given I'm a logged user
    Then  I should see the dashboard
    When  I choose movement in position 0
    Then  I should see the detail component

  Scenario: As a User I should be able to see the Help page
    Given I'm a logged user
    When  I view the help page
    Then  I should see a lovely info page