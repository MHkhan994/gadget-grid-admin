'use client';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import axiosInstance from '@/lib/axiosInstance';
import { globalError } from '@/lib/utils';
// import { verifyToken } from '@/lib/utils'
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
    setResetSentTime,
    updateAuthData,
} from '@/redux/reducers/auth/authSlice';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
// import { toast } from 'sonner'
import { z } from 'zod';
import dayjs from '@/components/utilities/Customdayjs';
import { Eye, EyeOff } from 'lucide-react';

const formSchema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string({ required_error: 'Please enter your password' }),
});

const resetFormSchema = z.object({
    email: z.string().email('Invalid email'),
});

const LoginPage = () => {
    const [passwordHidden, setPasswordHidden] = useState(true);
    const dispatch = useAppDispatch();
    const [resetTab, setResetTab] = useState(false);
    const router = useRouter();
    const [sendingReset, setSendingReset] = useState(false);
    const [isLogging, setlogging] = useState(false);

    const { resetSentTime } = useAppSelector((s) => s.auth);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: 'khanmahmud994@gmail.com',
            password: 'Mahmud@994',
        },
    });

    const resetForm = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(resetFormSchema),
        defaultValues: {
            email: 'khanmahmud994@gmail.com',
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        const { email, password } = values;
        setlogging(true);

        axiosInstance
            .post(`/auth/admin-login`, { email, password })
            .then((res) => {
                if (res.data?.data?.isVerified === false) {
                    toast.warning(res.data.message);
                    router.push('/verify-email');
                } else {
                    toast.success(res.data.message);
                    dispatch(
                        updateAuthData({
                            isAuthenticated: res.data.data.token !== null,
                            token: res.data.data.accessToken,
                            isVerified: true,
                            permissions: [],
                            user: null,
                        }),
                    );
                    setlogging(false);
                    setTimeout(() => {
                        router.push('/');
                    }, 100);
                }
            })
            .catch((err) => {
                globalError(err.response);
                setlogging(false);
            });
    }

    function resetFormSubmit(values: z.infer<typeof resetFormSchema>) {
        const resetLinkSentMinutes = dayjs().diff(
            dayjs(resetSentTime),
            'minutes',
        );

        if (resetSentTime !== null && resetLinkSentMinutes <= 5) {
            return toast.warning(
                `A email with reset link has already been sent to your address. Please try again ${dayjs(resetSentTime)?.add(5, 'minutes')?.from(dayjs())}`,
            );
        }
        const { email } = values;
        setSendingReset(true);

        axiosInstance
            .post(`/auth/forgot-password`, { email })
            .then((res) => {
                toast.success(res.data.message);
                dispatch(setResetSentTime(dayjs().toISOString()));
                setSendingReset(false);
            })
            .catch((err) => {
                console.log(err.response);
                globalError(err.response);
                setSendingReset(false);
            });
    }

    return (
        <>
            {!resetTab ? (
                <div className='z-50 flex min-h-[60vh] w-[90vw] flex-col justify-center rounded-lg bg-white/15 p-8 px-5 shadow-lg backdrop-blur-lg border border-border-color min-[540px]:px-10 md:w-[70vw] lg:w-1/2 2xl:w-1/3'>
                    <Image
                        className='mx-auto pb-4'
                        src={'/gadget-grid-logo.png'}
                        height={100}
                        width={200}
                        alt='gadget grid logo'
                    />
                    <h2 className='pb-6 text-center text-2xl font-bold text-primary'>
                        Welcome Back!
                    </h2>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='flex flex-col gap-5'
                        >
                            <FormField
                                control={form.control}
                                name='email'
                                render={({ field }) => (
                                    <FormItem>
                                        <label>Email *</label>
                                        <Input
                                            className='bg-background-foreground'
                                            {...field}
                                            type='email'
                                            placeholder='Enter your email'
                                        />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='password'
                                render={({ field }) => (
                                    <FormItem>
                                        <label>Password *</label>
                                        <div className='relative'>
                                            <Input
                                                className='bg-background-foreground'
                                                {...field}
                                                type={
                                                    passwordHidden
                                                        ? 'password'
                                                        : 'text'
                                                }
                                                placeholder='Enter your password'
                                            />
                                            <button
                                                type='button'
                                                className='absolute right-2 top-1/2 -translate-y-1/2'
                                                onClick={() =>
                                                    setPasswordHidden(
                                                        !passwordHidden,
                                                    )
                                                }
                                            >
                                                {passwordHidden ? (
                                                    <EyeOff />
                                                ) : (
                                                    <Eye />
                                                )}
                                            </button>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            <Button loading={isLogging} className='mt-3'>
                                Login
                            </Button>
                        </form>
                    </Form>
                    <button type='button' className='mt-3 text-base'>
                        Forgot password?{' '}
                        <span
                            onClick={() => setResetTab(true)}
                            className='text-base text-primary'
                        >
                            reset
                        </span>
                    </button>
                </div>
            ) : (
                <div className='z-50 flex min-h-[40vh] w-[90vw] flex-col justify-center rounded-lg bg-background p-8 px-5 shadow-lg min-[540px]:px-10 md:w-[70vw] lg:w-1/2 2xl:w-1/3'>
                    <Form {...resetForm}>
                        <form
                            onSubmit={resetForm.handleSubmit(resetFormSubmit)}
                            className='flex flex-col gap-5'
                        >
                            <Image
                                className='mx-auto'
                                src={'/gadget-grid-logo.png'}
                                height={100}
                                width={200}
                                alt='gadget grid logo'
                            />
                            <h2 className='text-center text-2xl font-bold text-primary'>
                                Forgot Password!
                            </h2>
                            <FormField
                                control={resetForm.control}
                                name='email'
                                render={({ field }) => (
                                    <FormItem>
                                        <label>Email *</label>
                                        <Input
                                            className='bg-background-foreground'
                                            {...field}
                                            type='email'
                                            placeholder='Enter your email'
                                        />
                                    </FormItem>
                                )}
                            />

                            <Button loading={sendingReset} className='mt-3'>
                                Send Reset Link
                            </Button>
                        </form>
                    </Form>

                    <button type='button' className='mt-3 text-base'>
                        Go back to{' '}
                        <span
                            onClick={() => setResetTab(false)}
                            className='text-base text-primary'
                        >
                            login
                        </span>
                    </button>
                </div>
            )}
        </>
    );
};

export default LoginPage;
