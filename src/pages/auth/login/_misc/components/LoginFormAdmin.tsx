// src/App.tsx
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"; // Import icons from lucide-react
import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { errorLogger } from "@/utils/helper"
import { useAdminLogin } from "@/pages/auth/_misc/mutations"
import { useAdminDetail } from "@/hooks/useAdminDetail"
import { useToken } from "@/hooks/useToken"
import { Card, CardContent } from "@/components/ui/card";


const formSchema = z.object({
    password: z.string().min(2).max(50),
    email: z.string().email(),
})

export type AdminLoginDTO = z.infer<typeof formSchema>
function LoginFormAdmin() {
    const [showPassword, setShowPassword] = useState(false);
    const { setAdminLogin } = useAdminDetail()
    const navigate = useNavigate()
    const { mutateAsync, isPending } = useAdminLogin()
    const { setToken } = useToken()

    const form = useForm<AdminLoginDTO>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            email: "",
        },
    })

    async function onSubmit(data: AdminLoginDTO) {

        try {
            await mutateAsync(data, {
                onSuccess(res) {
                    console.log(res);
                    setToken(res.accessToken)
                    setAdminLogin(res.user)
                    toast.success("Login Successful")
                    navigate("/dashboard")
                },

            })
        } catch (error) {
            errorLogger(error)
            console.log(error);
        }
    }

    return (
        <Card>
            <CardContent className="p-4">
                <div className="flex justify-center items-center">
                    <h1 className="text-2xl">Login</h1>
                </div>
                <div className=" !text-[#333333] w-[500px]">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField

                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="email" {...field} className="h-12" />
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
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            {/* Wrap Input and button in a single div element */}
                                            <div className="relative w-full">
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="*********"
                                                    className="pr-10 h-12" // Add padding for the icon
                                                    {...field}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                >
                                                    {showPassword ? (
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
                            <div className="my-4 flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                    <Switch id="airplane-mode" />
                                    <Label htmlFor="airplane-mode">Remember me</Label>
                                </div>
                                <div>
                                    <Link to="/signup" className="text-primary-100">You don't account ?</Link>
                                </div>
                            </div>

                            <Button
                                disabled={isPending}
                                isLoading={isPending} type="submit" className="bg-primary-100 w-full h-12 py-2" >Submit</Button>
                        </form>
                    </Form>
                </div>
            </CardContent>
        </Card>
    )
}

export default LoginFormAdmin