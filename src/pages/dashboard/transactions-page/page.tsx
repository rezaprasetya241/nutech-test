import { getTransactionsHistory } from "@/api/query/history-transactions/history-transactions-query";
import Profile from "@/components/layout-component/Profile";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDateToWIB } from "@/lib/utils";
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
              className={`p-3 border flex justify-between rounded-lg border-gray-400`}
              key={key}
            >
              <div className="text-xs flex flex-col gap-2">
                <p
                  className={`text-2xl  ${
                    item.transaction_type === "TOPUP"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  + {formatCurrency(item.total_amount, "id-ID", "IDR")}
                </p>
                <p className="text-gray-400">
                  {formatDateToWIB(item.created_on)}
                </p>
              </div>
              <p className="text-xs">{item.description}</p>
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
