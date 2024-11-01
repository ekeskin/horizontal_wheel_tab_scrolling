let activeTabIndex = {};
let windowTabs = {};
let lastActiveWindowId = null;

function updateCount(tabInfo = {}) {
  let query = !tabInfo.windowId ? {currentWindow: true} : {windowId: tabInfo.windowId};
  browser.tabs.query(query).then((tabs) => {
    windowTabs[tabs[0].windowId] = tabs;
  });
}

function onFocusChanged(windowId) {
  lastActiveWindowId = windowId;
}

function setActiveTabIndex(activeInfo){
  lastActiveWindowId = activeInfo.windowId;
  browser.tabs.get(activeInfo.tabId).then((tab) => {
    activeTabIndex[activeInfo.windowId] = tab.index;
  });
}

function getNextTabIndex() {
  return (activeTabIndex[lastActiveWindowId] + 1) % windowTabs[lastActiveWindowId].length;
}

function getPrevTabIndex() {
  return (activeTabIndex[lastActiveWindowId] - 1 + windowTabs[lastActiveWindowId].length) % windowTabs[lastActiveWindowId].length;
}

function getTabID(index) {
  return browser.tabs.query({index: index, windowId: lastActiveWindowId}).then((tabs) => {
    return tabs[0].id;
  });
}

async function nextTab() {
  let index = getNextTabIndex();
  let id = await getTabID(index);
  browser.tabs.update(id, {active: true});
}

async function prevTab() {
  let index = getPrevTabIndex();
  let id = await getTabID(index);
  browser.tabs.update(id, {active: true});
}

async function onMessage(message, aSender) {
	switch (message.topic) {
	case 'scrollUp':
		nextTab();
		break;
	case 'scrollDown':
		prevTab();
		break;
	}
	return false;
}


browser.tabs.onRemoved.addListener(updateCount);
browser.tabs.onCreated.addListener(updateCount);
browser.tabs.onActivated.addListener(setActiveTabIndex);
browser.windows.onFocusChanged.addListener(onFocusChanged);
browser.runtime.onMessage.addListener(onMessage);

updateCount();
