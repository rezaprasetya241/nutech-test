import { Avatar, AvatarImage } from "@/components/ui/avatar";
import profileImg from "../../../assets/png/Profile.png";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import React, { useEffect, useState } from "react";
import {
  getProfile,
  updateProfile,
  updateProfilePicture,
} from "@/api/query/profile/profile-query";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { FaPen, FaRegUser } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { logout } from "@/state/auth/authSlice";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  email: z.string().optional(),
  first_name: z.string().min(8, {
    message: "Panjang password minimal 8 karakter",
  }),
  last_name: z.string().min(1, {
    message: "Nama belakang harus diisi",
  }),
});
const DetailsProfilePage = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  // const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(profileImg);
  const dataProfile = useSelector((state: RootState) => state.profile.data);
  const dispatch = useDispatch<AppDispatch>();
  const regex = /https:\/\/.*\/.*\/null$/;
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
    },
  });
  const handleLogout = () => {
    dispatch(logout());
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await dispatch(
        updateProfile({
          first_name: values.first_name,
          last_name: values.last_name,
        })
      );
      toast({
        variant: "success",
        title: "Update Profile Success",
        description: "Profile berhasil diperbarui",
      });
      dispatch(updateProfile(response.payload));
      setIsEdit(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: "Registration Failed",
          description: error.message,
        });
      }
    }
  };
  // for upload image
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const fileSelected = event.target.files[0];
      dispatch(updateProfilePicture(fileSelected));

      const previewUrl = URL.createObjectURL(fileSelected);
      setPreview(previewUrl);
    }
  };

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (dataProfile && !isEdit) {
      form.setValue("email", dataProfile.email || "");
      form.setValue("first_name", dataProfile.first_name || "");
      form.setValue("last_name", dataProfile.last_name || "");
    }
  }, [dataProfile]);
  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="flex flex-col gap-4 items-center justify-center">
          <div className="relative">
            <Avatar className="w-20 h-20 rounded-full ">
              <AvatarImage
                src={
                  !regex.test(dataProfile.profile_image)
                    ? dataProfile.profile_image
                    : preview
                }
                onError={(e) => {
                  e.currentTarget.src = preview;
                }}
              />
            </Avatar>
            <label
              className="absolute right-0 bottom-[1px] border rounded-full p-1 text-xs bg-white text-gray-400"
              htmlFor="file-input"
            >
              <FaPen />
            </label>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          <p className="font-semibold text-2xl">
            {dataProfile.first_name + " " + dataProfile.last_name}
          </p>
        </div>
        <div className="w-full max-w-lg mt-5">
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 text-end"
            >
              <FormField
                control={form.control}
                name="email"
                disabled
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <span className="text-gray-400 absolute left-2 top-0 bottom-0 flex items-center text-sm">
                          @
                        </span>
                        <Input
                          className="pl-7"
                          type="email"
                          placeholder="masukan email anda"
                          {...field}
                        />
                      </div>
                    </FormControl>

                    <div className="relative my-1">
                      <FormMessage className="absolute right-0 -top-2" />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="first_name"
                disabled={!isEdit}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <div className="flex items-center absolute left-2 top-0 bottom-0">
                          <FaRegUser className="text-gray-400 text-sm" />
                        </div>
                        <Input
                          className="pl-7"
                          placeholder="nama depan"
                          {...field}
                        />
                      </div>
                    </FormControl>

                    <div className="relative my-1">
                      <FormMessage className="absolute right-0 -top-2" />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                disabled={!isEdit}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <div className="flex items-center absolute left-2 top-0 bottom-0">
                          <FaRegUser className="text-gray-400 text-sm" />
                        </div>
                        <Input
                          className="pl-7"
                          placeholder="nama belakang"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <div className="relative my-1">
                      <FormMessage className="absolute right-0 -top-2" />
                    </div>
                  </FormItem>
                )}
              />
              {isEdit ? (
                <Button className="w-full" type="submit">
                  Simpan
                </Button>
              ) : (
                <>
                  <Button
                    className="w-full bg-white border border-red-500 text-red-500 hover:text-white"
                    onClick={() => {
                      setIsEdit(true);
                    }}
                  >
                    Edit Profile
                  </Button>
                  <Button className="w-full" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              )}
              {/* <Button className="w-full" type="submit">
                Registrasi
              </Button> */}
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default DetailsProfilePage;
