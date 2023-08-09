type Link = {
  url: string;
  timestamp: number;
  categories: string[];
};

interface PageProps extends AppProps {
  data: any;
  updateLocalData: () => void;
  clearLocalData: () => void;
}
