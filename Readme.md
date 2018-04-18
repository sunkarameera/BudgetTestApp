# Budgeting Test Automation
This section details the set up process to run automation. It also describes the test plan and 3 test cases.

## Setup steps to run Automation
1) Clone the project and go to the root folder
2) Run `npm install` to download all dependencies
3) Run `npm run build` to build the app
4) Run `npm run serve` to serve the app on localhost:3000
5) Run `java -jar -Dwebdriver.gecko.driver=./geckodriver selenium-server-standalone-3.11.0.jar` to run the selenium server
6) Run `./node_modules/.bin/wdio wdio.conf.js` to run the test automation
    _This command should run 3 tests and in the end you should see a test result similar to the following._
![Test Result](https://github.com/sunkarameera/BudgetTestApp/blob/master/screenshot.png)

## What is wdio.conf.js?
We are running automation using a test runner. Wdio config (_wdio.conf.js_) is located in the root folder. This config defines all the properties for running a test. The following properties are defined in the runner.

* `Specs - Location of test cases. All test cases are located in `e2e` folder`
* `Browser - Chrome`
* `Framework - Mocha`
* `Reporter - Dot`
* `Logging level - Silent`
  _In addition to the above, many other properties could be defined in the config, but these are the prominent ones for our automation._

## Test plan
The test plan is located at ![Test Plan](https://github.com/sunkarameera/BudgetTestApp/blob/master/e2e/BudgetingAppTestPlan.docx)

## Test cases
Here we discuss 3 test cases written in the e2e folder.

* **TEST CASE 1**
  _Verify user can add an outflow item successfully_
  Choose a category, such as `Kids`, type an appropriate description and amount. Click Add button to add an outflow item. Once this is done, verify the new item is added as the last row in the table. Also, verify that the total outflow has increased by the amount entered.

* **TEST CASE 2**
  _Verify correct inflow and outflow amounts show up on the inflow vs outflow reports page_
  Get the inflow and outflow amounts on the Budget screen. Go to Reports link's Inflow vs Outflow screen to see the inflow and outflow amounts here. Both sets of values should match.

* **TEST CASE 3(Negative Test Case)**
  _Verify user can enter decimal values for amount using ENTER key_
  Add an outflow item with a category, description and an amount with decimal value eg: 1500.76. Instead of clicking Add button, hit ENTER key to add the value. Check the last row in the table to verify if the new item was added; that is, category, description and amount match with what was entered. If not, the test failed. In this case, the test fails consistently, because an error is thrown when you hit Enter for a decimal value.
    _This is a bug. The user is able to enter decimal values by clicking on Add button but not with Enter key. Also the user is able to enter rounded, non-decimal amounts using ENTER key_
