/* Operator On Click Functions */
function onQueueVisitorAnchor_OnClick() {
  _gotoOnQueueVisitors()

  return false
}

function visitorAnchor_OnClick() {
  _gotoVisitors()

  return false
}

function hostAnchor_OnClick() {
  _gotoHosts()

  return false
}

function logoutModalAnchor_OnClick(){
  document.getElementById("logout_modal").classList.toggle("show-logout-modal");

  return false
}


function logoutButton_OnClick() {
  _gotoLogout()

  return false
} 

function hideLogoutModalButton_OnClick(){
  document.getElementById("logout_modal").classList.toggle("show-logout-modal");
}

/* Go to On Queue Visitors module */
function _gotoOnQueueVisitors() {
  window.location.href = "/onqueue_visitors";
}

/* Go to Visitors module */
function _gotoVisitors() {
  window.location.href = "visitors";
}

// Go to Hosts module
function _gotoHosts() {
  window.location.href = "/hosts";
}

function _gotoLogout(){
  window.location.href="/employee_login"
}



/* Admin On Click Functions */

function visitorsListAnchor_OnClick(){
  _gotoVisitorsList()
}

function hostsListAnchor_OnClick(){
  _gotoHostsList()
}

function operatorsListAnchor_OnClick(){
  _gotoOperatorsList()
}

/* Go to Visitors List module */
function _gotoVisitorsList() {
  window.location.href = "/visitors_list";
}

/* Go to Hosts List module */
function _gotoHostsList() {
  window.location.href = "/hosts_list";
}

/* Go to Operators List module */
function _gotoOperatorsList() {
  window.location.href = "/operators_list";
}



