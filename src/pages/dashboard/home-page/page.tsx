import { useEffect } from "react";
import { Services, servicesData } from "@/api/query/services/services-query";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { bannerData, getBanner } from "@/api/query/banner/banner-query";
import Profile from "@/components/layout-component/Profile";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const dataServices = useSelector((state: RootState) => state.services.data);
  const dataBanner = useSelector((state: RootState) => state.banner.data);
  const navigate = useNavigate();
  const goPayServices = (val: string) => {
    const queryParams = new URLSearchParams();
    queryParams.set("services", val);
    navigate(`/payment?${queryParams.toString()}`);
  };

  useEffect(() => {
    dispatch(Services());
    dispatch(getBanner());
  }, [dispatch]);

  return (
    <div>
      <Profile />

      {/* for list services */}
      <div className="flex items-center gap-4 mt-8">
        {dataServices.map((item: servicesData, key: number) => {
          return (
            <div
              className="rounded-lg cursor-pointer"
              key={key}
              onClick={() => {
                goPayServices(item.service_code);
              }}
            >
              <img src={item.service_icon} alt="services-img" />
            </div>
          );
        })}
      </div>

      {/* for list banner */}
      <div className="mt-20 flex flex-col gap-2">
        <p>Temukan produk</p>
        <div className="flex items-center gap-4 overflow-x-auto ">
          {dataBanner.map((item: bannerData, key: number) => {
            return (
              <div className="rounded-lg cursor-pointer" key={key}>
                <img
                  className="min-w-[220px]"
                  src={item.banner_image}
                  alt="banner-img"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
