interface Bookmark {
  url: string;
  name?: string;
  [key: string]: unknown;
}

type BookmarksState = Bookmark[];

interface AddBookmarkAction {
  type: 'ADD_BOOKMARK';
  bookmark: Bookmark;
}

interface RemoveBookmarkAction {
  type: 'REMOVE_BOOKMARK';
  bookmark: Bookmark;
}

type BookmarksAction = AddBookmarkAction | RemoveBookmarkAction;

/* eslint-disable @typescript-eslint/default-param-last */
const bookmarksReducer = (
  state: BookmarksState = [],
  action: BookmarksAction,
): BookmarksState => {
  switch (action.type) {
    case 'ADD_BOOKMARK':
      return [...state, action.bookmark];
    case 'REMOVE_BOOKMARK':
      return state.filter((item) => item.url !== action.bookmark.url);
    default:
      return state;
  }
};
/* eslint-enable @typescript-eslint/default-param-last */

export default bookmarksReducer;
