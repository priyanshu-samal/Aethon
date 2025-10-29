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


const registerSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    password: z.string().min(1, "Password is required").min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})

type RegisterFormValue = z.infer<typeof registerSchema>

export function RegisterForm() {
    const router = useRouter()

    const form=useForm<RegisterFormValue>({
        resolver: zodResolver(registerSchema),
        defaultValues:{
            email:"",
            password:"",
            confirmPassword:""
        }
    })

    const onSubmit = async (data: RegisterFormValue) => {
        await authClient.signUp.email(
            {
            name: data.email,
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
        });
    }
    const isPending= form.formState.isSubmitting;
    return(
        <div className="flex flex-col gap-6">
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-bold">
                            Get Started!
                             </CardTitle>
                             <CardDescription>
                                Create an account to continue
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
                                                <FormField
                                                control={form.control}
                                                name="confirmPassword"
                                                render={({field})=>(
                                                    <FormItem>
                                                        <FormLabel>Confirm Password</FormLabel>
                                                        <FormControl>
                                                            <Input type="password"
                                                            placeholder="Confirm your password"
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
                                                    SignUp
                                                    </Button>      
                                            </div>
                                            <div className="text-center text-sm">
                                                             Already have an account?{" "}
                                                             <Link className="underline underline-offset-4" href="/login">
                                                                LogIn
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