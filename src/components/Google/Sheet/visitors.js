import config from './config';

/**
 * Load the visitors from the spreadsheet
 * Get the right values from it and assign.
 */
export function load(callback) {
  window.gapi.client.load("sheets", "v4", () => {
    window.gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: config.spreadsheetId,
        range: "RSVP!A2:G"
      })
      .then(
        response => {
          const data = response.result.values;
          const visitors = data.map(visitor => ({
            no: visitor[0],
            nama_lengkap: visitor[1],
            kontak: visitor[2]
          })) || [];
          callback({
            visitors
          });
        },
        response => {
          callback(false, response.result.error);
        }
      );
  });
}

// var values = [
//   [
//     // Cell values ...
//   ],
//   // Additional rows ...
// ];

export function push(values, callback) {
  window.gapi.client.load("sheets", "v4", () => {
    var body = {
      values: values
    };
    window.gapi.client.sheets.spreadsheets.values.append({
       spreadsheetId: config.spreadsheetId,
       range: 'RSVP!A1:G1',
       majorDimension: "ROWS",
       valueInputOption: "USER_ENTERED",
       resource: body
    }).then((response) => {
      var result = response.result;
      console.log(`${result.updates.updatedCells} cells appended.`)
      callback(response);
    });
  });
}