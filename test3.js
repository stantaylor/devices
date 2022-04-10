import { Selector } from 'testcafe';
import fetch from 'node-fetch';
const Str = require('@supercharge/strings');

fixture`Getting Started`;
// .page`http://localhost:3001/`;

test('Test 3', async t => {

    // Get the /devices endpoint
    let response = await fetch('http://localhost:3000/devices');
    let devicesfromApi = await response.json();
    // console.log(devicesfromApi);

    // verify that there is at least one device returned
    await t.expect(devicesfromApi.length).gte(1);

    // create a new name (I know the instructions said to just call it 'Renamed device'
    // but adding the random string is preferable in my experience)
    let newName = Str.random(10);
    let device1 = await devicesfromApi[0];
    device1.system_name = 'Renamed device ' + newName;

    // Do the PUT to update this device
    response = await fetch('http://localhost:3000/devices/' + device1.id, {
        method: 'put',
        body: JSON.stringify(device1),
        headers: { 'Content-Type': 'application/json' }
    });
    await t.expect(response.status).eql(200);

    // now get the end point for that particular device and verify name
    response = await fetch('http://localhost:3000/devices/' + device1.id);
    let deviceData = await response.json();

    await t.expect(device1.id).eql(deviceData.id);
    await t.expect(device1.system_name).eql(deviceData.system_name);

    // Now you could also
    // * load /devices, find this device in the array and verify its name
    // * load the UI and verify it in the page using the same types of code as in test1
});