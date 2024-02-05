// Sheets Files
function updateRedirectAndAssignmentsFromSheet() {
  const googleSheetsURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTEvrRA2uajNMiYVR_BOl31QXR5oZLd27mNjF_dWtWEDF8VL8_j7I6I9DVoqn2ntW-x2gfawVTQq0tC/pub?output=csv';
  
  $.get(googleSheetsURL, function (data) {
      const rows = data.split('\n');

      // Update the redirect in the head tag
      const redirectLinkInHead = rows[0].trim(); // Assuming the first line in Google Sheets is the redirect link
      $('head meta[http-equiv="refresh"]').attr('content', '0; url=' + redirectLinkInHead);

      // Update the redirect link in the message
      const redirectLink = $('#redirectLink');
      redirectLink.attr('href', redirectLinkInHead);

      // Update assignments list
      const assignmentsContainer = $('.assignments ul');
      for (let i = 1; i < rows.length; i++) {
          const columns = rows[i].split(',');
          if (columns.length >= 3) {
              const assignmentLink = columns[1].trim(); // Get link from column B
              const assignmentDescription = columns[2].trim(); // Get assignment name from column C

              const assignmentElement = $('<a>').attr('href', assignmentLink).addClass('assignment-link');
              assignmentElement.text(assignmentDescription);

              const listItem = $('<li>').append(assignmentElement);
              assignmentsContainer.append(listItem);
          }
      }
  });
}

updateRedirectAndAssignmentsFromSheet();
