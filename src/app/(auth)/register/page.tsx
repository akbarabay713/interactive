"use client";
import Body from "@/components/atoms/Body";
import Button from "@/components/atoms/Button";
import Heading from "@/components/atoms/Heading";
import FieldInput from "@/components/molecules/FieldInput";
import Link from "next/link";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {useAuth} from "@/hooks/useAuth";

type FormData = {
  email: string;
  password: string;
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function Register() {
  const {handleRegister} = useAuth();

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="p-6 bg-gray-50 rounded-lg shadow-lg flex align-center justify-center flex-col w-[25rem]">
        <Heading
          variant="h4"
          weight="medium"
          as="h1"
          className="text-black mb-3 text-center">
          Sign Up
        </Heading>

        <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
          <FieldInput
            label="Email"
            placeholder="email"
            {...register("email")}
            error={!!errors.email?.message}
            helperText={errors.email?.message}
            className="text-black"
          />

          <FieldInput
            label="Password"
            type="password"
            placeholder="password"
            {...register("password")}
            error={!!errors.password?.message}
            helperText={errors.password?.message}
            className="text-black"
          />

          <Button size="lg" className="w-full">
            Sign Up
          </Button>
        </form>

        <Body
          variant="md"
          weight="medium"
          className="text-black mt-4 text-center"
          as="p">
          Already have an account?
          <Body
            variant="md"
            weight="medium"
            className="text-primary-500 mt-4 text-center"
            as={Link}
            href={"/login"}>
            {" "}
            Sign in here
          </Body>
        </Body>
      </div>
    </div>
  );
}
