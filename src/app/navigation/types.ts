export type RootStackParamList = {
  Search: undefined;
  RepoDetails: {
    owner: string;
    repo: string;
  };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
