/**
 * Browser actions for Redux
 */
export const BrowserActionTypes = {
  ADD_TO_VIEWED_DAPP: 'ADD_TO_VIEWED_DAPP',
  TOGGLE_FULLSCREEN: 'TOGGLE_FULLSCREEN',
};

interface AddToViewedDappAction {
  type: typeof BrowserActionTypes.ADD_TO_VIEWED_DAPP;
  hostname: string;
}

/**
 * Adds a new entry to viewed dapps
 *
 * @param hostname - Dapp hostname
 * @returns Action object
 */
export function addToViewedDapp(hostname: string): AddToViewedDappAction {
  return {
    type: BrowserActionTypes.ADD_TO_VIEWED_DAPP,
    hostname,
  };
}

interface AddToHistoryParams {
  url: string;
  name: string;
}

interface AddToHistoryAction {
  type: 'ADD_TO_BROWSER_HISTORY';
  url: string;
  name: string;
}

/**
 * Adds a new entry to the browser history
 *
 * @param website - The website that has been visited
 * @param website.url - The website's url
 * @param website.name - The website name
 * @returns Action object
 */
export function addToHistory({
  url,
  name,
}: AddToHistoryParams): AddToHistoryAction {
  return {
    type: 'ADD_TO_BROWSER_HISTORY',
    url,
    name,
  };
}

interface ClearHistoryAction {
  type: 'CLEAR_BROWSER_HISTORY';
  id: number;
  metricsEnabled: boolean;
  marketingEnabled: boolean | null;
}

/**
 * Clears the entire browser history
 *
 * @param metricsEnabled - Whether metrics are enabled
 * @param marketingEnabled - Whether marketing is enabled
 * @returns Action object
 */
export function clearHistory(
  metricsEnabled: boolean,
  marketingEnabled: boolean | null,
): ClearHistoryAction {
  return {
    type: 'CLEAR_BROWSER_HISTORY',
    id: Date.now(),
    metricsEnabled,
    marketingEnabled,
  };
}

interface AddToWhitelistAction {
  type: 'ADD_TO_BROWSER_WHITELIST';
  url: string;
}

/**
 * Adds a new entry to the whitelist
 *
 * @param url - The website's url
 * @returns Action object
 */
export function addToWhitelist(url: string): AddToWhitelistAction {
  return {
    type: 'ADD_TO_BROWSER_WHITELIST',
    url,
  };
}

interface CloseAllTabsAction {
  type: 'CLOSE_ALL_TABS';
}

/**
 * Closes all the opened tabs
 *
 * @returns Action object
 */
export function closeAllTabs(): CloseAllTabsAction {
  return {
    type: 'CLOSE_ALL_TABS',
  };
}

interface CreateNewTabAction {
  type: 'CREATE_NEW_TAB';
  url: string;
  linkType?: string;
  id: number;
}

/**
 * Creates a new tab
 *
 * @param url - The website's url
 * @param linkType - optional link type
 * @returns Action object
 */
export function createNewTab(
  url: string,
  linkType?: string,
): CreateNewTabAction {
  return {
    type: 'CREATE_NEW_TAB',
    url,
    linkType,
    id: Date.now(),
  };
}

interface CloseTabAction {
  type: 'CLOSE_TAB';
  id: number;
}

/**
 * Closes an exiting tab
 *
 * @param id - The Tab ID
 * @returns Action object
 */
export function closeTab(id: number): CloseTabAction {
  return {
    type: 'CLOSE_TAB',
    id,
  };
}

interface SetActiveTabAction {
  type: 'SET_ACTIVE_TAB';
  id: number;
}

/**
 * Selects an exiting tab
 *
 * @param id - The Tab ID
 * @returns Action object
 */
export function setActiveTab(id: number): SetActiveTabAction {
  return {
    type: 'SET_ACTIVE_TAB',
    id,
  };
}

interface UpdateTabData {
  isArchived?: boolean;
  url?: string;
  image?: string;
  [key: string]: unknown;
}

interface UpdateTabAction {
  type: 'UPDATE_TAB';
  id: number;
  data: UpdateTabData;
}

/**
 * Selects an exiting tab
 *
 * @param id - The Tab ID
 * @param data - Tab data to update
 * @returns Action object
 */
export function updateTab(id: number, data: UpdateTabData): UpdateTabAction {
  return {
    type: 'UPDATE_TAB',
    id,
    data,
  };
}

interface StoreFaviconParams {
  origin: string;
  url: string;
}

interface StoreFaviconAction {
  type: 'STORE_FAVICON_URL';
  origin: string;
  url: string;
}

/**
 * Stores the favicon url using the origin as key
 *
 * @param favicon - favicon to store
 * @param favicon.origin - the origin of the favicon as key
 * @param favicon.url - the favicon image url
 * @returns Action object
 */
export function storeFavicon({
  origin,
  url,
}: StoreFaviconParams): StoreFaviconAction {
  return {
    type: 'STORE_FAVICON_URL',
    origin,
    url,
  };
}

interface ToggleFullscreenAction {
  type: typeof BrowserActionTypes.TOGGLE_FULLSCREEN;
  isFullscreen: boolean;
}

/**
 * Toggles fullscreen mode for the browser
 *
 * @param isFullscreen - Whether to enable fullscreen mode
 * @returns Action object
 */
export function toggleFullscreen(
  isFullscreen: boolean,
): ToggleFullscreenAction {
  return {
    type: BrowserActionTypes.TOGGLE_FULLSCREEN,
    isFullscreen,
  };
}
