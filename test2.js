import { Selector } from 'testcafe';
const Str = require('@supercharge/strings');
import fetch from 'node-fetch';

fixture`Getting Started`
    .page`http://localhost:3001/`;


test('Test 2', async t => {

    // Get the /devices endpoint
    let response = await fetch('http://localhost:3000/devices');
    let devicesfromApi = await response.json();
    let numDevicefFromApi = await devicesfromApi.length;

    let randomName = Str.random(12);
    console.log(randomName);

    await t
        .click('a.submitButton')
        .typeText('input#system_name', randomName)
        .click('select#type')
        .click(Selector('option', { text: 'WINDOWS SERVER' }))
        .typeText('input#hdd_capacity', '13')
        .click('button.submitButton');

    // verify that the new device is displayed
    let deviceInPage = await Selector('.device-main-box').withText(randomName);
    await t.expect(deviceInPage.exists).eql(true);
    // do all the same verifications as in test1. Not going to add them now

    // Get the /devices endpoint and verify one more device
    response = await fetch('http://localhost:3000/devices');
    devicesfromApi = await response.json();
    await t.expect(devicesfromApi.length).eql(numDevicefFromApi + 1);

    // You should/could also verify the rest of the array is the same, verify
    // the properties for this new object are as expected 

});

