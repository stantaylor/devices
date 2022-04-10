import { Selector } from 'testcafe';
import fetch from 'node-fetch';
const Str = require('@supercharge/strings');

fixture`Getting Started`
    .page`http://localhost:3001/`;

test('Test 1', async t => {


    // Get the /devices endpoint
    let response = await fetch('http://localhost:3000/devices');
    let devicesfromApi = await response.json();
    let numDevicefFromApi = await devicesfromApi.length;


    // get the list of devices from the page
    let devicesInPage = await Selector('.device-main-box');
    let numDevicesInPage = await devicesInPage.count;

    // verify that the API and page show the same number of devices
    await t.expect(numDevicefFromApi).eql(numDevicesInPage);

    // verify info about each device from the API
    for (let i = 0; i < devicesfromApi.length; i++) {
        let devicefromApi = await devicesfromApi[i];
        console.log('Verifying device in page: ' + devicefromApi.id + ' / ' + devicefromApi.system_name);

        // get the DOM chunk for this device
        let deviceInPage = await Selector('.device-main-box').withText(devicefromApi.system_name);

        // verify the device info
        await t.expect(deviceInPage.find('.device-name').innerText).eql(devicefromApi.system_name);
        await t.expect(deviceInPage.find('.device-name').visible).eql(true);

        await t.expect(deviceInPage.find('.device-type').innerText).eql(devicefromApi.type);
        await t.expect(deviceInPage.find('.device-type').visible).eql(true);

        await t.expect(deviceInPage.find('.device-capacity').innerText).contains(devicefromApi.hdd_capacity);
        await t.expect(deviceInPage.find('.device-capacity').visible).eql(true);

        // verify the edit button
        await t.expect(deviceInPage.find('a.device-edit').exists).eql(true);
        await t.expect(deviceInPage.find('a.device-edit').visible).eql(true);
        let attributes = await deviceInPage.find('a.device-edit').attributes;
        await t.expect(attributes.href).eql('/devices/edit/' + devicefromApi.id);

        // verify the delete button
        await t.expect(deviceInPage.find('button.device-remove').exists).eql(true);
        await t.expect(deviceInPage.find('button.device-remove').visible).eql(true);
        attributes = await deviceInPage.find('button.device-remove').attributes;

    }

});