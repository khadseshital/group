
function groupInputs(groupName, groupDescription) {
  this.groupName = groupName;
  this.groupDescription = groupDescription;
}

class GroupDisplay {
  constructor() {}

  add(arrayInputs) {
    let tableBody = document.getElementById("table-body");
    let htmlToBeAdded = "";
    for (let i = 0; i < arrayInputs.length; i++) {
      htmlToBeAdded += `
        <tr>
          <td>${i + 1}</td>
          <td>${arrayInputs[i].groupName}</td>
          <td>${arrayInputs[i].groupDescription}</td>
          <td> <button type="button" onclick="deleteGroup(${i})" class="dlt-btn btn-primary btn" id="dlt-btn"> Delete </button> </td>
        </tr>
      `;
    }
    tableBody.innerHTML = htmlToBeAdded;
  }

  clear() {
    let groupForm = document.getElementById("groupform");
    groupForm.reset();
  }

  validate(inputs) {
    if (inputs.groupName == "" || inputs.groupDescription == "") {
      return false;
    } else return true;
  }

  alertUser(type, sub, message) {
    let alertUser = document.getElementById("alertuser");
    let htmlToBeAddedInAlert = `
      <div class="alert alert-${type} alert-dismissible fade show" id="alert" role="alert">
        <strong>${sub}</strong> ${message}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </div>`;
    alertUser.innerHTML += htmlToBeAddedInAlert;
    setTimeout(() => {
      alertUser.innerHTML = "";
    }, 4000);
  }
}


function showGroupList() {
  let groupItems = localStorage.getItem("groupItems");
  if (groupItems == null) {
    groupArray = [];
  } else {
    groupArray = JSON.parse(groupItems);
  }
  new GroupDisplay().add(groupArray);
}

showGroupList();


function deleteGroup(index) {
  let groupItems = localStorage.getItem("groupItems");
  if (groupItems == null) {
    groupArray = [];
  } else {
    groupArray = JSON.parse(groupItems);
  }
  groupArray.splice(index, 1);
  localStorage.setItem("groupItems", JSON.stringify(groupArray));
  showGroupList();
}

// Add submit function to the form
const groupForm = document.getElementById("groupform");
groupForm.addEventListener("submit", groupFormSubmit);

function groupFormSubmit(e) {
  e.preventDefault();
  let givenGroupName = document.getElementById("GroupName").value;
  let givenGroupDescription = document.getElementById("GroupDescription").value;

  let groupObject = new groupInputs(givenGroupName, givenGroupDescription);

  let groupDisplayObj = new GroupDisplay();
  if (groupDisplayObj.validate(groupObject)) {
    let groupItems = localStorage.getItem("groupItems");
    if (groupItems == null) {
      groupArray = [];
    } else {
      groupArray = JSON.parse(groupItems);
    }
    groupArray.push(groupObject);
    localStorage.setItem("groupItems", JSON.stringify(groupArray));

    new GroupDisplay().add(groupArray);
    groupDisplayObj.clear();
    groupDisplayObj.alertUser("success", "Success", "Group created successfully");
  } else {
    groupDisplayObj.alertUser("danger", "Oops!", "Please fill out all fields");
  }
}