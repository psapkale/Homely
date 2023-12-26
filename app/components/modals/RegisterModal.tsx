'use client';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { SubmitHandler, FieldValues, useForm } from 'react-hook-form';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import { toast } from 'react-hot-toast';
import Button from '../CustomButton';
import { signIn } from 'next-auth/react';

const RegisterModal = () => {
   const registerModal = useRegisterModal();
   const loginModal = useLoginModal();
   const [isLoading, setIsLoading] = useState(false);

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<FieldValues>({
      defaultValues: {
         name: '',
         email: '',
         password: '',
      },
   });

   const onSubmit: SubmitHandler<FieldValues> = (data) => {
      setIsLoading(true);

      axios
         .post('/api/register', data)
         .then((data) => {
            toast.success('Login to continue');
            registerModal.onClose();
            loginModal.onOpen();
         })
         .catch((e) => toast.error(e.message))
         .finally(() => {
            setIsLoading(false);
            toast.success('Welcome to home.');
         });
   };

   const toggle = useCallback(() => {
      registerModal.onClose();
      loginModal.onOpen();
   }, [loginModal, registerModal]);

   const bodyContent = (
      <div className='flex flex-col gap-4'>
         <Heading title='Welcome to Homely🏡' subtitle='Create an account' />
         <Input
            id='email'
            label='Email'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
         />
         <Input
            id='name'
            label='Name'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
         />
         <Input
            id='password'
            type='password'
            label='Password'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
         />
      </div>
   );

   const footerContent = (
      <div className='flex flex-col gap-4 mt-3'>
         <hr />
         <Button
            outline
            label='Continue with Google'
            icon={FcGoogle}
            onClick={() => signIn('google')}
         />
         <Button
            outline
            label='Continue with Github'
            icon={AiFillGithub}
            onClick={() => signIn('github')}
         />
         <div className='text-neutral-500 text-center mt-4 font-light'>
            <div className='flex flex-row items-center justify-center gap-2'>
               <div>Already have an account?</div>
               <div
                  className='text-neutral-800 cursor-pointer hover:underline'
                  onClick={toggle}
               >
                  Login
               </div>
            </div>
         </div>
      </div>
   );

   return (
      <Modal
         disabled={isLoading}
         isOpen={registerModal.isOpen}
         title='Register'
         actionLabel='Continue'
         onClose={registerModal.onClose}
         onSubmit={handleSubmit(onSubmit)}
         body={bodyContent}
         footer={footerContent}
      />
   );
};

export default RegisterModal;
