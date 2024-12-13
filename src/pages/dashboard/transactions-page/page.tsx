import { getTransactionsHistory } from "@/api/query/history-transactions/history-transactions-query";
import Profile from "@/components/layout-component/Profile";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { AppDispatch, RootState } from "@/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const TransactionPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const history = useSelector((state: RootState) => state.history);

  const handleShowMore = () => {
    dispatch(getTransactionsHistory());
  };
  useEffect(() => {
    dispatch(getTransactionsHistory());
  }, [dispatch]);
  return (
    <div className="pb-32">
      <Profile />
      <div className="mt-8 flex flex-col gap-3">
        <p className="font-semibold text-lg">Semua Transaksi</p>
        {history.data.records.map((item, key) => {
          return (
            <div
              className="p-3 border flex justify-between rounded-lg border-gray-400"
              key={key}
            >
              <div className="text-xs flex flex-col gap-2">
                <p className="text-2xl">
                  + {formatCurrency(10000, "id-ID", "IDR")}
                </p>
                <p>17 agustus 1945 20:45 WIB</p>
              </div>
              <p className="text-xs">Top Up Saldo</p>
            </div>
          );
        })}
        <div className="flex items-center justify-center shadow-none drop-shadow-none">
          <Button
            variant={"ghost"}
            className="text-red-500"
            onClick={handleShowMore}
          >
            Show More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
