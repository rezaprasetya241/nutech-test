import { servicesData as serviceType } from "@/api/query/services/services-query";
import { transactions } from "@/api/query/transactions/transactions-query";
import Profile from "@/components/layout-component/Profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { updateBalance } from "@/state/dashboard/balance/balanceSlice";
import { AppDispatch, RootState } from "@/store";
import { useEffect, useState } from "react";
import { FaRegKeyboard } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const PaymentPage = () => {
  const [servicesData, setServicesData] = useState<serviceType>({
    service_code: "",
    service_name: "",
    service_icon: "",
    service_tariff: 0,
  });
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const { data } = useSelector((state: RootState) => state.services);
  const code = queryParams.get("services");
  const dispatch = useDispatch<AppDispatch>();
  const { toast } = useToast();
  const { error } = useSelector((state: RootState) => state.payment);
  const { balance } = useSelector((state: RootState) => state.balance.data);

  const handlePayment = async () => {
    const response = await dispatch(
      transactions({ service_code: servicesData.service_code })
    );
    if (error !== null) {
      toast({
        variant: "destructive",
        title: "Transactions Failed",
        description: error,
      });
    } else {
      dispatch(updateBalance(balance - response.payload.total_amount));
      toast({
        variant: "success",
        title: "Transactions Success",
        description: "Transaksi berhasil dilakukan",
      });
    }
  };

  useEffect(() => {
    if (code && data) {
      const res = data.find((item) => item.service_code === code);
      if (res) {
        setServicesData(res);
      }
    }
  }, [data, code, dispatch]);
  return (
    <div>
      <Profile />
      <div className="mt-32 flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <p>Pembayaran</p>
          <div className="flex items-center gap-4">
            <img
              className="w-10 h-10 rounded-lg"
              src={servicesData?.service_icon}
              alt="icon-services"
            />
            <h4>{servicesData?.service_name}</h4>
          </div>
        </div>
        <div className="flex flex-col gap-3 ">
          <div className="relative">
            <div className="flex items-center absolute left-2 top-0 bottom-0">
              <FaRegKeyboard className="text-gray-400 text-sm" />
            </div>
            <Input
              className="px-7"
              type="number"
              disabled
              value={servicesData?.service_tariff}
              placeholder="Masukan nominal top up anda"
            />
          </div>
          <Button
            disabled={balance < servicesData?.service_tariff}
            onClick={handlePayment}
          >
            Bayar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
