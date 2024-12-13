import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";

import profileImg from "../../assets/png/Profile.png";
import { useEffect, useState } from "react";
import { getProfile } from "@/api/query/profile/profile-query";
import { formatCurrency } from "@/lib/utils";
import { getBalances } from "@/api/query/balance/balance-query";
import { Avatar, AvatarImage } from "../ui/avatar";

const Profile = () => {
  const [hide, setHide] = useState<boolean>(false);
  const dataProfile = useSelector((state: RootState) => state.profile.data);
  const dataBalance = useSelector((state: RootState) => state.balance.data);
  const dispatch = useDispatch<AppDispatch>();
  const regex = /https:\/\/.*\/.*\/null$/;

  useEffect(() => {
    dispatch(getProfile());
    dispatch(getBalances());
  }, [dispatch]);
  return (
    <div className="grid grid-cols-2 gap-3 items-center justify-between ">
      {/* for profile sections */}

      <div className="flex flex-col gap-3 ">
        <Avatar className="w-12 h-12 rounded-full ">
          <AvatarImage
            src={
              !regex.test(dataProfile.profile_image)
                ? dataProfile.profile_image
                : profileImg
            }
            onError={(e) => {
              e.currentTarget.src = profileImg;
            }}
          />
        </Avatar>
        <div>
          <p>Selamat datang,</p>
          <h3 className="font-semibold text-2xl">
            {dataProfile.first_name} {dataProfile.last_name}
          </h3>
        </div>
      </div>
      {/* for balance sections */}
      <div className="bg-saldo h-full p-4 flex flex-col gap-3 bg-cover rounded-lg text-white">
        <p className="text-sm">Saldo Anda</p>
        <div className="flex items-center gap-2">
          <h4 className="text-lg font-semibold">Rp</h4>
          {hide ? (
            <div className="flex items-center gap-1">
              <div className="w-[10px] h-[10px] rounded-full bg-white"></div>
              <div className="w-[10px] h-[10px] rounded-full bg-white"></div>
              <div className="w-[10px] h-[10px] rounded-full bg-white"></div>
              <div className="w-[10px] h-[10px] rounded-full bg-white"></div>
              <div className="w-[10px] h-[10px] rounded-full bg-white"></div>
              <div className="w-[10px] h-[10px] rounded-full bg-white"></div>
              <div className="w-[10px] h-[10px] rounded-full bg-white"></div>
            </div>
          ) : (
            <div>{formatCurrency(dataBalance.balance, "id-ID", "IDR")}</div>
          )}
        </div>
        <p
          className="text-[10px] mb-1 mr-2 cursor-pointer"
          onClick={() => setHide(!hide)}
        >
          Lihat Saldo
        </p>
      </div>
    </div>
  );
};

export default Profile;
