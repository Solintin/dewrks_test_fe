import { Button } from "../../../../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../../components/ui/form";
import { Input } from "../../../../../components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { errorLogger } from "@/utils/helper";
import { Card, CardContent } from "@/components/ui/card";
import { useAdminDetail } from "@/hooks/useAdminDetail";
import { useRegister } from "@/pages/auth/_misc/mutations";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useToken } from "@/hooks/useToken";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  password: z.string().min(4, "password  is required"),
  email: z.string().email("Invalid email address"),

});

export type CreateAdminDTO = z.infer<typeof formSchema>;

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState({
    current: false,
  });
  const navigate = useNavigate()
  const { setAdminLogin } = useAdminDetail()
  const { setToken } = useToken()

  const { mutateAsync, isPending } = useRegister();
  const form = useForm<CreateAdminDTO>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: CreateAdminDTO) => {
    console.log(data);
    try {
      await mutateAsync({
        ...data
      }, {
        onSuccess(res) {
          setToken(res.accessToken)
          setAdminLogin(res.user)
          toast.success("Registration Successful")
          navigate(`/dashboard`)
        },
      }
      );
    } catch (error) {
      errorLogger(error);
    }
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-center items-center">
          <h1 className="text-2xl">Register</h1>
        </div>
        <div className="w-[585px]  p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal"> Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder=" Name"
                        {...field}
                        className="h-12 shadow-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter Email"
                        {...field}
                        className="h-12 shadow-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">password</FormLabel>
                    <FormControl>
                      <div className="relative w-full">
                        <Input
                          type={
                            showPassword.current ? "text" : "password"
                          }
                          placeholder="*********"
                          className="h-12 pr-10"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowPassword({
                              ...showPassword,
                              current: !showPassword.current,
                            })
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showPassword.current ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="my-4 flex justify-end">
                <Link to="/login" className="text-primary-100">Already have an account ?</Link>
              </div>
              <Button
                disabled={isPending}
                className="!mt-8 h-12 w-full bg-primary-100 disabled:cursor-not-allowed disabled:bg-[#B3B3B3]"
                isLoading={isPending}
              >
                Sign Up
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignupForm;
