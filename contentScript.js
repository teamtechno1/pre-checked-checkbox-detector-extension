
// contentScript.js

// Function to find and return the labels of prechecked checkboxes



function findPrecheckedCheckboxes() {
  const precheckedCheckboxes = [];
  const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  // console.log(checkboxes);

  checkboxes.forEach(function (checkbox) {
    const labelElement = findLabelForCheckbox(checkbox);
    if (labelElement) {
      precheckedCheckboxes.push(labelElement.innerText.trim());
      // precheckedCheckboxes.push(labelElement.innerHTML.trim());
    }
  });
  // console.log(precheckedCheckboxes)
  return precheckedCheckboxes;
}


// Function to find the associated label for a checkbox
function findLabelForCheckbox(checkbox) {
  // Check if the checkbox is inside a label element
  let labelElement = checkbox.closest('label');

  if (!labelElement) {
    // If not, find the label associated with the checkbox
    const id = checkbox.id || checkbox.getAttribute('aria-labelledby');
    if (id) {
      labelElement = document.querySelector(`label[for="${id}"]`);
    }
  }
  // console.log(labelElement)
  return labelElement;
}

// Send a message to the popup with information about prechecked checkboxes
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "getPrecheckedCheckboxes") {
    const precheckedCheckboxes = findPrecheckedCheckboxes();
    sendResponse({ precheckedCheckboxes });
  }
});

