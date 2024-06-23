import HomeLink from '@layout/body-app/header/home-link';
import { LoginForm } from '@modules/auth/login/login-form';
import { OtherOptionsLogin } from '@modules/auth/login/other-options-login';

export default function Login() {
  return (
    <div className="w-full md:max-w-[500px] m-auto flex flex-col items-center px-4 pt-10 space-y-6">
      <HomeLink />

      <LoginForm />

      <OtherOptionsLogin />
    </div>
  );
}
