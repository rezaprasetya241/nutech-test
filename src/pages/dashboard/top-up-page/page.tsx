import { topUpBalance } from "@/api/query/top-up/top-up-query";
import Profile from "@/components/layout-component/Profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/utils";
import { updateBalance } from "@/state/dashboard/balance/balanceSlice";
import { AppDispatch, RootState } from "@/store";
import { useState } from "react";
import { FaRegKeyboard } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const TopUpPage = () => {
  const price = [10000, 20000, 50000, 100000, 250000, 500000];
  const [balance, setBalance] = useState<number>(0);
  const { error } = useSelector((state: RootState) => state.topUp);
  const dispatch = useDispatch<AppDispatch>();
  const { toast } = useToast();

  const onSubmit = async () => {
    const response = await dispatch(topUpBalance({ top_up_amount: balance }));
    if (error !== null) {
      toast({
        variant: "destructive",
        title: "Top Up Failed",
        description: error,
      });
    } else {
      dispatch(updateBalance(response.payload));
      toast({
        variant: "success",
        title: "Top Up Success",
        description: "Top up saldo berhasil dilakukan",
      });
      setBalance(0);
    }
  };
  return (
    <div className="flex flex-col gap-[40px]">
      {/* for section profile */}
      <Profile />
      <div className="">
        <p>Silakan masukan</p>
        <h4 className="font-semibold text-2xl">Nominal Top Up</h4>
      </div>

      <div className="grid grid-cols-5 gap-5">
        <div className="flex flex-col gap-5 col-span-3">
          <div className="relative">
            <div className="flex items-center absolute left-2 top-0 bottom-0">
              <FaRegKeyboard className="text-gray-400 text-sm" />
            </div>
            <Input
              onChange={(e) => setBalance(parseInt(e.target.value))}
              className="px-7"
              type="number"
              value={balance}
              placeholder="Masukan nominal top up anda"
            />
          </div>
          <Button disabled={balance < 10000} onClick={onSubmit}>
            Top Up
          </Button>
        </div>
        <div className="col-span-2 grid grid-cols-3 gap-y-5 gap-x-2 ">
          {price.map((item, key: number) => {
            return (
              <Button
                className="bg-transparent border text-gray-400 hover:text-white"
                key={key}
                onClick={() => setBalance(item)}
              >
                {formatCurrency(item, "id-ID", "IDR")}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TopUpPage;
