import apiClient from "@/api/axios";

interface ReqRegisterDTO {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

export const register = async (val: ReqRegisterDTO) => {
  try {
    const response = await apiClient.post("/registration", val);
    return response.data.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Registration Failed");
  }
};
