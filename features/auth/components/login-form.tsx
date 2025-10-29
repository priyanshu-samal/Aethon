"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {useForm} from "react-hook-form" 
import {z} from "zod"
import {toast} from "sonner"
import {Button } from "@/components/ui/button"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import{
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Field } from "@/components/ui/field"
import { authClient } from "@/lib/auth-client"


const loginFormSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    password: z.string().min(1, "Password is required").min(6, "Password must be at least 6 characters"),
})

type LoginFormValues = z.infer<typeof loginFormSchema>

export function LoginForm() {
    const router = useRouter()

    const form=useForm<LoginFormValues>({
        resolver: zodResolver(loginFormSchema),
        defaultValues:{
            email:"",
            password:""
        }
    })

    const onSubmit = async (data: LoginFormValues) => {
        await authClient.signIn.email({
            email: data.email,
            password: data.password,
            callbackURL:"/"
        },
        {
            onSuccess: () => {
                router.push("/")
            },
            onError: (ctx) => {
                toast.error(ctx.error.message)
            }

        })
    }
    const isPending= form.formState.isSubmitting;
    return(
        <div className="flex flex-col gap-6">
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-bold">
                            Welcome Back!
                             </CardTitle>
                             <CardDescription>
                                Login to continue
                             </CardDescription>
                             <CardContent>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)}>
                                        <div className="grid gap-6">
                                            <div className="flex flex-col gap-4">
                                                <Button 
                                                variant="outline" 
                                                className="w-full"
                                                type="button"
                                                disabled={isPending}
                                                >
                                                    <Image
                                                    src="/github.svg"
                                                    alt="GitHub Logo"
                                                    width={20}
                                                    height={20}
                                                    />
                                                    Continue with GitHub
                                                    
                                                </Button>
                                                <Button 
                                                variant="outline" 
                                                className="w-full"
                                                type="button"
                                                disabled={isPending}
                                                >
                                                    <Image
                                                    src="/google.svg"
                                                    alt="Google Logo"
                                                    width={20}
                                                    height={20}
                                                    />
                                                    Continue with Google
                                                    
                                                </Button>

                                            </div>
                                            <div className="grid gap-6">
                                                <FormField
                                                control={form.control}
                                                name="email"
                                                render={({field})=>(
                                                    <FormItem>
                                                        <FormLabel>Email</FormLabel>
                                                        <FormControl>
                                                            <Input type="email"
                                                            placeholder="Enter your email"
                                                            {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage/>
                                                    </FormItem>
                                                )}
                                                />    
                                                <FormField
                                                control={form.control}
                                                name="password"
                                                render={({field})=>(
                                                    <FormItem>
                                                        <FormLabel>Password</FormLabel>
                                                        <FormControl>
                                                            <Input type="password"
                                                            placeholder="Enter your password"
                                                            {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage/>
                                                    </FormItem>
                                                )}
                                                /> 
                                                <Button type="submit"
                                                className="w-full "
                                                disabled ={isPending}
                                                >
                                                    LogIn
                                                    </Button>      
                                            </div>
                                            <div className="text-center text-sm">
                                                             Don&appos;t have an account?{" "}
                                                             <Link className="underline underline-offset-4" href="/signup">
                                                                SignUp
                                                             </Link>
                                            </div>
                                        </div>

                                    </form>
                                </Form>
                             </CardContent>
                    </CardHeader>
                </Card>
        </div>
    )
}