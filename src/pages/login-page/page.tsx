import { z } from "zod";
import loginImg from "../../assets/png/Illustrasi Login.png";
import logoImg from "../../assets/png/Logo.png";
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
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { CiLock } from "react-icons/ci";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/api/query/login/login-query";
import { AppDispatch, RootState } from "@/store";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email harus diisi",
    })
    .email("email tidak valid"),
  password: z.string().min(8, {
    message: "Panjang password minimal 8 karakter",
  }),
});

const LoginPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { error } = useSelector((state: RootState) => state.auth);
  const { toast } = useToast();
  const navigate = useNavigate();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await dispatch(login({ email: values.email, password: values.password }));
    if (error !== null) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error,
      });
    } else {
      navigate("/");
    }
  };
  return (
    <div className="h-screen grid grid-cols-2">
      {/* section form login */}
      <div className="flex items-center justify-center">
        <div className="flex flex-col text-center gap-8 w-96 ">
          <div className="flex items-center justify-center gap-2">
            <img src={logoImg} alt="logo-img" />
            <h2 className="text-xl font-semibold">SIMS PPOB</h2>
          </div>
          <h1 className="text-3xl font-medium">
            Masuk atau buat akun untuk memulai
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
                          placeholder="masukan password anda"
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
              <Button className="w-full" type="submit">
                Masuk
              </Button>
              <div className="text-xs text-gray-400 text-center">
                belum punya akun? registrasi{" "}
                <Link to={"/register"} className="text-red-500">
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

export default LoginPage;
