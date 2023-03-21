import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
interface IProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

function ReactQueryProvider({ children }: IProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools position="bottom-right" />
    </QueryClientProvider>
  );
}

export default ReactQueryProvider;
