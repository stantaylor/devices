# devices

Objective
Familiarize yourself with TestCafé and use your JavaScript and Node.js knowledge to overcome the challenge.
 
Links
TestCafe: https://devexpress.github.io/testcafe 
UI: https://github.com/Yastrenky/devices-clientapp
Server: https://github.com/NinjaRMM/devicesTask_serverApp

With Test Café use the provided server and UI to reproduce the next sequence of steps:

Test 1 (required)
·        Make an API call to retrieve the list of devices.
·        Use the list of devices to check the elements are visible in the DOM. Check the name, type and capacity of each element of the list using the class names and make sure they are correctly displayed.
·        Verify that all devices contain the edit and delete buttons.

Test 2 (optional)
·        Verify that devices can be created properly using the UI.
·        Verify the new device is now visible. Check name, type and capacity are visible and correctly displayed to the user.

Test 3 (optional)
·        Make an API call that renames the first device of the list to “Renamed Device”.
·        Reload the page and verify the modified device has the new name.

Test 4 (optional)
·        Make an API call that deletes the last element of the list.
·        Reload the page and verify the element is no longer visible and it doesn’t exist in the DOM.

Expectations
We expect the developer to complete test 1, all other tests are optional but we encourage developers to try them and provide solutions.

Hints
Things to look for in TestCafé
·        Selector()
·        .find()
·        .expect()
·        .nth()
·        .find()
·        .eql()
·        .withText()
·        .visible
·        .exists
·        .ok()

External libraries are allowed.