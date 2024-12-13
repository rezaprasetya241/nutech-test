import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaRegUser, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { CiLock } from "react-icons/ci";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "@/api/query/register/register-query";
import { useToast } from "@/hooks/use-toast";

const formSchema = z
  .object({
    first_name: z.string().min(1, {
      message: "Nama depan harus diisi",
    }),
    last_name: z.string().min(1, {
      message: "Nama belakang harus diisi",
    }),
    email: z
      .string()
      .min(1, {
        message: "Email harus diisi",
      })
      .email("email tidak valid"),
    password: z.string().min(8, {
      message: "Panjang password minimal 8 karakter",
    }),
    confirmPassword: z.string().min(8, {
      message: "Panjang password minimal 8 karakter",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords tidak sama",
    path: ["confirmPassword"],
  });
const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await register({
        email: values.email,
        first_name: values.first_name,
        last_name: values.last_name,
        password: values.password,
      });
      toast({
        variant: "success",
        title: "Registration Success",
        description: "User berhasil ditambahkan",
      });
      navigate("/login");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast({
          variant: "destructive",
          title: "Registration Failed",
          description: err.message,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Registration Failed",
          description: "An unknown error occurred.",
        });
      }
    }
  }
  return (
    <div className="h-screen grid grid-cols-2">
      {/* section form login */}
      <div className="flex items-center justify-center">
        <div className="flex flex-col text-center gap-8 w-96 ">
          <div className="flex items-center justify-center gap-2">
            <img src={"/assets/png/Illustrasi Login.png"} alt="logo-img" />
            <h2 className="text-xl font-semibold">SIMS PPOB</h2>
          </div>
          <h1 className="text-3xl font-medium">
            Lengkapi data untuk membuat akun
          </h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 text-end"
            >
              <FormField
                control={form.control}
                name="email"
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <div className="flex items-center absolute left-2 top-0 bottom-0">
                          <CiLock className="text-gray-400 text-sm" />
                        </div>

                        <Input
                          className="px-7"
                          placeholder="buat password"
                          type={!showPassword ? "password" : "text"}
                          {...field}
                        />
                        <div className="flex items-center absolute right-2 top-0 bottom-0">
                          {showPassword ? (
                            <FaRegEyeSlash
                              className="text-gray-400 text-sm"
                              onClick={() => {
                                setShowPassword(false);
                              }}
                            />
                          ) : (
                            <FaRegEye
                              className="text-gray-400 text-sm"
                              onClick={() => {
                                setShowPassword(true);
                              }}
                            />
                          )}
                        </div>
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
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <div className="flex items-center absolute left-2 top-0 bottom-0">
                          <CiLock className="text-gray-400 text-sm" />
                        </div>

                        <Input
                          className="px-7"
                          placeholder="konfirmasi password"
                          type={!showConfirmPassword ? "password" : "text"}
                          {...field}
                        />

                        <div className="flex items-center absolute right-2 top-0 bottom-0">
                          {showConfirmPassword ? (
                            <FaRegEyeSlash
                              className="text-gray-400 text-sm"
                              onClick={() => {
                                setShowConfirmPassword(false);
                              }}
                            />
                          ) : (
                            <FaRegEye
                              className="text-gray-400 text-sm"
                              onClick={() => {
                                setShowConfirmPassword(true);
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </FormControl>
                    <div className="relative my-1">
                      <FormMessage className="absolute right-0 -top-2" />
                    </div>
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit">
                Registrasi
              </Button>
              <div className="text-xs text-gray-400 text-center">
                Sudah punya akun? login{" "}
                <Link to={"/login"} className="text-red-500">
                  di sini
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>
      {/* section image */}
      <div className="flex items-center justify-center col-span-1">
        <img className="w-full h-screen" src={loginImg} alt="login-img" />
      </div>
    </div>
  );
};

export default RegisterPage;
