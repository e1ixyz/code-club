// Sheets Files
function updateRedirectAndAssignmentsFromSheet() {
  const googleSheetsURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRnbOxOtpBxz4xGZaSZFvHKOggqbbIHeQ-R75tb1l-nfVTEJYttADP9sVFCWXPMQMfeHhFZLKJ1w8LC/pub?output=csv';
  
  $.get(googleSheetsURL, function (data) {
      const rows = data.split('\n');

      // Get the redirect link from column A, row 1
      const redirectLinkInHead = rows[0].trim(); // Assuming the first cell in Google Sheets is the redirect link
      $('head meta[http-equiv="refresh"]').attr('content', '0; url=' + encodeURI(redirectLinkInHead));

      // Update the redirect link in the message
      const redirectLink = $('#redirectLink');
      redirectLink.attr('href', encodeURI(redirectLinkInHead));

      // Update assignments list
      const assignmentsContainer = $('.assignments ul');
      for (let i = 1; i < rows.length; i++) {
          const columns = rows[i].split(',');
          if (columns.length >= 3) {
              const assignmentLink = columns[1].trim(); // Get link from column B
              const assignmentDescription = columns[2].trim(); // Get assignment name from column C

              const assignmentElement = $('<a>').attr('href', encodeURI(assignmentLink)).addClass('assignment-link');
              assignmentElement.text(assignmentDescription);

              const listItem = $('<li>').append(assignmentElement);
              assignmentsContainer.append(listItem);
          }
      }
  });
}

updateRedirectAndAssignmentsFromSheet();
